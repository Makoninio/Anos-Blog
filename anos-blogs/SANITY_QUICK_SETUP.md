# Quick Fix for Sanity Connection Error

## 🚨 Current Issue
You're seeing this error because Sanity is not properly configured:
```
Dataset not found - Dataset "production" not found for project ID "your-project-id"
```

## ✅ Quick Solution

### Step 1: Create Environment File
Create a file called `.env.local` in your `anos-blogs` directory with this content:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 2: Get Your Sanity Project ID
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Sign in to your account
3. Select your project (or create one if you haven't)
4. Copy the **Project ID** from the project settings
5. Replace `your-actual-project-id` in the `.env.local` file

### Step 3: Restart Your Development Server
```bash
# Stop your current server (Ctrl+C)
# Then restart it:
npm run dev
```

## 🔧 Alternative: Use Demo Data (Temporary)

If you want to see the site working immediately without setting up Sanity:

1. The pages will now show "No posts found" instead of crashing
2. You can still navigate between pages
3. The navigation and layout will work perfectly

## 🚀 Next Steps

Once you have Sanity set up:
1. Follow the full setup guide in `SANITY_SETUP.md`
2. Add some sample content in your Sanity studio
3. Your posts and essays will appear on the pages

## 📝 Example .env.local file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
NEXT_PUBLIC_SANITY_DATASET=production
```

**Note:** Replace `abc12345` with your actual Project ID from Sanity. 