# Sanity API Token Setup for Delete/Edit Operations

## Why You Need This

The error "Insufficient permissions; permission update required" occurs because delete and edit operations require a Sanity API token with **write permissions**.

## How to Get Your Sanity API Token

### Step 1: Go to Sanity Manage
1. Visit [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Sign in to your account
3. Select your project (Project ID: `dr4juf3p`)

### Step 2: Create an API Token
1. Go to **API** → **Tokens** (or **Settings** → **API** → **Tokens`)
2. Click **Add API token** or **Create token**
3. Give it a name (e.g., "Admin Panel Token")
4. **IMPORTANT**: Select **Editor** or **Admin** permissions (NOT Viewer)
   - **Editor** = Can read and write (create, update, delete)
   - **Admin** = Full access
5. Click **Save** or **Create**
6. **Copy the token immediately** (you won't be able to see it again!)

### Step 3: Add Token to Your .env.local File

Add this line to your `anos-blogs/.env.local` file:

```env
SANITY_API_TOKEN=your-token-here
```

Replace `your-token-here` with the token you just copied.

### Step 4: Restart Your Dev Server

After adding the token:
```bash
# Stop your server (Ctrl+C)
# Then restart:
npm run dev
```

## Your Complete .env.local Should Look Like:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=dr4juf3p
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skAbCdEf1234567890...your-actual-token-here
```

## Security Notes

⚠️ **Important Security Tips:**
- Never commit `.env.local` to git (it should already be in `.gitignore`)
- Never share your API token publicly
- Use **Editor** permissions (not Admin) if possible for better security
- Regenerate tokens if you suspect they've been compromised

## Troubleshooting

### Still Getting Permission Errors?
1. **Check token permissions**: Make sure you selected "Editor" or "Admin" (not "Viewer")
2. **Verify token is correct**: Double-check the token in `.env.local` matches what you copied
3. **Restart server**: Make sure you restarted your dev server after adding the token
4. **Check token hasn't expired**: Some tokens have expiration dates

### Token Format
Sanity tokens usually start with `sk` (e.g., `skAbCdEf123456...`)

---

**Need help?** Check the [Sanity API Token Documentation](https://www.sanity.io/docs/http-auth)

