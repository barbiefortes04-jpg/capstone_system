# Vercel Deployment with Upstash Vector + Groq AI

## Environment Variables Setup

### 1. Upstash Vector Database
1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Vector database
3. Copy the REST URL and REST Token
4. Add to Vercel environment variables:
   - `UPSTASH_VECTOR_REST_URL` = `https://your-vector-db.upstash.io`
   - `UPSTASH_VECTOR_REST_TOKEN` = `your-vector-token`

### 2. Groq AI API
1. Go to [Groq Console](https://console.groq.com/keys)
2. Create a new API key
3. Add to Vercel environment variables:
   - `GROQ_API_KEY` = `gsk_your-api-key-here`

### 3. Vercel Dashboard Setup
1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable:
   - Name: `UPSTASH_VECTOR_REST_URL`
   - Value: Your Upstash Vector REST URL
   - Environment: All (Production, Preview, Development)
4. Repeat for `UPSTASH_VECTOR_REST_TOKEN` and `GROQ_API_KEY`

### 4. Deploy
```bash
npm install
vercel --prod
```

## Features Added
- **Upstash Vector**: Scalable vector database for embeddings storage
- **Groq AI**: Fast LLM inference for intelligent responses
- **Graceful Fallbacks**: System continues working even if services are unavailable
- **Enhanced Error Handling**: Better debugging and user feedback

## Testing
```bash
# Test locally with environment variables
npm run dev

# Test the API
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What are your technical skills?"}'
```