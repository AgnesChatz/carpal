# 🚀 Carpal Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (Terminal)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login (opens browser)
vercel login

# 3. Deploy
vercel --prod
```

### Option 2: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub (push this code to GitHub first)
   - OR - 
   Drag & drop the `starter-for-nextjs` folder
4. Click "Deploy"

### Option 3: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next
```

---

## Environment Variables

Set these in your hosting dashboard:

```env
# Appwrite (when ready to connect real backend)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key

# Stripe (when ready for real payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Other
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## Post-Deployment Checklist

- [ ] Test login with demo account: `demo@carpal.gr` / `demo123`
- [ ] Test "Become a Driver" flow
- [ ] Test search functionality
- [ ] Check all legal pages load
- [ ] Test mobile responsiveness
- [ ] Verify SEO meta tags

---

## Custom Domain (Optional)

1. Buy domain (e.g., from Namecheap, Cloudflare)
2. Add to Vercel: Project Settings → Domains
3. Update DNS records as instructed

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
