// Test script to verify Upstash Vector + Groq AI setup
// Run with: node test-setup.js

const { getRAGSystem } = require('./lib/rag-system.js');

async function testSetup() {
  console.log('🧪 Testing Upstash Vector + Groq AI Setup...\n');
  
  try {
    // Check environment variables
    console.log('1️⃣ Checking Environment Variables:');
    const upstashUrl = process.env.UPSTASH_VECTOR_REST_URL;
    const upstashToken = process.env.UPSTASH_VECTOR_REST_TOKEN;
    const groqKey = process.env.GROQ_API_KEY;
    
    console.log('   ✅ UPSTASH_VECTOR_REST_URL:', upstashUrl ? '✅ Set' : '❌ Missing');
    console.log('   ✅ UPSTASH_VECTOR_REST_TOKEN:', upstashToken ? '✅ Set' : '❌ Missing');
    console.log('   ✅ GROQ_API_KEY:', groqKey ? '✅ Set' : '❌ Missing');
    
    if (!upstashUrl || !upstashToken || !groqKey) {
      throw new Error('Missing required environment variables');
    }
    
    // Initialize RAG system
    console.log('\n2️⃣ Initializing RAG System...');
    const rag = getRAGSystem();
    await rag.initialize();
    console.log('   ✅ RAG System initialized successfully');
    
    // Add test documents
    console.log('\n3️⃣ Adding Test Documents...');
    await rag.addDocuments([
      {
        id: 'test_1',
        text: 'I am a senior software engineer with 5 years of experience in React, Node.js, and Python.',
        metadata: { category: 'experience', source: 'test' }
      },
      {
        id: 'test_2', 
        text: 'I have built several full-stack applications using modern technologies like Next.js, TypeScript, and PostgreSQL.',
        metadata: { category: 'projects', source: 'test' }
      }
    ]);
    console.log('   ✅ Test documents added to Upstash Vector');
    
    // Test query
    console.log('\n4️⃣ Testing Query with Groq AI...');
    const result = await rag.query('What programming languages do you know?');
    console.log('   📝 Query Result:');
    console.log(`   Answer: ${result.answer}`);
    console.log(`   Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    console.log(`   Sources: ${result.sources.length} found`);
    
    // Get stats
    console.log('\n5️⃣ System Statistics:');
    const stats = rag.getStats();
    console.log('   📊 Stats:', JSON.stringify(stats, null, 2));
    
    console.log('\n🎉 Setup Test Complete! Everything is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Setup Test Failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('Vector index not available')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   • Check your Upstash Vector credentials');
      console.log('   • Verify the database is created and active');
      console.log('   • Ensure the REST URL and Token are correct');
    }
    
    if (error.message.includes('Groq')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   • Check your Groq API key');
      console.log('   • Verify you have credits/quota available');
      console.log('   • System will fallback to rule-based responses');
    }
  }
}

// Run the test
testSetup();