# Zapier + Supabase LinkedIn Integration Setup

This document explains how to set up the LinkedIn blog posts integration with Zapier and Supabase.

## Overview

The system works as follows:
1. When you publish a post on LinkedIn, Zapier captures it
2. Zapier sends the post data via `POST /api/linkedin-post` with your secret API key
3. The post is stored in Supabase database
4. The Blog page fetches posts from Supabase via `GET /api/get-linkedin-posts`
5. Posts display as cards in the Blog section

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Zapier webhook secret (create any strong secret value)
VITE_ZAPIER_SECRET=your_super_secret_key_here_change_this

# Supabase credentials (from your Supabase project dashboard)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **Security Note**: Never commit `.env.local` to Git. The `.gitignore` file should exclude it.

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Create a new project
4. Copy your project URL and service role key (from Settings → API)

### 1.2 Create the `linkedin_posts` Table

In your Supabase dashboard, open the SQL Editor and run:

```sql
CREATE TABLE linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  url TEXT NOT NULL UNIQUE,
  image TEXT,
  video TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create index on date for faster queries
CREATE INDEX idx_linkedin_posts_date ON linkedin_posts(date DESC);

-- Create index on url for unique constraint performance
CREATE INDEX idx_linkedin_posts_url ON linkedin_posts(url);
```

### 1.3 Enable Row Level Security (RLS)

For security, create policies so the API can read posts but Zapier can only write with valid key:

```sql
-- Allow public read access (no auth needed)
CREATE POLICY "Allow public read" ON linkedin_posts
FOR SELECT USING (true);

-- Allow INSERT only from authenticated requests (Zapier)
-- Note: API validation happens at the endpoint level via x-api-key header
CREATE POLICY "Allow authenticated write" ON linkedin_posts
FOR INSERT WITH CHECK (true);
```

## Step 2: Configure Zapier

### 2.1 Create a Zapier Zap

1. Go to [zapier.com](https://zapier.com)
2. Sign in and create a new Zap
3. Choose trigger: **LinkedIn** → **New Posts by You**
4. Connect your LinkedIn account and test the trigger

### 2.2 Set Up the Webhook Action

1. Add an action step: **Webhooks** → **POST**
2. Configure the webhook:
   - **URL**: `https://yourdomain.com/api/linkedin-post` (replace with your deployed URL)
   - **Method**: POST
   - **Headers** (in custom headers):
     - `x-api-key: your_super_secret_key_here_change_this` (match `VITE_ZAPIER_SECRET`)
     - `Content-Type: application/json`
   - **Data**:
     ```json
     {
       "text": "Post content here",
       "date": "Publish date ISO format",
       "url": "LinkedIn post URL",
       "image": "Image URL if available",
       "video": "Video URL if available"
     }
     ```

Use Zapier's variable mappings to extract LinkedIn data:
- `text` → Use LinkedIn post text field
- `date` → Use publish date
- `url` → Use post link
- `image` → Use attached image (if exists)
- `video` → Use attached video (if exists)

### 2.3 Test and Enable

1. Click **Send Test** to verify the webhook works
2. Check your browser console and Supabase dashboard for the new post
3. Enable the Zap in production

## Step 3: Deploy to Production

### For Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. In Environment Variables, add:
   - `VITE_ZAPIER_SECRET=your_secret_key`
   - `VITE_SUPABASE_URL=https://your-project.supabase.co`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`
5. Deploy

### For Netlify Deployment

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your GitHub repository
4. In Site Settings → Build & Deploy → Environment, add the same variables
5. Deploy

### For Render Deployment

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. In Environment Variables, add the same variables
6. Deploy

## Testing Locally

To test the webhook locally:

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Use a tunnel tool like ngrok to expose your local server:
   ```bash
   npx ngrok http 5173
   ```

3. Update your Zapier webhook URL to the ngrok URL
4. Test the Zapier Zap with your ngrok URL
5. Check the database for new posts

## Supabase API Reference

### POST /api/linkedin-post

**Headers:**
```
x-api-key: your_zapier_secret
Content-Type: application/json
```

**Body:**
```json
{
  "text": "Post content",
  "date": "2026-02-06T12:00:00Z",
  "url": "https://linkedin.com/feed/update/123",
  "image": "https://image-url.com/image.jpg",
  "video": "https://video-url.com/video.mp4"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": { "id": "uuid", "text": "...", "date": "...", "url": "...", "created_at": "..." }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing `x-api-key`
- `400 Bad Request`: Missing required fields (text, date, url)
- `500 Internal Server Error`: Database error

### GET /api/get-linkedin-posts

**Response (200):**
```json
{
  "elements": [
    {
      "id": "uuid",
      "text": "Post content",
      "date": "2026-02-06T12:00:00Z",
      "url": "https://linkedin.com/feed/update/123",
      "image": "https://image-url.com/image.jpg",
      "video": null,
      "created_at": "2026-02-06T12:00:00Z"
    }
  ]
}
```

## Troubleshooting

### "posts fail to load on Blog page"
- Check browser console for errors
- Verify Supabase credentials are correct
- Ensure `linkedin_posts` table exists and has data

### "Zapier webhook returns 401"
- Verify `x-api-key` header matches `VITE_ZAPIER_SECRET` exactly
- Check that the secret is set in your environment variables

### "Zapier webhook returns 400"
- Ensure the JSON body includes required fields: `text`, `date`, `url`
- Validate JSON formatting in Zapier

### "Cannot connect to Supabase"
- Double-check URL and Service Role Key
- Ensure Supabase project is active
- Check firewall/network settings

## Next Steps

- Monitor your Blog page for new posts from LinkedIn via Zapier
- Adjust Zapier filters to customize which posts are captured
- Add more Zap actions (e.g., email notifications)
- Use Zapier's formatting to customize post text

For questions, refer to:
- [Supabase Docs](https://supabase.com/docs)
- [Zapier Docs](https://zapier.com/help)
