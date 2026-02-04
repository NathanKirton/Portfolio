# How to Add a New Project to Your Portfolio

This guide makes it easy to add a new project to your portfolio page.

## Quick Steps

### 1. Prepare Your Project Image
- Place your project screenshot or logo in the `/public/Project Screenshots/` folder
- Example: `Awesome Project.jpg`
- Note the full path: `/Project Screenshots/Awesome Project.jpg`

### 2. Open `constants.ts`
Located in the root of your project folder.

### 3. Add Your Project to the `EXPEDITIONS` Array
Copy this template and fill in your details:

```typescript
{
  id: 4,                                           // Next sequential number (increment by 1)
  date: 'FEB 2026',                               // Month and year in format: 'MMM YYYY'
  tag: 'Project 04',                              // Project number or category tag
  title: 'Your Project Title',                    // Project name (shown on cards)
  description: 'Brief 1-2 sentence overview of your project. This appears on the project card and should summarize the project quickly.',
  imageUrl: '/Project Screenshots/Your Image.jpg',  // Path to your image file
  side: 'right',                                  // 'left' or 'right' (alternates timeline layout)
  tools: [
    {
      name: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS']
    },
    {
      name: 'Backend',
      items: ['Node.js', 'Express.js', 'MongoDB']
    },
    {
      name: 'Deployment',
      items: ['Docker', 'Vercel']
    }
  ],
  overview: {
    sections: 'Write a detailed overview of your project here. You can write as much as you want. This will appear on the project detail page.\n\nYou can use \\n\\n for paragraph breaks if needed, or just write continuously and it will wrap nicely.'
  }
}
```

## Field Explanations

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique number (increment from the last project) |
| `date` | Yes | Date format: `'MMM YYYY'` (e.g., `'FEB 2026'`) |
| `tag` | Yes | Project identifier, e.g., `'Project 04'` or `'Project 04 • Web App'` |
| `title` | Yes | Project name that displays on cards |
| `description` | Yes | 1-2 sentence summary (shows on project card) |
| `imageUrl` | Yes | Path to image: `/Project Screenshots/filename.jpg` |
| `side` | Yes | Layout position: `'left'` or `'right'` (alternates visually) |
| `tools` | Optional | Array of technology categories with items |
| `overview` | Optional | Detailed project description (shown on detail page) |

## Tools Organization

Organize your tools into logical categories:
- **Frontend**: React, Vue, Angular, CSS frameworks, UI libraries
- **Backend**: Node.js, Python, Java, databases, APIs
- **Deployment**: Docker, Vercel, AWS, GitHub Actions
- **Database**: MongoDB, PostgreSQL, Firebase
- **External Services**: Strava, APIs, OAuth providers
- **Additional Tools**: DevTools, testing frameworks, design tools

## Complete Example

```typescript
{
  id: 4,
  date: 'FEB 2026',
  tag: 'Project 04 • E-Commerce',
  title: 'Next-Gen Online Store',
  description: 'A full-stack e-commerce platform with real-time inventory, secure payments, and admin dashboard. Built with React, Node.js, and PostgreSQL.',
  imageUrl: '/Project Screenshots/ECommerce.jpg',
  side: 'left',
  tools: [
    {
      name: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Zustand']
    },
    {
      name: 'Backend',
      items: ['Node.js', 'Express.js', 'REST API', 'JWT authentication']
    },
    {
      name: 'Database',
      items: ['PostgreSQL', 'Prisma ORM', 'Redis caching']
    },
    {
      name: 'Payments',
      items: ['Stripe integration', 'Webhook handling']
    },
    {
      name: 'Deployment',
      items: ['Docker', 'GitHub Actions', 'Vercel (frontend)', 'Heroku (backend)']
    }
  ],
  overview: {
    sections: 'This e-commerce platform provides a modern shopping experience with real-time inventory management. Customers can browse products, add items to cart, and securely checkout using Stripe. The admin dashboard allows store managers to manage products, view orders, and track sales metrics.\n\nThe frontend is built with React and TypeScript for type safety, while the backend uses Express.js with PostgreSQL for reliable data storage. Redis is used for caching frequently accessed data to improve performance.'
  }
}
```

## Tips

✅ **Do:**
- Keep descriptions concise and clear
- Use multiple tool categories for organization
- Alternate `side` values (left, right, left, right...) for visual balance
- Use accurate, descriptive tag names
- Include all relevant technologies

❌ **Don't:**
- Skip the `id` field or use duplicate IDs
- Use incorrect date format (must be `'MMM YYYY'`)
- Leave `side` blank (must be `'left'` or `'right'`)
- Make descriptions longer than 2 sentences for the card

## After Adding a Project

1. **Test locally**: Your project will automatically appear on the home page and projects page
2. **Update git**: 
   ```bash
   git add constants.ts
   git commit -m "Add new project: Your Project Title"
   git push
   ```
3. **Vercel deploys automatically** when you push to GitHub

## Need Help?

- Check existing projects in `constants.ts` for reference
- The project automatically sorts by `id` (most recent first on the projects page)
- The timeline on the home page alternates left/right based on your `side` setting
- Project images should be 16:9 aspect ratio for best results

---

**That's it!** Your new project is now live on your portfolio.
