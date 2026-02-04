# 🖼️ Image Placeholders & Assets Guide

## Overview
This document outlines all the images and assets you'll need to provide to complete the Irongate Locksmiths website. All placeholders are currently using emoji icons, which should be replaced with real images.

---

## 1. LOGO & BRANDING

### Logo (Primary)
- **File Name**: `logo.png` or `logo-main.png`
- **Dimensions**: 200x200px (minimum)
- **Location**: Hero section (top navigation and hero center)
- **Description**: Irongate Locksmiths shield logo with green color (#1d6b2f)
- **Usage**: Navigation bar, hero section header
- **Format**: PNG with transparency preferred
- **Where to add in code**:
  ```html
  <img src="path/to/logo.png" alt="Irongate Locksmiths" class="logo">
  ```

### Logo White (Inverted)
- **File Name**: `logo-white.png`
- **Dimensions**: 200x200px (minimum)
- **Description**: White version of logo for dark backgrounds
- **Usage**: Footer, dark sections
- **Format**: PNG with transparency

### Favicon
- **File Name**: `favicon.ico` or `favicon.png`
- **Dimensions**: 32x32px (or 16x16px)
- **Description**: Small website icon for browser tab
- **Usage**: Browser tab display
- **Add to HTML**:
  ```html
  <link rel="icon" type="image/png" href="favicon.png">
  ```

---

## 2. HERO SECTION IMAGES

### Hero Background Image
- **File Name**: `hero-background.jpg`
- **Dimensions**: 1920x1200px minimum (responsive)
- **Description**: Professional locksmith background image (lock, keys, security theme)
- **Current State**: Uses CSS gradient - can overlay with actual background image
- **Usage**: Hero section background
- **Implementation**:
  ```css
  .hero {
      background-image: url('path/to/hero-background.jpg');
      background-size: cover;
      background-position: center;
  }
  ```

### Hero Overlay Image (Optional)
- **File Name**: `hero-overlay-locksmith.png` or `hero-overlay-van.png`
- **Dimensions**: 400x400px
- **Description**: Large decorative lock/key or van illustration for hero
- **Usage**: Right side of hero section for visual impact
- **Alternative**: Could be animated SVG

---

## 3. SERVICE SECTION IMAGES

Replace emoji icons with professional images:

### Service Icons
**Location**: Services grid section (currently using emoji)

1. **Emergency Lockout Icon**
   - **File Name**: `icon-emergency.png` or `icon-emergency.svg`
   - **Dimensions**: 80x80px
   - **Description**: Phone/bell icon with alert indicator
   - **Current Emoji**: 🔓

2. **Residential Locks Icon**
   - **File Name**: `icon-residential.png` or `icon-residential.svg`
   - **Dimensions**: 80x80px
   - **Description**: House/door with lock
   - **Current Emoji**: 🏠

3. **Van Locks Icon**
   - **File Name**: `icon-van-locks.png` or `icon-van-locks.svg`
   - **Dimensions**: 80x80px
   - **Description**: Van with padlock
   - **Current Emoji**: 🚐

4. **Commercial Services Icon**
   - **File Name**: `icon-commercial.png` or `icon-commercial.svg`
   - **Dimensions**: 80x80px
   - **Description**: Office building with security
   - **Current Emoji**: 🏢

5. **Lock Repairs Icon**
   - **File Name**: `icon-repairs.png` or `icon-repairs.svg`
   - **Dimensions**: 80x80px
   - **Description**: Wrench and lock
   - **Current Emoji**: 🔧

6. **Van Security Icon**
   - **File Name**: `icon-van-security.png` or `icon-van-security.svg`
   - **Dimensions**: 80x80px
   - **Description**: Shield with van
   - **Current Emoji**: 🛡️

---

## 4. TESTIMONIAL SECTION IMAGES

### Customer Photos
**Location**: Testimonials section

- **File Name**: `testimonial-1.jpg`, `testimonial-2.jpg`, `testimonial-3.jpg`
- **Dimensions**: 300x300px (circular, square crop)
- **Description**: Photos of happy customers (or generic professional headshots)
- **Usage**: Avatar images next to testimonials
- **Current**: Using emoji - requires actual customer/professional photos
- **CSS Class**: `.testimonial-avatar`

### Implementation:
```html
<img src="path/to/testimonial-1.jpg" alt="Frankie Bolder" class="testimonial-avatar">
```

---

## 5. ABOUT SECTION IMAGES

### Company Photos
**Location**: About section

1. **Hero Image - Locksmith at Work**
   - **File Name**: `about-locksmith.jpg`
   - **Dimensions**: 600x400px
   - **Description**: Professional photo of locksmith working on a lock
   - **Usage**: Left side of about section
   - **Alternative**: Simon (owner) working or team photo

2. **Van Saint Image**
   - **File Name**: `about-van.jpg`
   - **Dimensions**: 600x400px
   - **Description**: Van with Van Saint branding/logo
   - **Usage**: Showcase van lock services
   - **Alternative**: Multiple vans with security equipment

3. **Tools & Equipment Photo**
   - **File Name**: `about-tools.jpg`
   - **Dimensions**: 600x400px
   - **Description**: Professional locksmith tools display
   - **Usage**: Show expertise and professionalism
   - **Current**: Could use icons instead

---

## 6. HAPPY CUSTOMERS / PORTFOLIO SECTION

### Before & After / Work Samples
**Location**: Features or portfolio section

- **File Name**: `work-sample-1.jpg`, `work-sample-2.jpg`, etc.
- **Dimensions**: 400x300px each
- **Description**: Photos of completed jobs:
  - Before/after door locks
  - Installed security systems
  - Van lock installations
  - Commercial setups
- **Quantity**: 4-6 high-quality images recommended
- **Usage**: Show actual work completed

---

## 7. BRAND PARTNER LOGOS

### Insurance & Certification Logos
**Location**: Footer or trust section

Partner logos needed (these are mentioned on your original site):

1. **NEMEF** - `logo-nemef.png`
2. **Securefast** - `logo-securefast.png`
3. **Banham** - `logo-banham.png`
4. **EVVA** - `logo-evva.png`
5. **Corbin** - `logo-corbin.png`
6. **Union** - `logo-union.png`
7. **ERA** - `logo-era.png`
8. **JR** - `logo-jr.png`
9. **Yale** - `logo-yale.png`
10. **Other certifications** - Insurance Approved Locks badge, etc.

**Dimensions**: 120x80px each (variable)
**Format**: PNG with transparency preferred
**Usage**: Trust/credibility footer section

---

## 8. CONTACT SECTION IMAGES

### Optional Contact Images
- **File Name**: `contact-phone.jpg`
- **Dimensions**: 400x400px
- **Description**: Hand holding phone with contact number visible
- **Usage**: Right side of contact form
- **Current State**: Could use as background or side image

---

## 9. SOCIAL MEDIA ICONS

### Social Media Logos
**Location**: Footer

Already using Font Awesome 6, but if you want custom icons:

- Facebook icon
- Twitter/X icon
- Instagram icon
- Google/Gmail icon
- LinkedIn icon (optional)

**Current Implementation**: Using Font Awesome (`<i class="fab fa-facebook"></i>`)
**Status**: ✅ Already configured - no changes needed

---

## 10. HOW TO IMPLEMENT IMAGES IN CODE

### Step 1: Add Images to Project Folder
```
IronGate Locksmiths/
├── images/
│   ├── logo.png
│   ├── hero-background.jpg
│   ├── icons/
│   │   ├── icon-emergency.svg
│   │   ├── icon-residential.svg
│   │   └── ...
│   ├── testimonials/
│   │   ├── testimonial-1.jpg
│   │   ├── testimonial-2.jpg
│   │   └── testimonial-3.jpg
│   ├── about/
│   │   ├── about-locksmith.jpg
│   │   └── about-van.jpg
│   └── partners/
│       ├── logo-nemef.png
│       └── ...
```

### Step 2: Update HTML/JavaScript

In `script.js`, update render functions to include image paths:

```javascript
// Hero section
function renderHero() {
    return `
        <img src="images/logo.png" alt="Irongate" class="hero-logo">
        <!-- ... rest of hero -->
    `;
}

// Services with custom icons
{
    icon: '<img src="images/icons/icon-emergency.svg" alt="Emergency">',
    title: 'Emergency Lockouts',
    description: '...'
}
```

### Step 3: Update CSS if Needed

```css
.logo {
    max-width: 200px;
    height: auto;
}

.service-icon {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.testimonial-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}
```

---

## 11. RECOMMENDED IMAGE SOURCES

### Where to Find/Create Images:

**Free Stock Photos:**
- Unsplash (https://unsplash.com)
- Pexels (https://pexels.com)
- Pixabay (https://pixabay.com)
- Freepik (https://freepik.com) - has security/locksmith themed images

**DIY/Professional:**
- Professional photos of your work/team
- Logo designer (Fiverr, 99designs for logo creation)
- Canva (https://canva.com) - easy design tool

**Icons & SVGs:**
- Flaticon (https://flaticon.com)
- FontAwesome Pro (https://fontawesome.com)
- Noun Project (https://thenounproject.com)
- Heroicons (https://heroicons.com)

---

## 12. IMAGE OPTIMIZATION TIPS

**File Sizes:**
- Web images should be 100-200KB max per image
- Use JPEG for photos, PNG for logos/icons
- Use WEBP format for modern browsers (with JPEG fallback)

**Tools for Optimization:**
- TinyPNG (https://tinypng.com)
- ImageOptim (https://imageoptim.com)
- Squoosh (https://squoosh.app)

**Best Practices:**
```html
<!-- Responsive images -->
<img src="image-desktop.jpg" 
     alt="Description" 
     style="max-width: 100%; height: auto;">

<!-- With multiple sizes -->
<picture>
    <source media="(max-width: 768px)" srcset="image-mobile.jpg">
    <img src="image-desktop.jpg" alt="Description">
</picture>
```

---

## 13. SUMMARY CHECKLIST

### Priority 1 (Essential):
- [ ] Logo (color version)
- [ ] Hero background or hero visual
- [ ] Service icons (6 icons)

### Priority 2 (Important):
- [ ] Testimonial customer photos (3)
- [ ] About section images (2-3)
- [ ] Brand partner logos (10)

### Priority 3 (Nice to Have):
- [ ] Work sample photos (4-6)
- [ ] Contact section image
- [ ] Company team photo

---

## 14. QUICK REFERENCE TABLE

| Element | Current | File Name | Dimensions | Format |
|---------|---------|-----------|-----------|--------|
| Logo | 🔱 (emoji) | `logo.png` | 200x200px | PNG |
| Hero BG | Gradient | `hero-background.jpg` | 1920x1200px | JPG |
| Service Icons | Emoji | `icon-*.svg` | 80x80px | SVG |
| Testimonials | Emoji | `testimonial-*.jpg` | 300x300px | JPG |
| About Images | None | `about-*.jpg` | 600x400px | JPG |
| Partner Logos | None | `logo-*.png` | 120x80px | PNG |
| Favicon | None | `favicon.ico` | 32x32px | ICO |

---

## Next Steps:

1. ✅ Review this list of all required images
2. ⬜ Gather or create images (prioritize Priority 1)
3. ⬜ Organize images in folder structure
4. ⬜ Update `script.js` and HTML to reference image paths
5. ⬜ Test all images display correctly
6. ⬜ Optimize images for web
7. ⬜ Push updated code to GitHub
8. ⬜ Verify on live Vercel deployment

---

**Document Created**: February 4, 2026
**Status**: Ready for image implementation
**Questions?** Refer to the code comments in `script.js` and `styles.css`
