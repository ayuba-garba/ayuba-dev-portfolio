require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

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

// 📁 CORRECT PATHING: Serves all static files out of your /public directory
app.use(express.static(path.join(__dirname, 'public')));

// 📬 Route: Asynchronous Form Submission Endpoint (Netlify / Root POST)
app.post('/', (req, res) => {
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

    console.log('📥 Form Payload Captured:', { name, email, scope, messageLength: message.length });
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

        if (MONGO_URI && mongoose.connection.readyState === 1) {
            const newMessage = new Message({ name, email, role });
            await newMessage.save();
            return res.status(201).json({ id: newMessage._id, success: true });
        } else {
            const record = { id: Date.now().toString(), name, email, role, createdAt: new Date() };
            memoryMessages.push(record);
            return res.status(201).json({ id: record.id, success: true });
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