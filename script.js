/**
 * OFFICE OF AYUBA GARBA — DEEP-OBSIDIAN ORBITAL SPA ENGINE
 * Client-Side Router, Dynamic Radial State Machine, Deep-Reader Engine,
 * Architecture Case Studies, Certificate Inspector, and Form Gateways
 */

// Immediate top-level exports for bulletproof inline/mobile invocation
window.openQuickMessageModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const modal = document.getElementById('quickMessageModal') || document.getElementById('quick-message-modal');
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
        const nameInp = document.getElementById('qm-name');
        if (nameInp) setTimeout(() => nameInp.focus(), 80);
    }
};

window.closeQuickMessageModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const modal = document.getElementById('quickMessageModal') || document.getElementById('quick-message-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.style.opacity = '';
        modal.style.visibility = '';
        document.body.style.overflow = '';
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 0. CINEMATIC WELCOME SLIDESHOW OVERLAY (#intro-slides)
    // =========================================================================
    const introOverlay = document.getElementById('intro-slides');
    const enterBtn = document.getElementById('btn-enter');
    const introSlides = document.querySelectorAll('.intro-slide');
    const introIndicators = document.querySelectorAll('.slide-indicators .indicator');

    if (introOverlay && introSlides.length > 0) {
        let currentSlideIdx = 0;
        let slideTimer = null;
        let isDismissed = false;

        function showSlide(index) {
            if (isDismissed) return;
            currentSlideIdx = (index + introSlides.length) % introSlides.length;

            introSlides.forEach((slide, idx) => {
                if (idx === currentSlideIdx) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            introIndicators.forEach((ind, idx) => {
                if (idx === currentSlideIdx) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });

            const currentDuration = parseInt(introSlides[currentSlideIdx].getAttribute('data-duration'), 10) || 2600;

            if (slideTimer) clearTimeout(slideTimer);

            slideTimer = setTimeout(() => {
                if (isDismissed) return;
                if (currentSlideIdx >= introSlides.length - 1) {
                    dismissIntro();
                } else {
                    showSlide(currentSlideIdx + 1);
                }
            }, currentDuration);
        }

        function dismissIntro() {
            if (isDismissed) return;
            isDismissed = true;
            if (slideTimer) clearTimeout(slideTimer);

            introOverlay.classList.add('dismissed');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 850);
        }

        if (enterBtn) {
            enterBtn.addEventListener('click', dismissIntro);
        }

        introIndicators.forEach((ind, idx) => {
            ind.addEventListener('click', () => {
                showSlide(idx);
            });
        });

        window.addEventListener('keydown', (e) => {
            if (!isDismissed && (e.key === 'Escape' || e.key === 'Enter')) {
                dismissIntro();
            }
        });

        // Start initial slide timer
        showSlide(0);
    }

    // =========================================================================
    // 1. LIGHTWEIGHT CLIENT-SIDE SPA ROUTER & STATE MACHINE
    // =========================================================================
    const routes = {
        '': { viewId: 'view-hub', title: 'Ayuba Garba • AI Automation Specialist & Systems Engineer', accent: null },
        'experience': { viewId: 'view-experience', title: 'Experience • Ayuba Garba', accent: 'experience' },
        'projects': { viewId: 'view-projects', title: 'Projects & Systems • Ayuba Garba', accent: 'projects' },
        'about': { viewId: 'view-about', title: 'About & Philosophy • Ayuba Garba', accent: 'about' },
        'stories': { viewId: 'view-stories', title: 'Stories & Series • Ayuba Garba', accent: 'stories' },
        'connect': { viewId: 'view-connect', title: 'Connect & Advisory • Ayuba Garba', accent: 'connect' }
    };

    const views = document.querySelectorAll('.spa-view');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-item, .dock-item');
    const internalNavbar = document.getElementById('internal-navbar');
    const fabTrigger = document.getElementById('fab-contact-trigger');

    function resolveRoute() {
        const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
        const routeKey = rawHash.split('/')[0] || '';
        return routes[routeKey] ? routeKey : '';
    }

    function switchView(routeKey) {
        const routeInfo = routes[routeKey] || routes[''];

        // 1. Update Document Title
        document.title = routeInfo.title;

        // 2. Switch View Visibility with Instant Fallback & Solid State Activation
        const currentViews = document.querySelectorAll('.spa-view');
        currentViews.forEach(v => {
            if (v.id === routeInfo.viewId) {
                const isHubDesktop = (v.id === 'view-hub' && window.innerWidth > 768);
                v.style.display = isHubDesktop ? 'flex' : 'block';
                v.classList.add('active');
                v.style.opacity = '1';
                v.style.visibility = 'visible';
                v.style.transform = 'none';
                v.style.pointerEvents = 'auto';
            } else {
                v.classList.remove('active');
                v.style.display = 'none';
                v.style.opacity = '0';
                v.style.visibility = 'hidden';
                v.style.pointerEvents = 'none';
            }
        });

        // 3. Update Nav Links & Mobile Dock Active State
        navLinks.forEach(link => {
            const linkRoute = link.getAttribute('data-route');
            if (linkRoute === routeKey || (linkRoute === 'hub' && routeKey === '')) {
                link.classList.add('active');
                if (routeInfo.accent) {
                    link.classList.add(`active-${routeInfo.accent}`);
                }
            } else {
                link.classList.remove('active', 'active-experience', 'active-projects', 'active-about', 'active-stories', 'active-connect');
            }
        });

        // 4. Adapt Floating / Navbar Presentation
        if (internalNavbar) {
            if (routeKey === '') {
                // On Hub Landing: Keep navbar minimalist and unobtrusive
                internalNavbar.style.opacity = '0.9';
            } else {
                internalNavbar.style.opacity = '1';
            }
        }

        // 5. FAB button visibility
        if (fabTrigger) {
            if (routeKey === 'connect') {
                fabTrigger.style.display = 'none';
            } else {
                fabTrigger.style.display = 'flex';
            }
        }

        // Close mobile drawer if open
        const mobileDrawer = document.getElementById('mobile-drawer');
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = '';
        }

        // Close reader view if returning to stories index or navigating away
        if (routeKey !== 'stories') {
            closeStoryReader();
        }

        // Instant scroll to top on route change to prevent blank scroll offsets
        window.scrollTo(0, 0);
    }

    // Expose renderView helper and global router binding
    function renderView(routeKey) {
        return switchView(routeKey);
    }
    window.renderView = renderView;
    window.switchView = switchView;

    // Direct event delegation for all internal route links to guarantee instant response
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-route], a[href^="#/"]');
        if (link) {
            const href = link.getAttribute('href');
            const dataRoute = link.getAttribute('data-route');
            let target = '';
            if (dataRoute !== null && dataRoute !== undefined) {
                target = dataRoute === 'hub' ? '' : dataRoute;
            } else if (href && href.startsWith('#/')) {
                target = href.replace(/^#\/?/, '').trim();
            }
            if (routes[target] !== undefined) {
                switchView(target);
            }
        }
    });

    // Hash Change Event & Initial Load
    window.addEventListener('hashchange', () => {
        const targetRoute = resolveRoute();
        switchView(targetRoute);
    });

    // Initialize Router
    const initialRoute = resolveRoute();
    switchView(initialRoute);

    // =========================================================================
    // 2. INTERACTIVE CURSOR AMBIENT SPOTLIGHT
    // =========================================================================
    const updateAmbientSpotlight = (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', updateAmbientSpotlight, { passive: true });



    // =========================================================================
    // 4. EXPERIENCE VIEW: TIMELINE READ MORE ACCORDION
    // =========================================================================
    document.querySelectorAll('[data-accordion]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-accordion');
            const targetContent = document.getElementById(targetId);
            if (!targetContent) return;

            const isOpen = targetContent.classList.contains('open');
            if (isOpen) {
                targetContent.classList.remove('open');
                trigger.innerHTML = '<span>Read more</span> <span>↓</span>';
            } else {
                targetContent.classList.add('open');
                trigger.innerHTML = '<span>Collapse details</span> <span>↑</span>';
            }
        });
    });

    // =========================================================================
    // 5. PROJECTS VIEW: CATEGORY FILTER TABS
    // =========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(8px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // =========================================================================
    // 6. STORIES VIEW: SUB-TABS & DEEP-READER ENGINE
    // =========================================================================
    const storiesTabButtons = document.querySelectorAll('.stories-tab-btn');
    const tabSeriesContent = document.getElementById('tab-series-content');
    const tabArticlesContent = document.getElementById('tab-articles-content');

    storiesTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            storiesTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tab = btn.getAttribute('data-stories-tab');
            if (tab === 'series') {
                tabSeriesContent.classList.remove('hidden');
                tabArticlesContent.classList.add('hidden');
            } else {
                tabSeriesContent.classList.add('hidden');
                tabArticlesContent.classList.remove('hidden');
            }
        });
    });

    // Story Registry
    const STORY_REGISTRY = {
        'waypoint-1': {
            series: 'Lessons from WayPoint: Building Resilient Autonomous Systems • Ep 01',
            title: 'When Microservices Crack Under Pressure: The Myth of Loose Coupling',
            readTime: '7 min read • Technical Post-Mortem',
            body: `
                <p>In mid-2023, during an intense infrastructure migration for a high-volume client, the architecture team followed conventional orthodoxy: decompose the monolith into eleven fine-grained microservices communicate over HTTP REST endpoints.</p>
                <p>Within forty-eight hours of deployment under peak traffic, the cascading failure began. Latency did not increase linearly—it exploded exponentially. A single client checkout request was generating upwards of twenty-eight internal HTTP round-trips across network namespaces. When one downstream inventory service experienced an 80ms garbage collection pause, worker thread pools across upstream gateways dried up completely.</p>
                
                <div class="article-callout">
                    <strong>Key Architectural Takeaway:</strong>
                    <p class="mt-1 mb-0">Microservices do not eliminate complexity; they distribute it across unreliable networks. Do not break a system into separate network hops until you have bounded domain contexts with strictly decoupled data ownership.</p>
                </div>

                <h2>The Architecture of Recovery</h2>
                <p>We halted the bleeding by introducing three critical architectural invariants:</p>
                <ol class="deliverables-list">
                    <li><strong>Asynchronous Ingress Queues:</strong> Moving synchronous HTTP remote calls into persistent, write-ahead message queues with idempotent retry loops.</li>
                    <li><strong>Co-locating Critical Path Services:</strong> Re-integrating the checkout and reservation engines into a shared memory Go process, eliminating 22 network hops per transaction.</li>
                    <li><strong>Aggressive Circuit Breaking:</strong> Embedding client-side token bucket rate limits and fast-fail circuit breakers to prevent thundering herd crashes.</li>
                </ol>
                <p>The lesson was indelibly carved: architecture is the discipline of choosing which failure modes you are willing to manage.</p>
            `
        },
        'waypoint-2': {
            series: 'Lessons from WayPoint: Building Resilient Autonomous Systems • Ep 02',
            title: 'The Fallacy of Eventual Consistency in Financial Corridors',
            readTime: '6 min read • Concurrency Deep Dive',
            body: `
                <p>Eventual consistency is a seductive design pattern. Cloud vendors promote it heavily: decouple your writes, broadcast events to distributed read-replicas, and let the system "eventually" converge.</p>
                <p>However, when dealing with double-entry ledgers, currency conversions, or limited physical inventory, eventual consistency is frequently a polite euphemism for data corruption. In high-concurrency environments, that 50ms propagation delay is an eternity during which users can spend the same balance twice or purchase the last remaining item simultaneously.</p>
                
                <div class="article-callout">
                    <strong>The Mathematical Law:</strong>
                    <p class="mt-1 mb-0">Financial balances must adhere to strict ACID conservation. Money cannot be created or destroyed during a transfer—it can only move between accounts with exact debit and credit symmetry.</p>
                </div>

                <h2>Deterministic Row-Locking in Rust</h2>
                <p>To solve the dual problems of race conditions and database deadlocks without degrading throughput, we built our ledger engine in Rust with deterministic lock sequencing:</p>
                <p>When transferring funds from Account A to Account B, if another concurrent process is transferring from Account B to Account A, traditional database locks will lock A and B simultaneously in reverse order, creating a deadlock. By enforcing an invariant that locks are ALWAYS acquired in ascending numerical order of Account ID, circular lock dependency cycles become mathematically impossible.</p>
            `
        },
        'waypoint-3': {
            series: 'Lessons from WayPoint: Building Resilient Autonomous Systems • Ep 03',
            title: 'Designing Self-Healing Autonomous Business Workflows',
            readTime: '8 min read • AI & Systems Integration',
            body: `
                <p>The promise of AI automation often stumbles when confronted with unhandled edge cases in the real world: an API endpoint returns a 502 bad gateway, an email parser receives malformed PDF encodings, or a CRM web-hook payload drops key customer identifiers.</p>
                <p>If an automation pipeline terminates or produces hallucinated data upon the first error, it is not an intelligent system—it is an operational liability.</p>

                <h2>The 3 Pillars of Self-Healing Automation</h2>
                <ol class="deliverables-list">
                    <li><strong>Idempotency By Design:</strong> Every automation step emits a unique cryptographic hash derived from its payload. If a network interruption forces a retry, the step verifies against the state store and skips redundant execution.</li>
                    <li><strong>Compensating Saga Transactions:</strong> When a multi-stage workflow fails on step 4 of 5, the engine executes compensatory reversal actions for steps 1 through 3 rather than leaving orphaned records in downstream databases.</li>
                    <li><strong>Deterministic Schema Envelopes:</strong> LLMs are strictly quarantined behind Pydantic / Zod schema validators. If the model outputs invalid JSON, it is automatically re-prompted with the validation error diff until structural compliance is met.</li>
                </ol>
            `
        },
        'journey-1': {
            series: '90-Day Appreciation Journey: The Discipline of Deep Engineering • Ep 01',
            title: 'Radical Focus in an Age of Fragmented Attention',
            readTime: '5 min read • Personal Philosophy',
            body: `
                <p>Early in my engineering journey, I believed productivity meant answering every Slack ping within sixty seconds, having twelve browser tabs open, and jumping between code reviews, bug fixes, and feature spikes simultaneously.</p>
                <p>The result was superficial velocity. Features shipped quickly, but subtle concurrency bugs, race conditions, and unoptimized queries lingered beneath the surface.</p>

                <h2>The 4-Hour Deep Work Standard</h2>
                <p>True architectural breakthroughs happen only during sustained, uninterrupted cognitive flow. Complex systems cannot be held in human working memory when interrupted every fifteen minutes.</p>
                <p>Structuring engineering days into protected four-hour deep blocks transformed my output. Code complexity dropped, test coverage became comprehensive, and systems ran in production for months without a single panic.</p>
            `
        },
        'journey-2': {
            series: '90-Day Appreciation Journey: The Discipline of Deep Engineering • Ep 02',
            title: 'What Writing 10,000 Lines of C++ Taught Me About Silicon',
            readTime: '8 min read • Systems Craftsmanship',
            body: `
                <p>High-level garbage-collected languages provide immense developer velocity. But they also shield engineers from the physical reality of the machine: CPU caches, branch predictors, pointer alignments, and heap allocation penalties.</p>
                <p>Building high-frequency algorithmic trading systems in MQL5 and C++ stripped away those abstractions. When a market tick arrives, an allocation on the heap introduces memory manager locks and potential latency jitter that will miss the market order book queue.</p>

                <div class="article-callout">
                    <strong>The Zero-Allocation Principle:</strong>
                    <p class="mt-1 mb-0">Pre-allocate all ring buffers, queues, and order state structures at system startup. The critical path execution loop must perform zero memory allocations.</p>
                </div>
            `
        },
        'journey-3': {
            series: '90-Day Appreciation Journey: The Discipline of Deep Engineering • Ep 03',
            title: 'The Architecture of Mastery: Beyond Framework Churn',
            readTime: '6 min read • Career Architecture',
            body: `
                <p>Every eighteen months, the frontend and backend ecosystems introduce a new "revolutionary" framework. Junior engineers often fall into the trap of learning API surface areas rather than fundamental principles.</p>
                <p>Frameworks come and go; computer science fundamentals remain invariant. A B-Tree index behaves identically whether queried via PostgreSQL, SQLite, or an in-memory cache. TCP flow control and packet fragmentation govern network transfers regardless of whether you call it REST, gRPC, or WebSockets.</p>
            `
        },
        'article-acid': {
            series: 'Technical Deep Dive • Systems Essay',
            title: 'Designing ACID Ledgers with Deterministic Row Locking in Rust',
            readTime: '9 min read • Architecture Essay',
            body: `
                <p>Relational databases provide ACID transaction guarantees, but when concurrent threads attempt to mutate identical pairs of rows in reverse order, deadlocks are inevitable. This essay breaks down how we engineered a zero-deadlock ledger engine in Rust using deterministic ID sorting, row-level locks, and balanced debit-credit state invariance.</p>
            `
        },
        'article-ai': {
            series: 'Technical Deep Dive • AI Architecture',
            title: 'Bridging LLMs and Enterprise APIs: The Determinism Gap',
            readTime: '7 min read • AI Architecture',
            body: `
                <p>Probabilistic reasoning is fantastic for synthesis, classification, and drafting. It is catastrophic when executing credit card transactions or updating ERP inventories. Learn how to wrap LLM agentic reasoning in deterministic transaction envelopes with strict schema validation.</p>
            `
        },
        'article-quant': {
            series: 'Technical Deep Dive • Quantitative Logic',
            title: 'The Mathematics of Algorithmic Trailing Stops & Volatility Filters',
            readTime: '8 min read • Quantitative Systems',
            body: `
                <p>Why continuous trailing stops get chopped out during normal market noise, and why stepped trailing stops combined with multi-timeframe ATR volatility bands mathematically outperform retail risk models.</p>
            `
        }
    };

    window.openStoryReader = function(storyKey) {
        const story = STORY_REGISTRY[storyKey];
        if (!story) return;

        const storiesIndexView = document.getElementById('stories-index-view');
        const readerView = document.getElementById('reader-view');
        const readerSeriesTag = document.getElementById('reader-series-tag');
        const readerTitle = document.getElementById('reader-title');
        const readerReadtime = document.getElementById('reader-readtime');
        const readerBody = document.getElementById('reader-body');

        if (readerSeriesTag) readerSeriesTag.textContent = story.series;
        if (readerTitle) readerTitle.textContent = story.title;
        if (readerReadtime) readerReadtime.textContent = story.readTime;
        if (readerBody) readerBody.innerHTML = story.body;

        if (storiesIndexView && readerView) {
            storiesIndexView.style.display = 'none';
            readerView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    window.closeStoryReader = function() {
        const storiesIndexView = document.getElementById('stories-index-view');
        const readerView = document.getElementById('reader-view');
        if (storiesIndexView && readerView) {
            readerView.classList.remove('active');
            storiesIndexView.style.display = 'block';
        }
    };

    // =========================================================================
    // 7. CONNECT VIEW: STRATEGIC BRIEF FORM HANDLER & HUD CONFIRMATION
    // =========================================================================
    const connectForm = document.getElementById('connect-page-form');
    const connectFormContainer = document.getElementById('contact-form-container');
    const connectHudCard = document.getElementById('connect-hud-card');
    const resetConnectBtn = document.getElementById('reset-connect-form');
    const connectSubmitBtn = document.getElementById('connect-submit-btn');
    const connectStatus = document.getElementById('connect-form-status');

    if (connectForm) {
        connectForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            connectSubmitBtn.disabled = true;
            connectSubmitBtn.style.opacity = '0.6';
            connectSubmitBtn.textContent = 'Transmitting brief...';
            if (connectStatus) connectStatus.replaceChildren();

            const formData = new FormData(connectForm);
            if (!formData.get('form-name')) {
                formData.append('form-name', 'contact');
            }

            try {
                // Post to Netlify Form / Server
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (!response.ok) {
                    throw new Error('Edge dispatch returned status ' + response.status);
                }

                connectForm.reset();
                connectSubmitBtn.disabled = false;
                connectSubmitBtn.style.opacity = '1';
                connectSubmitBtn.textContent = 'Transmit Strategic Brief';

                if (connectFormContainer && connectHudCard) {
                    connectFormContainer.classList.add('hidden');
                    connectHudCard.classList.remove('hidden');
                }

                showGlassToast('Thank you — your message has been received.', '✓');
            } catch (err) {
                console.warn('Fallback: Posting to /api/messages...', err);
                try {
                    await fetch('/api/messages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: formData.get('name'),
                            email: formData.get('email'),
                            role: (formData.get('scope') || 'General') + ': ' + (formData.get('message') || '')
                        })
                    });

                    connectForm.reset();
                    connectSubmitBtn.disabled = false;
                    connectSubmitBtn.style.opacity = '1';
                    connectSubmitBtn.textContent = 'Transmit Strategic Brief';

                    if (connectFormContainer && connectHudCard) {
                        connectFormContainer.classList.add('hidden');
                        connectHudCard.classList.remove('hidden');
                    }
                    showGlassToast('Thank you — your message has been received.', '✓');
                } catch (fallbackErr) {
                    if (connectStatus) {
                        const alertBox = document.createElement('div');
                        alertBox.className = 'p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs text-left';
                        alertBox.innerHTML = '<strong>Dispatch Interrupted:</strong> Unable to connect to edge API. Please email directly to <strong>ayubagarba.tech@gmail.com</strong>.';
                        connectStatus.replaceChildren(alertBox);
                    }
                    connectSubmitBtn.disabled = false;
                    connectSubmitBtn.style.opacity = '1';
                    connectSubmitBtn.textContent = 'Transmit Strategic Brief';
                }
            }
        });

        if (resetConnectBtn) {
            resetConnectBtn.addEventListener('click', () => {
                if (connectHudCard && connectFormContainer) {
                    connectHudCard.classList.add('hidden');
                    connectFormContainer.classList.remove('hidden');
                    const nameInput = document.getElementById('connect-name');
                    if (nameInput) nameInput.focus();
                }
            });
        }
    }

    // =========================================================================
    // 8. QUICK MESSAGE FLOATING MODAL
    // =========================================================================
    function openQuickMessageModal() {
        const modal = document.getElementById('quickMessageModal') || document.getElementById('quick-message-modal');
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            modal.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
            const nameInp = document.getElementById('qm-name');
            if (nameInp) setTimeout(() => nameInp.focus(), 80);
        }
    }
    window.openQuickMessageModal = openQuickMessageModal;

    function closeQuickMessageModal() {
        const modal = document.getElementById('quickMessageModal') || document.getElementById('quick-message-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
            modal.style.opacity = '';
            modal.style.visibility = '';
            document.body.style.overflow = '';
        }
    }
    window.closeQuickMessageModal = closeQuickMessageModal;

    const quickModal = document.getElementById('quickMessageModal') || document.getElementById('quick-message-modal');
    const quickModalClose = document.getElementById('quickMessageClose');
    const quickForm = document.getElementById('quick-message-form');

    // Attach click and touch listeners to all potential FAB selectors
    const fabTriggers = document.querySelectorAll('.fab-trigger, #fab-contact-trigger, #quick-message, [data-fab="quick-message"]');
    fabTriggers.forEach(fab => {
        fab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickMessageModal();
        });
        fab.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickMessageModal();
        }, { passive: false });
    });

    // Delegation failsafe for dynamically rendered or nested elements
    document.addEventListener('click', (e) => {
        const fab = e.target.closest('.fab-trigger, #fab-contact-trigger, #quick-message, [data-fab="quick-message"]');
        if (fab) {
            e.preventDefault();
            e.stopPropagation();
            openQuickMessageModal();
        }
    });

    if (quickModalClose) {
        quickModalClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeQuickMessageModal();
        });
    }

    if (quickModal) {
        quickModal.addEventListener('click', (e) => {
            if (e.target === quickModal) {
                closeQuickMessageModal();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQuickMessageModal();
        }
    });

    if (quickForm) {
        quickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('qm-submit-btn') || quickForm.querySelector("button[type='submit']");
            if (btn) btn.textContent = 'Redirecting...';

            // Extract inputs synchronously
            const name = (quickForm.querySelector("[name='name']") || document.getElementById('qm-name') || {}).value?.trim() || 'Visitor';
            const email = (quickForm.querySelector("[name='email']") || document.getElementById('qm-email') || {}).value?.trim() || '';
            const message = (quickForm.querySelector("[name='message']") || document.getElementById('qm-message') || {}).value?.trim() || '';

            if (!message) {
                if (typeof window.showGlassToast === 'function') {
                    window.showGlassToast('Please enter a message before sending.', '⚠️');
                } else {
                    alert('Please enter a message before sending.');
                }
                if (btn) btn.textContent = 'Send Instant Message';
                return;
            }

            // Construct WhatsApp URL
            const whatsappNumber = '2348034108158';
            const text = `*New Quick Message*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

            // Concurrently dispatch payload to Netlify Forms (guaranteed via keepalive / sendBeacon)
            const netlifyPayload = new FormData(quickForm);
            if (!netlifyPayload.get('form-name')) {
                netlifyPayload.append('form-name', 'quick-message');
            }
            if (!netlifyPayload.get('name')) netlifyPayload.append('name', name);
            if (!netlifyPayload.get('email')) netlifyPayload.append('email', email);
            if (!netlifyPayload.get('message')) netlifyPayload.append('message', message);

            const urlEncodedBody = new URLSearchParams(netlifyPayload).toString();

            try {
                if (navigator.sendBeacon) {
                    navigator.sendBeacon('/', new Blob([urlEncodedBody], { type: 'application/x-www-form-urlencoded' }));
                } else {
                    fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: urlEncodedBody,
                        keepalive: true
                    }).catch(() => {});
                }
            } catch (err) {
                console.warn('Netlify dispatch note:', err);
            }

            // Fallback API call for local development backend
            try {
                fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        message,
                        role: message,
                        recipient: 'ayubagarba@savilinks.com'
                    }),
                    keepalive: true
                }).catch(() => {});
            } catch (apiErr) {
                // Ignore fallback error
            }

            // Force open WhatsApp immediately across mobile and desktop viewports
            const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                window.location.href = whatsappUrl;
            } else {
                const win = window.open(whatsappUrl, '_blank');
                if (!win || win.closed || typeof win.closed === 'undefined') {
                    window.location.href = whatsappUrl;
                }
            }

            // Reset form, dismiss modal cleanly, and display confirmation toast
            quickForm.reset();
            if (btn) btn.textContent = 'Send Instant Message';
            if (typeof window.closeQuickMessageModal === 'function') {
                window.closeQuickMessageModal();
            }
            if (typeof window.showGlassToast === 'function') {
                window.showGlassToast('Message sent to WhatsApp & Netlify inbox!', '✓');
            }
        });
    }

    // =========================================================================
    // 9. GLASS TOAST NOTIFICATION ENGINE
    // =========================================================================
    window.showGlassToast = (message, icon = '✦') => {
        const existingToast = document.querySelector('.glass-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'glass-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');

        const iconSpan = document.createElement('span');
        iconSpan.className = 'text-sm font-semibold text-cyan-400';
        iconSpan.textContent = icon;

        const msgSpan = document.createElement('span');
        msgSpan.className = 'tracking-tight text-white';
        msgSpan.textContent = message;

        toast.appendChild(iconSpan);
        toast.appendChild(msgSpan);

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    };

    // =========================================================================
    // 10. CERTIFICATE MODAL DIALOG ENGINE
    // =========================================================================
    const certModalOverlay = document.getElementById('certModalOverlay');
    const certModalClose = document.getElementById('certModalClose');

    const CERTIFICATE_DATA = {
        'walmart': {
            title: 'Advanced Software Engineering (Job Simulation)',
            issuer: 'Walmart Global Tech / Forage',
            date: 'Completed July 27, 2026',
            competencies: [
                'Advanced Data Structures',
                'Software Architecture',
                'Relational Database Design',
                'Data Munging'
            ],
            imageSrc: 'assets/certificates/walmart-advanced-engineering.png',
            enrolmentCode: 'SuwohMZHJQWeglqsk',
            userCode: '6a5b7d77d6ac6ea542da6011',
            verifyUrl: 'https://www.theforage.com/simulations/walmart/advanced-software-engineering',
            notes: 'Practical simulation evaluating relational data modeling, query optimization, high-throughput data munging pipelines, and enterprise architecture.'
        },
        'aws-ai': {
            title: 'AWS AI Practitioner Challenge',
            issuer: 'Udacity & Accenture',
            date: 'Completed May 7, 2026',
            competencies: [
                'Machine Learning Pipelines',
                'Cloud AI Services',
                'AWS Infrastructure',
                'Foundation Model Governance'
            ],
            imageSrc: 'assets/certificates/aws-ai-practitioner.png',
            verifyUrl: 'https://udacity.com/certificate/e/4961dd9a-34ba-11f1-915e-0b6773dac5dc',
            verificationCode: '4961dd9a-34ba-11f1-915e-0b6773dac5dc',
            notes: 'Verified certification validating cloud AI foundations, AWS SageMaker pipeline lifecycle, generative foundation models, and secure cloud ML infrastructure.'
        },
        'uopeople': {
            title: 'Emotional Intelligence in Teamwork',
            issuer: 'University of the People',
            date: 'Completed July 29, 2026',
            competencies: [
                'Strengthening Workplace Relationships',
                'Cross-Functional Teamwork',
                'Engineering Leadership',
                'Collaborative Architecture'
            ],
            imageSrc: 'assets/certificates/uopeople-emotional-intelligence.jpg',
            verificationCode: '466627bb-9e07-4a6e-b4a1-07b85073c5db',
            verifyUrl: null,
            notes: 'University co-curricular event focused on high-performance cross-functional collaboration, team empathy, psychological safety, and consensus-driven systems architecture.'
        }
    };

    window.openCertificateModal = (certKey) => {
        const cert = CERTIFICATE_DATA[certKey];
        if (!cert || !certModalOverlay) return;

        const modalImg = document.getElementById('certModalImage');
        const modalTitle = document.getElementById('certModalTitle');
        const modalIssuer = document.getElementById('certModalIssuer');
        const modalDate = document.getElementById('certModalDate');
        const modalCompetencies = document.getElementById('certModalCompetencies');
        const modalVerificationDetails = document.getElementById('certModalVerificationDetails');
        const modalNotes = document.getElementById('certModalNotes');

        if (modalImg) {
            modalImg.src = cert.imageSrc;
            modalImg.alt = `${cert.title} - ${cert.issuer}`;
        }
        if (modalTitle) modalTitle.textContent = cert.title;
        if (modalIssuer) modalIssuer.textContent = cert.issuer;
        if (modalDate) modalDate.textContent = cert.date;
        if (modalNotes) modalNotes.textContent = cert.notes;

        if (modalCompetencies) {
            modalCompetencies.innerHTML = cert.competencies.map(comp => 
                `<span class="text-xs font-mono px-2.5 py-1 rounded bg-[#12141a] border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                    <span class="text-emerald-400">✦</span> ${comp}
                </span>`
            ).join('');
        }

        if (modalVerificationDetails) {
            let html = '';
            if (cert.enrolmentCode && cert.userCode) {
                html += `
                    <div class="space-y-2">
                        <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Verification Codes</div>
                        <div class="flex flex-wrap gap-2 items-center">
                            <span class="text-xs font-mono px-3 py-1.5 rounded bg-[#0a0c10] border border-white/10 text-neutral-300">
                                Enrolment: <strong class="text-emerald-300 font-bold">${cert.enrolmentCode}</strong>
                            </span>
                            <button class="text-[11px] px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300" onclick="navigator.clipboard.writeText('${cert.enrolmentCode}'); showGlassToast('Enrolment code copied: ${cert.enrolmentCode}', '✓');">
                                Copy Enrolment
                            </button>
                        </div>
                    </div>
                `;
            } else if (cert.verificationCode) {
                html += `
                    <div class="space-y-2">
                        <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Verification ID</div>
                        <div class="flex flex-wrap gap-2 items-center">
                            <span class="text-xs font-mono px-3 py-1.5 rounded bg-[#0a0c10] border border-white/10 text-neutral-300 break-all">
                                ID: <strong class="text-emerald-300 font-bold">${cert.verificationCode}</strong>
                            </span>
                            <button class="text-[11px] px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300" onclick="navigator.clipboard.writeText('${cert.verificationCode}'); showGlassToast('Verification ID copied to clipboard', '✓');">
                                Copy ID
                            </button>
                        </div>
                    </div>
                `;
            }

            if (cert.verifyUrl) {
                html += `
                    <div class="pt-3">
                        <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-200">
                            <span>Open Official Verification Gateway ↗</span>
                        </a>
                    </div>
                `;
            }
            modalVerificationDetails.innerHTML = html;
        }

        certModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeCertificateModal = () => {
        if (!certModalOverlay) return;
        certModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-cert-key]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const certKey = trigger.getAttribute('data-cert-key');
            window.openCertificateModal(certKey);
        });
    });

    if (certModalClose) certModalClose.addEventListener('click', closeCertificateModal);
    if (certModalOverlay) {
        certModalOverlay.addEventListener('click', (e) => {
            if (e.target === certModalOverlay) closeCertificateModal();
        });
    }

    // =========================================================================
    // 11. CASE STUDY ARCHITECTURE MODAL ENGINE
    // =========================================================================
    const caseModalOverlay = document.getElementById('caseStudyModalOverlay');
    const caseModalClose = document.getElementById('caseStudyModalClose');

    const CASE_STUDY_DATA = {
        'awsoli': {
            tag: 'PRODUCTION PLATFORM 01',
            domain: 'GLOBAL EDGE & HIGH-AVAILABILITY CLOUD',
            title: 'Awsoli: Global Edge Optimization & Dynamic Caching',
            summary: 'Engineered for rapid non-blocking delivery across global clients. Implements multi-tiered Cloudflare Anycast edge routing, dynamic image transformation, sub-second TTFB, and hardened DNS failover guaranteeing 99.99% availability.',
            liveUrl: 'https://awsoli.org/',
            metrics: [
                { label: 'Global Edge TTFB', val: '<120ms' },
                { label: 'Uptime SLA', val: '99.99%' },
                { label: 'Asset Compression', val: '78%' },
                { label: 'Core Web Vitals', val: '99/100' }
            ],
            pipeline: [
                { step: '01', title: 'DNS Anycast Ingress', desc: 'Anycast routes visitor to nearest global Point of Presence (<25ms edge hop).' },
                { step: '02', title: 'Edge Worker Filter', desc: 'Headers sanitized, CSP headers injected, dynamic WebP format negotiated.' },
                { step: '03', title: 'Origin Shield Cache', desc: 'Tiered cache prevents origin stampedes using stale-while-revalidate policies.' },
                { step: '04', title: 'Zero-CLS Render', desc: 'Optimized typography glyphs & critical CSS render above-the-fold content immediately.' }
            ],
            ingressDesc: 'Ingress traffic is governed via Cloudflare Anycast routing across 300+ global edge locations. Incoming HTTP/3 requests undergo TLS 1.3 zero-round-trip resumption (0-RTT), stripping unneeded cookies on static assets to minimize network packet payload sizes.',
            persistenceDesc: 'Static assets are compiled with immutable content-hash digests and served with multi-tier edge cache-control policies. Origin requests fallback automatically through redundant availability zones.',
            stressNotes: [
                '✦ Stress-tested under simulated 15,000 req/sec traffic spikes with zero origin degradation.',
                '✦ Global CDN hit ratio maintained above 96.4% across desktop, tablet, and mobile agents.',
                '✦ Automated origin failover tested with simulated network disconnects, yielding zero user-facing 5xx errors.'
            ],
            decisions: [
                {
                    title: 'Edge-First Asset Pipelines vs Traditional Monolith Hosting',
                    rationale: 'Offloading dynamic compression (WebP) and caching to edge workers reduced origin compute demands by 84% while cutting mobile bandwidth consumption by 78%.'
                },
                {
                    title: 'Immutable Cache-Busting vs Query String Versioning',
                    rationale: 'Using content hashes in filenames allows infinite edge caching without risk of stale asset contamination after deployments.'
                }
            ],
            techStack: [
                { name: 'Cloudflare Edge Workers', role: 'Serverless request interception, security headers, and compression' },
                { name: 'TypeScript', role: 'Type-safe client interaction architecture and build automation' },
                { name: 'HTML5 / Modern CSS', role: 'Zero-layout-shift responsive semantic UI structure' },
                { name: 'Netlify Edge', role: 'Atomic automated continuous deployment and branch previews' }
            ],
            securityPosture: 'Hardened HTTP headers including Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), and X-Frame-Options: DENY are injected at the edge, mitigating XSS and clickjacking.'
        },
        'taila': {
            tag: 'PRODUCTION PLATFORM 02',
            domain: 'HIGH-CONCURRENCY COMMERCE & ASYNC GATEWAY',
            title: 'Taila: High-Concurrency Product Funnel & API Gateway',
            summary: 'Engineered for intensive transaction volume and seamless catalog interaction. Implements an asynchronous Go API gateway, Redis distributed caching, token-bucket rate limiting, and optimistic row locking to prevent inventory overselling during traffic peaks.',
            liveUrl: 'https://taila.app/',
            metrics: [
                { label: 'Gateway Latency', val: '<140ms' },
                { label: 'Throughput Peak', val: '4,500 rps' },
                { label: 'Redis Cache Hit', val: '94.2%' },
                { label: 'Order Fidelity', val: '99.98%' }
            ],
            pipeline: [
                { step: '01', title: 'TLS Ingress & Auth', desc: 'Go API proxy validates JWT session claims and terminates TLS connections.' },
                { step: '02', title: 'Token Bucket Rate Limit', desc: 'Redis sliding-window rate limit prevents brute-force bot sweeps.' },
                { step: '03', title: 'Async Worker Queue', desc: 'Goroutines handle inventory reservations and payment webhooks.' },
                { step: '04', title: 'Partitioned DB Commit', desc: 'PostgreSQL read-replica cluster applies optimistic lock state transitions.' }
            ],
            ingressDesc: 'Clients communicate via HTTP/2 and WebSocket endpoints. Ingress traffic is load-balanced across stateless Go instances running lightweight goroutine worker pools.',
            persistenceDesc: 'Read-heavy product catalogs are cached in Redis clusters with automated cache invalidation upon inventory updates. Financial state transitions are written to PostgreSQL with strict ACID blocks.',
            stressNotes: [
                '✦ Benchmarked at 4,500 concurrent requests/sec with p99 latency remaining comfortably below 160ms.',
                '✦ Zero race conditions detected during simulated simultaneous purchases of last-in-stock items.'
            ],
            decisions: [
                {
                    title: 'Go API Gateway vs Node.js Event Loop',
                    rationale: 'Go goroutines allow true OS-thread multiplexing without event loop stutter during heavy cryptographic JWT hashing and JSON schema serialization.'
                }
            ],
            techStack: [
                { name: 'Go (Golang)', role: 'Low-latency API gateway, worker pools, and request routing' },
                { name: 'Redis Cluster', role: 'In-memory distributed caching, token bucket rate limiting' },
                { name: 'PostgreSQL', role: 'ACID relational data persistence and order reconciliation' }
            ],
            securityPosture: 'Session tokens are signed with HMAC-SHA256, stored in HttpOnly SameSite=Strict cookies, and cross-checked against Redis blacklists upon logout.'
        },
        'savilinks': {
            tag: 'PRODUCTION PLATFORM 03',
            domain: 'ENTERPRISE MESSAGE DISPATCH & BROKER PIPELINES',
            title: 'SaviLinks: Enterprise Dispatch Gateway & Durable Queues',
            summary: 'Engineered for high-volume enterprise communications and corporate dispatch corridors. Features durable message brokers, dead-letter queue (DLQ) retry automation, schema-isolated multi-tenant partitioning, and real-time SLA telemetry dashboards.',
            liveUrl: 'https://savilinks.com/',
            metrics: [
                { label: 'Dispatch Latency', val: '<45ms' },
                { label: 'Dispatched Rate', val: '10k/sec' },
                { label: 'Message Loss', val: '0.000%' },
                { label: 'Webhook Acknowledge', val: '<5ms' }
            ],
            pipeline: [
                { step: '01', title: 'HMAC Webhook Ingest', desc: 'Ingestion endpoint verifies cryptographic signatures and returns immediate HTTP 202.' },
                { step: '02', title: 'Broker Write-Ahead', desc: 'Message payload buffered to durable queue with persistent disk journaling.' },
                { step: '03', title: 'Worker Pool Execution', desc: 'Worker pods consume queues with exponential backoff & jitter.' },
                { step: '04', title: 'Audit Ledger & Telemetry', desc: 'Delivery telemetry emitted to time-partitioned PostgreSQL tables.' }
            ],
            ingressDesc: 'Corporate webhooks and user inquiries enter through a high-availability ingestion cluster. The ingress layer performs instantaneous signature verification and immediately enqueues the payload.',
            persistenceDesc: 'Queue persistence is backed by disk write-ahead logs with consumer acknowledgment confirmation. Audit records are partitioned by month.',
            stressNotes: [
                '✦ Validated with burst tests exceeding 10,000 queued messages/sec with zero message drops.',
                '✦ Dead-letter queue automated replay successfully resolved 100% of simulated downstream timeout faults.'
            ],
            decisions: [
                {
                    title: 'Durable Queue Decoupling vs Synchronous Processing',
                    rationale: 'Isolates the platform from downstream carrier delays; incoming requests continue to be acknowledged in under 5ms.'
                }
            ],
            techStack: [
                { name: 'TypeScript / Node.js', role: 'Strongly-typed microservices and asynchronous message consumers' },
                { name: 'RabbitMQ / Redis', role: 'Durable queue buffering and pub/sub message dispatching' },
                { name: 'PostgreSQL', role: 'Time-partitioned operational ledger' }
            ],
            securityPosture: 'All webhook payloads require HMAC-SHA256 signature verification matching unique per-tenant secret keys.'
        },
        'defenzio': {
            tag: 'PRODUCTION PLATFORM 04',
            domain: 'CYBER POSTURE & REGIONAL DEFENSE TOPOLOGY',
            title: 'Defenzio: Threat Mitigation Portal & Linux Cluster Defense',
            summary: 'Engineered for regional cyber defense and threat mitigation. Deploys eBPF kernel packet inspection, automated intrusion containment, synchronized IP ban topology across regional nodes, and immutable cryptographic audit trails.',
            liveUrl: 'https://defenzio.com.ng/',
            metrics: [
                { label: 'DDoS Filtered', val: '>99.99%' },
                { label: 'Threat Triage', val: '<2.0s' },
                { label: 'Cluster Uptime', val: '99.995%' },
                { label: 'Breach Incidents', val: '0' }
            ],
            pipeline: [
                { step: '01', title: 'Kernel Ingress Scrubbing', desc: 'eBPF filters drop malformed packets at network interface level before OS stack.' },
                { step: '02', title: 'Threat Correlator', desc: 'Heuristic log parsing identifies brute-force patterns and SQL injection.' },
                { step: '03', title: 'Cluster Blacklist Sync', desc: 'nftables firewall rules propagate across regional server nodes in <1.5s.' },
                { step: '04', title: 'Hardened DMZ Gateway', desc: 'Internal microservices execute in read-only sandboxed namespaces.' }
            ],
            ingressDesc: 'Network traffic passes through multi-stage edge scrubbing filters. High-rate layer-4 SYN floods are mitigated via SYN cookies and kernel XDP rules.',
            persistenceDesc: 'System audit logs are written to append-only storage volumes with cryptographic hash chaining.',
            stressNotes: [
                '✦ Deflected simulated 100,000 packet/sec SYN flood with kernel CPU utilization staying under 12%.',
                '✦ Threat containment pipeline automatically blacklisted attacking IPs in 1.4 seconds.'
            ],
            decisions: [
                {
                    title: 'Kernel-Level eBPF Filtering vs User-Space Firewalls',
                    rationale: 'Dropping malicious traffic at the driver layer avoids context-switching into user space, conserving over 85% CPU power under hostile flood conditions.'
                }
            ],
            techStack: [
                { name: 'Linux Kernel (eBPF / nftables)', role: 'High-speed packet filtering and dynamic firewall policy enforcement' },
                { name: 'NGINX Reverse Proxy', role: 'TLS termination and request inspection' },
                { name: 'Python / Bash Automation', role: 'Incident triage pipelines and alert routing' }
            ],
            securityPosture: 'Zero-trust network architecture with mutual TLS (mTLS) between all internal services.'
        },
        'nexaverse': {
            tag: 'ACTIVE DISTRIBUTED SYSTEM 01',
            domain: 'SUPER-APP ARCHITECTURE & STATE INVARIANCE',
            title: 'NeXaVerSe MVP: Go API Gateway & Double-Entry Rust Ledger',
            summary: 'Institutional-grade ecosystem featuring an asynchronous Go reverse proxy, double-entry ACID Rust ledger with deterministic ascending row locks to mathematically eliminate deadlocks, distributed WebSocket multiplexing, and zk-SNARK biometric gating.',
            liveUrl: '#/projects',
            metrics: [
                { label: 'Gateway Latency', val: '<1.2ms' },
                { label: 'State Invariance', val: '100% ACID' },
                { label: 'ZK Verification', val: '<180ms' },
                { label: 'Socket Multiplex', val: '50,000+' }
            ],
            pipeline: [
                { step: '01', title: 'Go Non-blocking Ingress', desc: 'Asynchronous reverse proxy routes API traffic with worker pools in <1.2ms.' },
                { step: '02', title: 'zk-SNARK Identity Gate', desc: 'Groth16 biometric proof verifier authenticates users with zero credential disclosure.' },
                { step: '03', title: 'Deterministic Rust Ledger', desc: 'Double-entry accounting engine acquires locks in strict ID order, preventing deadlocks.' },
                { step: '04', title: 'Event Mesh Broadcast', desc: 'Redis pub/sub coordinates WebSocket notifications across horizontal nodes.' }
            ],
            ingressDesc: 'Engineered in Go, the API Gateway operates non-blocking goroutine pools that parse, validate, and authenticate high-throughput request streams.',
            persistenceDesc: 'Financial state is guarded by a bespoke Rust ledger engine. Every balance modification requires balanced debit and credit legs within an ACID transaction.',
            stressNotes: [
                '✦ Stress-tested with 10,000 concurrent multi-party balance transfers: zero deadlocks and 100% ACID balance conservation.',
                '✦ zk-SNARK Groth16 proof verification executed in <180ms on standard cloud CPU hardware.'
            ],
            decisions: [
                {
                    title: 'Separation of Concerns: Go Gateway + Rust Ledger',
                    rationale: 'Go provides best-in-rate network concurrency and developer velocity for API endpoints, while Rust guarantees zero-allocation memory safety and strict state correctness for financial accounting.'
                },
                {
                    title: 'Deterministic Row-Locking Ordering',
                    rationale: 'Sorting account IDs lexicographically before acquiring row-level database locks mathematically eliminates deadlock cycles in concurrent transfers.'
                }
            ],
            techStack: [
                { name: 'Go (Golang)', role: 'Asynchronous API Gateway, WebSocket hub' },
                { name: 'Rust', role: 'ACID double-entry ledger engine, deterministic lock manager' },
                { name: 'zk-SNARKs', role: 'Zero-knowledge biometric privacy gating circuits' }
            ],
            securityPosture: 'Biometric privacy protected by zero-knowledge cryptographic proofs. All internal communication runs over encrypted channels.'
        },
        'kingdomconnect': {
            tag: 'ACTIVE DISTRIBUTED SYSTEM 02',
            domain: 'COLLABORATIVE FABRIC & MULTI-TENANT RBAC',
            title: 'KingdomConnect: Real-Time Collaborative Fabric & Granular RBAC',
            summary: 'Engineered for high-density community connectivity and distributed collaboration. Features persistent WebSocket loops, horizontal Redis pub/sub channel clustering, dynamic multi-tenant isolation, and a 64-bit bitmask RBAC security matrix.',
            liveUrl: '#/projects',
            metrics: [
                { label: 'Socket Connections', val: '15,000+' },
                { label: 'Broadcast Latency', val: '<35ms' },
                { label: 'RBAC Evaluation', val: '<0.8ms' },
                { label: 'Data Isolation', val: 'Multi-Tenant' }
            ],
            pipeline: [
                { step: '01', title: 'Socket Connection Terminus', desc: 'Gateway cluster accepts and maintains full-duplex WebSocket connections.' },
                { step: '02', title: 'Bitmask RBAC Check', desc: 'Granular permissions evaluated in a single CPU bitwise AND operation (<0.8ms).' },
                { step: '03', title: 'Redis Pub/Sub Channel Ring', desc: 'Event broadcast across backend pods according to tenant room subscription keys.' },
                { step: '04', title: 'PostgreSQL Relational Tier', desc: 'Row-Level Security (RLS) ensures absolute data segregation across organizations.' }
            ],
            ingressDesc: 'Clients establish persistent WebSocket connections managed by horizontal Node/TypeScript pods.',
            persistenceDesc: 'Tenant data is segregated using PostgreSQL Row-Level Security (RLS) policies.',
            stressNotes: [
                '✦ Scaled to 15,000 concurrent active WebSocket sessions across 3 clustered nodes with CPU usage under 35%.',
                '✦ Message broadcast propagation across distributed nodes averaged <35ms latency.'
            ],
            decisions: [
                {
                    title: '64-Bit Integer Bitmask RBAC vs Relational Tables',
                    rationale: 'Evaluating permissions via bitwise operators reduced authorization overhead from multiple database joins to a single sub-microsecond CPU instruction.'
                }
            ],
            techStack: [
                { name: 'TypeScript / Node.js', role: 'Full-duplex WebSocket servers and event loops' },
                { name: 'Redis Pub/Sub Cluster', role: 'Distributed horizontal messaging and active channel registry' },
                { name: 'PostgreSQL (RLS)', role: 'Row-level security multi-tenant storage' }
            ],
            securityPosture: 'Multi-tenant isolation enforced at the database layer via PostgreSQL Row-Level Security.'
        },
        'trading': {
            tag: 'ACTIVE QUANT ENGINE 03',
            domain: 'HIGH-FREQUENCY QUANTITATIVE EXECUTION & RISK CONTROLS',
            title: 'Automated FX Engine: MetaTrader 5 Institutional Quant',
            summary: 'Algorithmic trading engine for MetaTrader 5 written in MQL5 and C++. Implements sub-millisecond tick streaming, 3-EMA structural pullback detection, stepped trailing stops with automated breakeven locks, dynamic ATR volatility risk sizing, and hardware kill switches.',
            liveUrl: '#/projects',
            metrics: [
                { label: 'Decision Loop', val: '<0.4ms' },
                { label: 'Critical Path Alloc', val: '0 Heap' },
                { label: 'Risk Sizing', val: 'Dynamic ATR' },
                { label: 'Fail-Safe Circuit', val: 'Hardware Kill' }
            ],
            pipeline: [
                { step: '01', title: 'Tick Stream Ingest', desc: 'Direct bridge from MetaTrader 5 broker feed writes incoming ticks into pre-allocated memory.' },
                { step: '02', title: '3-EMA & ATR Calculation', desc: 'Real-time structural alignment computed across 8, 21, and 55 exponential moving averages.' },
                { step: '03', title: 'State Machine Execution', desc: 'Pullback conditions trigger market orders with dynamic ATR-calculated stop losses.' },
                { step: '04', title: 'Stepped Trailing Guard', desc: 'Stepped trailing stops automatically advance to breakeven once target R-multiple is hit.' }
            ],
            ingressDesc: 'Broker price tick streams arrive via dedicated IPC memory pipes. The engine operates an event-driven tick handler that executes within <0.4ms.',
            persistenceDesc: 'Historical ticks, execution slippage, and closed trade PnL are recorded to local TimescaleDB instances.',
            stressNotes: [
                '✦ Zero heap allocations during live tick processing loops: zero garbage collection pauses or runtime jitter.',
                '✦ Automated spread circuit breaker successfully aborted trade execution during simulated 400% spread spikes.'
            ],
            decisions: [
                {
                    title: 'Pre-Allocated Ring Buffers in C++/MQL5',
                    rationale: 'Dynamic memory allocations introduce non-deterministic microsecond latency spikes. Pre-allocating buffers guarantees deterministic O(1) tick processing time.'
                }
            ],
            techStack: [
                { name: 'MQL5 & C++', role: 'High-speed algorithmic execution, tick processing, and order routing' },
                { name: 'MetaTrader 5 API', role: 'Direct institutional broker bridge and market depth feeds' },
                { name: 'TimescaleDB', role: 'Time-series tick logging and backtesting analysis' }
            ],
            securityPosture: 'Hard stop losses are sent with every order directly to broker books. Maximum daily drawdown circuit breakers automatically flatten open exposures if risk limits are approached.'
        }
    };

    window.openCaseStudyModal = (key) => {
        const data = CASE_STUDY_DATA[key];
        if (!data || !caseModalOverlay) return;

        const tagEl = document.getElementById('caseStudyTag');
        const domainEl = document.getElementById('caseStudyDomain');
        const titleEl = document.getElementById('caseStudyTitle');
        const summaryEl = document.getElementById('caseStudySummary');
        const liveLinkEl = document.getElementById('caseStudyLiveLink');

        if (tagEl) tagEl.textContent = data.tag;
        if (domainEl) domainEl.textContent = data.domain;
        if (titleEl) titleEl.textContent = data.title;
        if (summaryEl) summaryEl.textContent = data.summary;

        if (liveLinkEl) {
            if (data.liveUrl && data.liveUrl.startsWith('http')) {
                liveLinkEl.href = data.liveUrl;
                liveLinkEl.classList.remove('hidden');
                liveLinkEl.classList.add('inline-flex');
            } else {
                liveLinkEl.classList.add('hidden');
                liveLinkEl.classList.remove('inline-flex');
            }
        }

        const pipelineEl = document.getElementById('caseStudyPipeline');
        if (pipelineEl) {
            pipelineEl.innerHTML = data.pipeline.map(p => `
                <div class="p-3.5 rounded-xl bg-[#12151e] border border-white/10 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-mono font-bold text-cyan-300">${p.step}</span>
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        </div>
                        <h4 class="text-xs font-bold text-white mb-1">${p.title}</h4>
                        <p class="text-[11px] text-neutral-400 leading-relaxed font-light">${p.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        const ingressDescEl = document.getElementById('caseStudyIngressDesc');
        const persistenceDescEl = document.getElementById('caseStudyPersistenceDesc');
        if (ingressDescEl) ingressDescEl.textContent = data.ingressDesc;
        if (persistenceDescEl) persistenceDescEl.textContent = data.persistenceDesc;

        const metricsGridEl = document.getElementById('caseStudyMetricsGrid');
        if (metricsGridEl) {
            metricsGridEl.innerHTML = data.metrics.map(m => `
                <div class="p-4 rounded-xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
                    <span class="text-xl sm:text-2xl font-bold font-mono text-white mb-1">${m.val}</span>
                    <span class="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider">${m.label}</span>
                </div>
            `).join('');
        }

        const stressNotesEl = document.getElementById('caseStudyStressNotes');
        if (stressNotesEl) {
            stressNotesEl.innerHTML = data.stressNotes.map(n => `<p>${n}</p>`).join('');
        }

        const decisionsEl = document.getElementById('caseStudyDecisionsList');
        if (decisionsEl) {
            decisionsEl.innerHTML = data.decisions.map(d => `
                <div class="p-4 rounded-xl bg-[#0b0d13] border border-white/[0.08]">
                    <div class="flex items-center space-x-2 text-xs font-bold text-white mb-1.5">
                        <span class="text-cyan-400">✦</span>
                        <span>${d.title}</span>
                    </div>
                    <p class="text-xs text-neutral-300 leading-relaxed font-light pl-4">${d.rationale}</p>
                </div>
            `).join('');
        }

        const techGridEl = document.getElementById('caseStudyTechGrid');
        if (techGridEl) {
            techGridEl.innerHTML = data.techStack.map(t => `
                <div class="p-3.5 rounded-xl bg-[#12151e] border border-white/[0.08]">
                    <span class="text-xs font-mono font-bold text-cyan-300 block mb-1">${t.name}</span>
                    <span class="text-[11px] text-neutral-400 font-light block leading-relaxed">${t.role}</span>
                </div>
            `).join('');
        }

        const secPostureEl = document.getElementById('caseStudySecurityPost');
        if (secPostureEl) secPostureEl.textContent = data.securityPosture;

        switchCaseStudyTab('topology');

        caseModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeCaseStudyModal = () => {
        if (!caseModalOverlay) return;
        caseModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    function switchCaseStudyTab(tabKey) {
        document.querySelectorAll('.case-study-tab-btn').forEach(btn => {
            if (btn.getAttribute('data-case-tab') === tabKey) {
                btn.classList.add('active');
                btn.style.background = 'rgba(14, 165, 233, 0.2)';
                btn.style.color = '#38bdf8';
            } else {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.color = '#94a3b8';
            }
        });

        const panels = {
            'topology': document.getElementById('casePanelTopology'),
            'benchmarks': document.getElementById('casePanelBenchmarks'),
            'decisions': document.getElementById('casePanelDecisions'),
            'stack': document.getElementById('casePanelStack')
        };

        Object.keys(panels).forEach(key => {
            if (panels[key]) {
                if (key === tabKey) {
                    panels[key].classList.remove('hidden');
                    panels[key].classList.add('active');
                } else {
                    panels[key].classList.add('hidden');
                    panels[key].classList.remove('active');
                }
            }
        });
    }

    document.querySelectorAll('.case-study-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabKey = btn.getAttribute('data-case-tab');
            switchCaseStudyTab(tabKey);
        });
    });

    if (caseModalClose) caseModalClose.addEventListener('click', window.closeCaseStudyModal);
    if (caseModalOverlay) {
        caseModalOverlay.addEventListener('click', (e) => {
            if (e.target === caseModalOverlay) window.closeCaseStudyModal();
        });
    }

    // =========================================================================
    // 12. HIGH-RESOLUTION PORTRAIT LIGHTBOX MODAL
    // =========================================================================
    const portraitModal = document.getElementById('portraitModal');

    window.openPortraitModal = function(e) {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        if (portraitModal) {
            portraitModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closePortraitModal = function(e) {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        if (portraitModal) {
            portraitModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (portraitModal) {
        portraitModal.addEventListener('click', (e) => {
            if (e.target === portraitModal) window.closePortraitModal();
        });
    }

    document.querySelectorAll('.portrait-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            window.openPortraitModal(e);
        });
    });

    // Global Keyboard Dismissal for All Modals (Escape Key)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (caseModalOverlay && caseModalOverlay.classList.contains('active')) window.closeCaseStudyModal();
            if (certModalOverlay && certModalOverlay.classList.contains('active')) closeCertificateModal();
            if (portraitModal && portraitModal.classList.contains('active')) window.closePortraitModal();
            if (quickModal && quickModal.classList.contains('active')) {
                quickModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // =========================================================================
    // 13. DYNAMIC LOCAL TIME (WAT Africa/Lagos)
    // =========================================================================
    const footerTimeEl = document.getElementById('footer-local-time');
    const connectTimeEl = document.getElementById('connect-local-time');

    const updateWatTime = () => {
        const options = { 
            timeZone: 'Africa/Lagos', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        };
        const formatter = new Intl.DateTimeFormat([], options);
        const timeString = `${formatter.format(new Date())} WAT`;
        if (footerTimeEl) footerTimeEl.textContent = timeString;
        if (connectTimeEl) connectTimeEl.textContent = `${formatter.format(new Date())} WAT (UTC+1)`;
    };
    updateWatTime();
    setInterval(updateWatTime, 1000);

    // =========================================================================
    // 14. CALENDLY POPUP INTEGRATION
    // =========================================================================
    window.openCalendlyPopup = function() {
        const url = 'https://calendly.com/ayubabright1/30min?hide_gdpr_banner=1&background_color=060814&text_color=f8fafc&primary_color=0ea5e9';
        if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
            window.Calendly.initPopupWidget({ url });
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    window.addEventListener('message', function(e) {
        if (e.data && e.data.event === 'calendly.event_scheduled') {
            showGlassToast('Consultation session booked! Confirmation dispatched to inbox.', '✓');
        }
    });

});