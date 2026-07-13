# 🚀 GitHub Setup Instructions

## To publish this app on GitHub and make it accessible to everyone:

### Step 1: Create a GitHub Account (if you don't have one)
Visit: https://github.com/signup

### Step 2: Create a New Repository on GitHub
1. Go to https://github.com/new
2. Repository Name: `natwest-banking-app` (or any name you prefer)
3. Description: `NatWest Online Banking Application - Static Website`
4. Choose: Public (so everyone can access it)
5. Click "Create repository"

### Step 3: Push Your Code to GitHub
After creating the repository, you'll see commands to push your code. Run these in your terminal:

```bash
cd /Users/shrimathi/Desktop/NatWest/banking-app-website

# Set the remote repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/natwest-banking-app.git

# Rename branch to main (if not already)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub: https://github.com/USERNAME/natwest-banking-app
2. Click "Settings" (gear icon)
3. Scroll down to "GitHub Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select Branch: `main`, Folder: `/ (root)`
6. Click "Save"

### Step 5: Access Your App
Wait 1-2 minutes for GitHub Pages to deploy, then access your app at:

🎉 **https://USERNAME.github.io/natwest-banking-app/**

Replace USERNAME with your actual GitHub username.

---

## Alternative: Using SSH (More Secure)

If you prefer SSH instead of HTTPS:

```bash
git remote add origin git@github.com:USERNAME/natwest-banking-app.git
```

---

## Features Deployed:
✅ Login Page with Blue Theme
✅ Dashboard with Tabs
✅ Direct Branch Transfer (DBT)
✅ Deposit & Withdraw Options
✅ Cash Deposit/Withdrawal with Currency Calculator
✅ Cheque Deposit
✅ Transaction History
✅ Token Generation System
✅ Local Storage for Data Persistence

---

## Need Help?
- GitHub Docs: https://docs.github.com
- GitHub Pages: https://pages.github.com
