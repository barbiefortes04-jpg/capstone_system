# Environment Variables Setup Guide

## Upstash Vector Setup
1. Go to https://console.upstash.com/
2. Create a new Vector database
3. Copy the REST URL and REST Token
4. Add them to your `.env.local` file

## Groq AI Setup  
1. Go to https://console.groq.com/keys
2. Create a new API key
3. Add it to your `.env.local` file

## Required Environment Variables
```bash
UPSTASH_VECTOR_REST_URL=https://your-vector-db.upstash.io
UPSTASH_VECTOR_REST_TOKEN=your-token-here
GROQ_API_KEY=gsk_your-api-key-here
```

## Deployment
For Vercel deployment, add these environment variables in your Vercel dashboard:
- Project Settings → Environment Variables
- Add each variable as a new entry