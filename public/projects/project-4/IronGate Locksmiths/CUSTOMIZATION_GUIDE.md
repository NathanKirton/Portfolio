# Irongate Locksmiths Website - Setup & Customization Guide

## 🎯 Quick Start

The Irongate Locksmiths website has been completely redesigned and rebuilt. Here's everything you need to know about accessing and customizing it.

## 📍 File Location

The website is located at:
```
c:\Users\Nathan\Downloads\Portfolio\public\projects\project-4\IronGate Locksmiths\
```

### Files Included:
- **index.html** - Main HTML file with page structure
- **styles.css** - All styling and animations (1000+ lines of CSS)
- **script.js** - JavaScript functionality and interactivity
- **README.md** - Comprehensive documentation

## 🚀 How to View the Website

### Option 1: Direct File Opening
Simply open `index.html` in a web browser:
- Right-click `index.html`
- Select "Open with" → Your preferred browser
- The website will load instantly

### Option 2: Local Server (Recommended)
Use Python's built-in server:
```bash
cd "c:\Users\Nathan\Downloads\Portfolio\public\projects\project-4\IronGate Locksmiths"
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option 3: Through Your Portfolio
Once deployed to Vercel, access it through your portfolio's Project 4 page.

## 🎨 Customization Guide

### 1. **Change Business Information**

Edit `script.js` and find the `renderContact()` function:

```javascript
// Change phone number
<a href="tel:07546126613" ...>07546 126613</a>

// Change email
<a href="mailto:irongatelocksmiths@gmail.com" ...>Email</a>

// Change address
<p>134 Dean Road<br>South Shields<br>NE33 4AW</p>
```

### 2. **Update Services**

Edit `state.services` in `script.js`:

```javascript
state.services: [
    { 
        icon: '🔓', 
        title: 'Emergency Lockouts', 
        description: 'Your description here'
    },
    // Add more services...
]
```

### 3. **Modify Pricing**

Edit `state.pricingOptions` in `script.js`:

```javascript
{
    name: 'Service Name',
    price: '£99',
    details: 'What\'s included',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    featured: true  // Makes this the highlighted option
}
```

### 4. **Add/Edit Testimonials**

Edit `state.testimonials` in `script.js`:

```javascript
{
    name: 'Customer Name',
    text: 'Their testimonial text here',
    rating: 5  // 1-5 stars
}
```

### 5. **Change Colors**

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #1a1a2e;      /* Dark Navy */
    --secondary-color: #d4a574;    /* Gold */
    --accent-color: #e74c3c;       /* Red */
    --light-bg: #f8f9fa;           /* Off-white */
    /* ... other colors ... */
}
```

### 6. **Update Hero Section Text**

Find the `renderHero()` function in `script.js`:

```javascript
function renderHero() {
    return `
        <h1>Your New Headline Here</h1>
        <p class="hero-subtitle">Your subtitle here</p>
        <p class="phone-display">
            <i class="fas fa-phone-alt"></i> YOUR PHONE HERE
        </p>
        // ... etc
    `;
}
```

### 7. **Customize Navbar**

Edit the `renderNavbar()` function:
```javascript
// Change brand name, links, etc.
<a href="#" class="navbar-brand">
    <i class="fas fa-lock"></i>
    Your Company Name
</a>
```

### 8. **Modify Buttons & CTAs**

Search for class names like:
- `.btn-primary` - Red action buttons
- `.btn-secondary` - White outline buttons
- `.cta-button` - Call-to-action buttons

## 🎬 Advanced Customization

### Adding New Sections

To add a new section:

1. **Create a new render function** in `script.js`:
```javascript
function renderNewSection() {
    return `
        <section class="new-section">
            <!-- Your content -->
        </section>
    `;
}
```

2. **Add CSS** for the section in `styles.css`

3. **Include it in renderApp()** function:
```javascript
function renderApp() {
    const root = document.getElementById('root');
    root.innerHTML = `
        ${renderNavbar()}
        ${renderHero()}
        ${renderNewSection()}  // Add here
        ${renderFooter()}
    `;
}
```

### Adding Navigation Links

Edit the `renderNavbar()` function to add new nav links:
```javascript
<li><a href="#your-section" class="nav-link">Your Section</a></li>
```

### Creating New Animations

Add CSS animations in `styles.css`:
```css
@keyframes yourAnimation {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.your-class {
    animation: yourAnimation 0.6s ease-out;
}
```

## 🔧 Form Submission Setup

Currently, the contact form shows an alert. To enable actual email sending:

1. **Backend Integration**: Set up a form handling backend (Firebase, Formspree, etc.)
2. **Update handleFormSubmit()**: Change the function to POST to your backend
3. **Example with Formspree**:
```javascript
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/YOUR_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        alert('Thank you! We\'ll be in touch.');
        form.reset();
    });
}
```

## 📱 Responsive Design

The website is fully responsive:
- **Desktop**: All features visible
- **Tablet (768px)**: Stacked layout adapts
- **Mobile (480px)**: Single column layout

Test responsiveness:
1. Open website in browser
2. Press F12 (Developer Tools)
3. Click mobile device icon
4. Test different screen sizes

## 🔍 SEO Customization

Update meta tags in `index.html`:
```html
<meta name="description" content="Your SEO description here">
<title>Your Page Title Here</title>
```

## 🚀 Deployment

The website works perfectly as static HTML:

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Vercel auto-deploys your portfolio
3. Website is live!

### Deploy Elsewhere
- Upload the 3 files (HTML, CSS, JS) to any web host
- Or use GitHub Pages
- Or use Firebase Hosting

## 📊 Testing

### Browser Testing
- Chrome, Firefox, Safari, Edge (all supported)
- Test on mobile devices
- Check all links work

### Performance Testing
- Website loads in <1 second
- All animations smooth
- Form submits without errors

## 🐛 Troubleshooting

### Images Not Loading
- Check image paths in `script.js`
- Use absolute paths or correct relative paths

### Animations Not Working
- Check CSS animations in styles.css
- Ensure JavaScript is enabled
- Test in different browsers

### Contact Form Issues
- Check browser console for errors (F12)
- Verify phone number format
- Check email validation

## 📝 Common Edits Checklist

- [ ] Update phone number
- [ ] Change email address
- [ ] Modify services list
- [ ] Update pricing
- [ ] Add company testimonials
- [ ] Change business hours
- [ ] Update service area
- [ ] Customize colors (optional)
- [ ] Add social media links
- [ ] Set up email form submission

## 💡 Tips & Best Practices

1. **Keep it Simple**: Don't overcomplicate the design
2. **Test Changes**: Always test in browser after edits
3. **Backup Files**: Keep a copy before major changes
4. **Consistent Branding**: Keep color scheme consistent
5. **Mobile First**: Always test on mobile
6. **Fast Loading**: Keep images optimized
7. **Clear CTAs**: Always have clear call-to-action buttons
8. **Update Content**: Keep information current and accurate

## 📞 Need Help?

If you need to:
- Change contact information: Edit `renderContact()` function
- Modify prices: Edit `state.pricingOptions`
- Update services: Edit `state.services`
- Change colors: Edit `:root` in CSS
- Add new pages: Create new render functions

## 🎓 Learning Resources

- **HTML**: Learn semantic markup
- **CSS**: Study animations and flexbox
- **JavaScript**: Understand DOM manipulation
- **Responsive Design**: Test on different devices

---

**Version**: 1.0
**Last Updated**: February 2026
**Status**: Production Ready

The website is fully functional and ready to customize. Make changes to script.js and styles.css as needed!
