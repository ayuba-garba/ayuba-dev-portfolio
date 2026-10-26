require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;
const PRIMARY_RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'ayubagarba@savilinks.com';

if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('🚀 Successfully connected to MongoDB Atlas Cloud Database!'))
        .catch(err => console.error('❌ Database Connection Failure:', err.message));
} else {
    console.warn('⚠️ Notice: MONGO_URI is not set in environment. Running with in-memory storage fallback.');
}

// 📝 Schema Configuration Rule
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
const memoryMessages = [];

// 🌐 Parse JSON & URL-Encoded Payloads with Strict Memory/Payload Caps (10kb)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 🛡️ Security Helper: Strip HTML/script tags and enforce maximum character bounds
function sanitizeInput(val, maxLength = 2000) {
    if (typeof val !== 'string') return '';
    return val.replace(/<[^>]*>?/gm, '').trim().slice(0, maxLength);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 📧 Mail Notification Dispatcher (Target: ayubagarba@savilinks.com)
let mailer = null;
try {
    mailer = require('nodemailer');
} catch (e) {
    // Graceful fallback when nodemailer is not installed in runtime environment
}

async function sendEmailNotification({ name, email, message, scope }) {
    console.log(`📧 [EMAIL DISPATCH] Target: ${PRIMARY_RECIPIENT_EMAIL} | From: "${name}" <${email}> | Scope: ${scope || 'Quick Message'}`);
    if (mailer && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
            const transporter = mailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587', 10),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            await transporter.sendMail({
                from: process.env.SMTP_FROM || `Portfolio Gateway <${process.env.SMTP_USER}>`,
                to: PRIMARY_RECIPIENT_EMAIL,
                replyTo: email,
                subject: `New Portfolio Message from ${name}`,
                text: `New Portfolio Message:\n\nName: ${name}\nEmail: ${email}\nScope: ${scope || 'Quick Message'}\n\nMessage:\n${message}`,
                html: `<h3>New Portfolio Message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Scope:</strong> ${scope || 'Quick Message'}</p><p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>`
            });
            console.log(`✅ [EMAIL DISPATCH] Successfully delivered email to ${PRIMARY_RECIPIENT_EMAIL}`);
        } catch (err) {
            console.error('⚠️ [EMAIL DISPATCH] Mail transport error:', err.message);
        }
    }
}

// 📁 CORRECT PATHING: Serves all static files out of your /public directory
app.use(express.static(path.join(__dirname, 'public')));

// 📬 Route: Asynchronous Form Submission Endpoint (Netlify / Root POST)
app.post('/', async (req, res) => {
    const rawName = req.body?.name;
    const rawEmail = req.body?.email;
    const rawScope = req.body?.scope;
    const rawMessage = req.body?.message;

    const name = sanitizeInput(rawName, 100);
    const email = sanitizeInput(rawEmail, 150);
    const scope = sanitizeInput(rawScope, 100);
    const message = sanitizeInput(rawMessage, 2000);

    if (!name || !email || !message || !EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: 'Valid name, email address, and message are required.' });
    }

    console.log('📥 Form Payload Captured for', PRIMARY_RECIPIENT_EMAIL, ':', { name, email, scope, messageLength: message.length });
    await sendEmailNotification({ name, email, message, scope });
    res.status(200).send('OK');
});

// 📤 API Route Handler: Push form records securely with validation & sanitization
const handleMessagePost = async (req, res) => {
    try {
        const rawName = req.body?.name;
        const rawEmail = req.body?.email;
        const rawRole = req.body?.role || req.body?.message;

        const name = sanitizeInput(rawName, 100);
        const email = sanitizeInput(rawEmail, 150);
        const role = sanitizeInput(rawRole, 2000);

        if (!name || !email || !role) {
            return res.status(400).json({ error: 'Name, email, and message details are required.' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: 'A valid email address is required.' });
        }

        // Trigger email notification to primary recipient ayubagarba@savilinks.com
        await sendEmailNotification({ name, email, message: role, scope: 'Quick Message Dispatch' });

        if (MONGO_URI && mongoose.connection.readyState === 1) {
            const newMessage = new Message({ name, email, role });
            await newMessage.save();
            return res.status(201).json({ id: newMessage._id, success: true, recipient: PRIMARY_RECIPIENT_EMAIL });
        } else {
            const record = { id: Date.now().toString(), name, email, role, createdAt: new Date() };
            memoryMessages.push(record);
            return res.status(201).json({ id: record.id, success: true, recipient: PRIMARY_RECIPIENT_EMAIL });
        }
    } catch (error) {
        // Sanitize output: Never leak internal error stacks or connection details to client
        console.error('❌ Failed to process message submission.');
        res.status(500).json({ error: 'Failed to process message submission. Please try again later.' });
    }
};

app.post('/api/messages', handleMessagePost);
app.post('/api/contact', handleMessagePost);

// 🏠 BULLETPROOF FALLBACK ROUTE: Express v5 compatible middleware
// This naturally catches any unhandled paths and serves index.html safely
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌐 Full-Stack Server running live on port ${PORT}`);
});