# Complete Setup Guide for Upstash Vector + Groq AI

## 🎯 Step 1: Create Upstash Vector Database

### 1.1 Go to Upstash Console
1. Open your browser and go to: https://console.upstash.com/
2. Sign up or log in to your account
3. If new user, you might need to verify your email

### 1.2 Create Vector Database
1. Click **"Vector"** in the sidebar (or **"Create Database"** → **"Vector"**)
2. Choose your configuration:
   - **Name**: `digital-twin-rag-vectors` (or any name you prefer)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
   - **Dimension**: `384` (matches our embedding model)
   - **Metric**: `COSINE` (for similarity search)
3. Click **"Create"**

### 1.3 Get Your Credentials
After creation, you'll see:
1. **REST URL**: Copy this (looks like: `https://xxx-xxx.upstash.io`)
2. **REST Token**: Copy this (long string starting with `eyJ...`)

Keep these safe - you'll need them next!

---

## 🤖 Step 2: Get Groq AI API Key

### 2.1 Go to Groq Console
1. Open: https://console.groq.com/keys
2. Sign up or log in
3. You might need to verify your email

### 2.2 Create API Key
1. Click **"Create API Key"** 
2. Give it a name: `digital-twin-rag-key`
3. Click **"Create"**
4. **IMPORTANT**: Copy the key immediately (starts with `gsk_...`)
5. Save it securely - you won't see it again!

---

## 💾 Step 3: Set Up Environment Variables

I'll help you update your `.env.local` file with the actual credentials you get!

---

## 🧪 Step 4: Test Setup

After we configure the environment:
1. Run `npm run dev`
2. Test the API at: http://localhost:3000/api/query
3. Verify everything works before deployment

---

## 📝 Quick Checklist

- [ ] Created Upstash Vector database
- [ ] Got Upstash REST URL 
- [ ] Got Upstash REST Token
- [ ] Created Groq API key
- [ ] Updated .env.local file
- [ ] Tested locally
- [ ] Ready for deployment

---

**Need Help?** 
- Upstash Support: https://upstash.com/docs/vector
- Groq Documentation: https://console.groq.com/docs
- Or ask me if you run into any issues!