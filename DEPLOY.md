# Candelas Official Site — Deployment Guide

## Quick Deploy to Netlify (Recommended)

The newsletter subscription uses a **serverless edge function** that securely
proxies requests to Sender.net. This means your API token is **never exposed
in the browser** — it lives only in Netlify's encrypted environment variables.

---

### Step 1 — Push to GitHub

1. Create a new repository at github.com (can be private)
2. Push the contents of this zip to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Initial deploy"
   git remote add origin https://github.com/YOUR_USERNAME/candelas-site.git
   git push -u origin main
   ```

### Step 2 — Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Connect your GitHub account and select the repo
4. Build settings — leave everything blank (it's already a static site):
   - Build command: *(leave empty)*
   - Publish directory: `.`  ← type a single dot
5. Click **Deploy site**

### Step 3 — Add Your Sender.net API Token

> ⚠️ **Important:** Never paste the API token into any HTML or JS file.
> Always use environment variables.

1. In your Netlify site dashboard, go to **Site configuration → Environment variables**
2. Click **Add a variable**
3. Set:
   - **Key:** `SENDER_API_TOKEN`
   - **Value:** *(paste your Sender.net API token here)*
4. Click **Save**
5. Go to **Deploys** and click **Trigger deploy → Deploy site**

The newsletter form will now call `/api/subscribe` which runs your edge
function at `netlify/edge-functions/subscribe.js`. That function reads
`SENDER_API_TOKEN` from the environment and calls the Sender.net API.

---

### Step 4 — (Optional) Assign to a Sender.net Group

If you want subscribers added to a specific list/group in Sender.net:

1. In Sender.net go to **Subscribers → Groups** and copy your group ID
2. Open `netlify/edge-functions/subscribe.js`
3. Find the commented line:
   ```js
   // groups: ["YOUR_GROUP_ID"],
   ```
4. Uncomment it and replace `YOUR_GROUP_ID` with your actual group ID
5. Commit and push — Netlify will auto-redeploy

---

## Alternative: Cloudflare Pages

If you prefer Cloudflare Pages over Netlify:

1. Push the site to GitHub (same as Step 1 above)
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create**
3. Connect GitHub repo, set publish directory to `.`
4. After deploy, go to **Settings → Environment variables** and add `SENDER_API_TOKEN`
5. Rename the edge function for Cloudflare compatibility — see below

**Cloudflare version of the subscribe function** — create `functions/api/subscribe.js`:

```js
export async function onRequestPost(context) {
  const token = context.env.SENDER_API_TOKEN;
  const { email } = await context.request.json();

  const res = await fetch('https://api.sender.net/v2/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  return res.ok
    ? new Response(JSON.stringify({ success: true }), { status: 200 })
    : new Response(JSON.stringify({ message: data.message }), { status: 400 });
}
```

---

## Alternative: Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variable `SENDER_API_TOKEN` in Project Settings
4. Create `api/subscribe.js`:

```js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  const r = await fetch('https://api.sender.net/v2/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await r.json();
  return r.ok ? res.json({ success: true }) : res.status(400).json(data);
}
```

---

## Testing Locally

To test the newsletter form locally before deploying:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create a .env file with your token (gitignore this file!)
echo "SENDER_API_TOKEN=your_token_here" > .env

# Run local dev server (serves site + edge functions)
netlify dev
```

Then open `http://localhost:8888` and test the subscribe form.

---

## File Structure

```
candelas-static/
├── index.html              # Homepage
├── story.html              # Biography
├── vhs.html                # VHS single landing page
├── links.html              # Linktree-style links
├── contact.html            # Contact form
├── newsletter.html         # Newsletter landing page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of use
├── styles.css              # Purged Tailwind CSS (30KB)
├── site.js                 # Shared JS utilities
├── netlify.toml            # Netlify config + cache headers
├── netlify/
│   └── edge-functions/
│       └── subscribe.js    # ← Sender.net proxy (token stays server-side)
└── [image/favicon assets]
```

---

## Security Notes

- **Never commit your API token to git.** The token belongs in Netlify's
  environment variables only.
- The edge function validates email format before calling Sender.net.
- CORS headers on the edge function only allow POST requests.
- Consider rotating your Sender.net API token periodically.
