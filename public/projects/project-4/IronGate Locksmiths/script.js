// ==========================================
// IRONGATE LOCKSMITHS - MAIN SCRIPT
// ==========================================

// Render the entire application
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    setupEventListeners();
    setupScrollAnimations();
});

// Application state
const state = {
    currentPage: 'home',
    mobileMenuOpen: false,
    services: [
        { icon: '🔓', title: 'Emergency Lockouts', description: 'Fast 30-minute response time for locked doors and lost keys' },
        { icon: '🏠', title: 'Residential Locks', description: 'Door locks, window locks, and security upgrades for homes' },
        { icon: '🚐', title: 'Van Locks', description: 'Professional van lock installation and repairs' },
        { icon: '🏢', title: 'Commercial Services', description: 'Business security systems and access control' },
        { icon: '🔧', title: 'Lock Repairs', description: 'Repair and maintenance for all lock types' },
        { icon: '🛡️', title: 'UPVC Repairs', description: 'UPVC door and window repairs and adjustments' }
    ],
    testimonials: [
        {
            name: 'Frankie Bolder',
            text: 'Big thumbs up. If you\'re in need of an honest, professional, and reliable low cost local Locksmith Service, then look no further than Irongate Locksmiths. I\'ve relied on the friendly guys from Irongate Locksmiths on numerous occasions, and have yet to be disappointed.',
            rating: 5
        },
        {
            name: 'Sarah Johnson',
            text: 'Excellent service! Simon was professional and arrived quickly. Sorted our issue in no time. Definitely recommend to anyone needing a locksmith in South Shields.',
            rating: 5
        },
        {
            name: 'Michael Harris',
            text: 'Very competitive prices and great service. They didn\'t try to upsell us like other locksmiths. Will definitely use again.',
            rating: 5
        }
    ],
    pricingOptions: [
        {
            name: 'Basic Lockout',
            price: '£44.99',
            details: 'Starting from',
            features: ['Emergency access', '30-min response', 'Local call', 'No call-out fee', 'Professional service']
        },
        {
            name: 'Lock Installation',
            price: '£65',
            details: 'Lock + 3 keys + service',
            features: ['Professional fit', 'Quality locks', 'Full service', 'Includes 3 keys', 'Free advice'],
            featured: true
        },
        {
            name: 'Home Package',
            price: '£99',
            details: 'Full door service',
            features: ['Multiple locks', 'Free door service', 'Security check', 'Expert fitting', 'Best value']
        }
    ]
};

// Main render function
function renderApp() {
    const root = document.getElementById('root');
    root.innerHTML = `
        ${renderNavbar()}
        ${renderHero()}
        ${renderFeatures()}
        ${renderServices()}
        ${renderPricing()}
        ${renderAbout()}
        ${renderTestimonials()}
        ${renderContact()}
        ${renderFooter()}
    `;
}

// Navbar component
function renderNavbar() {
    return `
        <nav class="navbar">
            <a href="#" class="navbar-brand">
                <i class="fas fa-lock"></i>
                Irongate Locksmiths
            </a>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#pricing" class="nav-link">Pricing</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
                <li><a href="tel:07546126613" class="cta-button">
                    <i class="fas fa-phone"></i> Call Now
                </a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    `;
}

// Hero section
function renderHero() {
    return `
        <section class="hero" id="home">
            <div class="hero-content">
                <div class="emergency-badge">
                    <i class="fas fa-bell"></i>
                    24/7 Emergency Service
                </div>
                <h1>South Shields' Most Trusted Locksmith</h1>
                <p class="hero-subtitle">Fast, Professional, Affordable Lock Solutions</p>
                <p class="phone-display">
                    <i class="fas fa-phone-alt"></i> 07546 126613
                </p>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem; font-size: 1.1rem;">
                    30-minute response time • No call-out fees • From just £44.99
                </p>
                <div class="hero-buttons">
                    <button class="btn-primary" onclick="window.location.href='tel:07546126613'">
                        <i class="fas fa-phone"></i> Call Emergency
                    </button>
                    <a href="#contact" class="btn-secondary">
                        <i class="fas fa-envelope"></i> Get Quote
                    </a>
                </div>
            </div>
        </section>
    `;
}

// Features section
function renderFeatures() {
    const features = [
        { icon: '⚡', title: '30-Minute Response', description: 'Fastest response time in South Shields and North East' },
        { icon: '💰', title: 'From £44.99', description: '90% of jobs priced per job, not by the hour' },
        { icon: '🎯', title: 'Expert Service', description: 'Master locksmith with 20+ years experience' },
        { icon: '🏘️', title: 'Local Business', description: 'Family-owned, no call centres, always available' },
        { icon: '24/7', title: '24hr Support', description: 'Available every day, every night, no exceptions' },
        { icon: '✓', title: '100% Satisfaction', description: 'Professional, reliable, and trustworthy service' }
    ];

    return `
        <section class="features">
            <h2 class="section-title">Why Choose Irongate?</h2>
            <div class="features-grid">
                ${features.map(feature => `
                    <div class="feature-card">
                        <div class="feature-icon">${feature.icon}</div>
                        <h3>${feature.title}</h3>
                        <p>${feature.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// Services section
function renderServices() {
    return `
        <section class="services" id="services">
            <h2 class="section-title">Our Services</h2>
            <div class="services-grid">
                ${state.services.map((service, index) => `
                    <div class="service-item" style="animation-delay: ${index * 0.1}s;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">${service.icon}</div>
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                        <span class="service-badge">Professional</span>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// Pricing section
function renderPricing() {
    return `
        <section class="pricing" id="pricing">
            <h2 class="section-title">Simple, Transparent Pricing</h2>
            <div class="pricing-grid">
                ${state.pricingOptions.map(option => `
                    <div class="pricing-card ${option.featured ? 'featured' : ''}">
                        <span class="price-badge">Most Popular</span>
                        <h3>${option.name}</h3>
                        <div class="price">${option.price}</div>
                        <p class="price-details">${option.details}</p>
                        <ul class="price-list">
                            ${option.features.map(feature => `
                                <li><i class="fas fa-check"></i> ${feature}</li>
                            `).join('')}
                        </ul>
                        <button class="btn-pricing" onclick="window.location.href='tel:07546126613'">
                            Get Quote
                        </button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// About section
function renderAbout() {
    return `
        <section class="about" id="about">
            <h2 class="section-title">About Irongate Locksmiths</h2>
            <div class="about-content">
                <div class="about-text">
                    <h2>Your Local South Shields Locksmith</h2>
                    <p>
                        Irongate Locksmiths have been providing reliable locksmith services throughout South Shields, 
                        Tyne and Wear, and the North East for years. We're a family-owned business dedicated to 
                        providing honest, professional, and affordable locksmith services.
                    </p>
                    <p>
                        Our Master Locksmith, Simon, is always on hand to assist with all your locksmithing needs. 
                        Whether it's a UPVC door that won't lock, a composite door locked behind you, or fitting 
                        new locks to your house, business, or van – we've got you covered.
                    </p>
                    <p>
                        We pride ourselves on competitive rates starting from just £44.99, with 90% of jobs priced 
                        per job rather than hourly rates. No hidden costs, no call-out fees, and we do not use call centres.
                    </p>
                    <div class="highlights">
                        <div class="highlight-item">
                            <div class="highlight-number">20+</div>
                            <div class="highlight-text">Years Experience</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-number">1000+</div>
                            <div class="highlight-text">Happy Customers</div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-number">30min</div>
                            <div class="highlight-text">Response Time</div>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); height: 400px; display: flex; align-items: center; justify-content: center; color: #d4a574; font-size: 4rem;">
                        <i class="fas fa-lock"></i>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Testimonials section
function renderTestimonials() {
    return `
        <section class="testimonials">
            <h2 class="section-title">What Our Customers Say</h2>
            <div class="testimonials-grid">
                ${state.testimonials.map(testimonial => `
                    <div class="testimonial-card">
                        <div class="stars">
                            ${Array(testimonial.rating).fill('⭐').join('')}
                        </div>
                        <p class="testimonial-text">"${testimonial.text}"</p>
                        <p class="testimonial-author">– ${testimonial.name}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// Contact section
function renderContact() {
    return `
        <section class="contact" id="contact">
            <div class="contact-content">
                <div class="contact-info">
                    <h2>Get in Touch</h2>
                    <p style="margin-bottom: 2rem; opacity: 0.9;">
                        Available 24/7 for all your locksmith needs. Call us anytime for fast, professional service.
                    </p>
                    
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-details">
                            <h3>Emergency Call</h3>
                            <p><a href="tel:07546126613" style="color: #d4a574; text-decoration: none; font-weight: 600;">07546 126613</a></p>
                            <p style="font-size: 0.9rem; opacity: 0.9;">Available 24 hours, 7 days a week</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-details">
                            <h3>Email</h3>
                            <p><a href="mailto:irongatelocksmiths@gmail.com" style="color: #d4a574; text-decoration: none;">irongatelocksmiths@gmail.com</a></p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="contact-details">
                            <h3>Address</h3>
                            <p>134 Dean Road<br>South Shields<br>NE33 4AW</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="contact-details">
                            <h3>Service Area</h3>
                            <p>South Shields, South Tyneside, Jarrow, Hebburn, Boldon, Newcastle, Sunderland & North East</p>
                        </div>
                    </div>
                </div>

                <form class="contact-form" onsubmit="handleFormSubmit(event)">
                    <h3>Quick Quote</h3>
                    
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>

                    <div class="form-group">
                        <label for="service">Service Type</label>
                        <select id="service" name="service" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 5px; font-family: 'Poppins', sans-serif;" required>
                            <option value="">Select a service...</option>
                            <option value="Emergency Lockout">Emergency Lockout</option>
                            <option value="Lock Installation">Lock Installation</option>
                            <option value="Lock Repair">Lock Repair</option>
                            <option value="Van Locks">Van Locks</option>
                            <option value="Commercial Services">Commercial Services</option>
                            <option value="UPVC Repairs">UPVC Repairs</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>

                    <button type="submit" class="btn-submit">
                        <i class="fas fa-paper-plane"></i> Send Quote Request
                    </button>
                </form>
            </div>
        </section>
    `;
}

// Footer component
function renderFooter() {
    return `
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <h4><i class="fas fa-lock"></i> Irongate Locksmiths</h4>
                    <p style="color: #ddd; margin-bottom: 1rem;">
                        Your trusted 24/7 locksmith service in South Shields and the North East. Fast, professional, affordable.
                    </p>
                    <div class="social-links">
                        <a href="https://facebook.com" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://google.com" target="_blank" title="Google"><i class="fab fa-google"></i></a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#services">Emergency Lockouts</a></li>
                        <li><a href="#services">Residential Locks</a></li>
                        <li><a href="#services">Van Locks</a></li>
                        <li><a href="#services">Commercial Services</a></li>
                        <li><a href="#services">Lock Repairs</a></li>
                        <li><a href="#services">UPVC Repairs</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Contact Us</h4>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 0.75rem;">
                            <i class="fas fa-phone" style="color: #d4a574; margin-right: 0.5rem;"></i>
                            <a href="tel:07546126613" style="color: #ddd; text-decoration: none;">07546 126613</a>
                        </li>
                        <li style="margin-bottom: 0.75rem;">
                            <i class="fas fa-envelope" style="color: #d4a574; margin-right: 0.5rem;"></i>
                            <a href="mailto:irongatelocksmiths@gmail.com" style="color: #ddd; text-decoration: none;">Email Us</a>
                        </li>
                        <li>
                            <i class="fas fa-map-marker-alt" style="color: #d4a574; margin-right: 0.5rem;"></i>
                            <span style="color: #ddd;">South Shields, NE33 4AW</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 Irongate Locksmiths. All rights reserved. | <a href="#" style="color: #999; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #999; text-decoration: none;">Terms of Service</a></p>
            </div>
        </footer>
    `;
}

// Event listeners setup
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            updateHamburgerIcon();
        });
    }

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Update hamburger icon animation
function updateHamburgerIcon() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        const spans = hamburger.querySelectorAll('span');
        const isActive = document.querySelector('.nav-menu').classList.contains('active');
        
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Show success message
    alert(`Thank you for your inquiry, ${formData.name}! We'll contact you at ${formData.phone} shortly.`);
    
    // Reset form
    event.target.reset();
    
    // In a real application, this would send data to a server
    console.log('Form submitted:', formData);
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .service-item, .pricing-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, #2d2d44 100%)';
    }
});
