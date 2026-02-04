# Screenshot Creation Guide

## For the Irongate Locksmiths Project

The website screenshot should show the Irongate Locksmiths landing page. Here's how to create it:

### Option 1: Use a Screenshot Tool (Recommended)
1. Open `public/projects/project-4/IronGate Locksmiths/index.html` in your browser
2. Take a full-page screenshot (use a tool like:
   - Windows Snipping Tool
   - ScreenFlow (Mac)
   - Chrome DevTools (F12 → right-click → Capture full page screenshot)
   - Nimbus Screenshot extension
   - Lightshot

3. Save as `Irongate Locksmiths.jpg` in `/public/Project Screenshots/`

### Option 2: Use a Headless Browser
```bash
# Using Puppeteer (Node.js)
npm install puppeteer
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///path/to/index.html', {waitUntil: 'networkidle0'});
  await page.screenshot({path: 'screenshot.jpg', fullPage: true});
  await browser.close();
})();
"
```

### Option 3: Use Online Tools
- Screenshot.guru
- Webpage2Image.com
- htmlsnapshot.com

## Screenshot Requirements

- **Format**: JPG or PNG
- **Filename**: `Irongate Locksmiths.jpg`
- **Location**: `/public/Project Screenshots/`
- **Dimensions**: Width: 1200px minimum
- **Content**: Should show the hero section with:
  - Logo placeholder
  - Main headline
  - Service toggle buttons
  - Phone number
  - Call-to-action buttons
  - Stats section

## What the Image Should Display

The screenshot should capture the Irongate Locksmiths website showing:
- Professional green gradient background (#1d6b2f - #154620 - #2a8a3d)
- "South Shields' Most Trusted Locksmith" headline
- Phone number: 07546 126613
- Call Emergency & Get Quote buttons
- Stats showing: 30 min response, 24/7 coverage, £44.99 starting price

Once you've created the screenshot, save it to `/public/Project Screenshots/Irongate Locksmiths.jpg` and commit the changes.
