// Quick script to check if SANITY_API_TOKEN is configured
// Run with: node check-token.js

require('dotenv').config({ path: '.env.local' });

const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('❌ SANITY_API_TOKEN is NOT configured');
  console.log('\n📝 To fix this:');
  console.log('1. Go to https://www.sanity.io/manage');
  console.log('2. Select your project');
  console.log('3. Go to API → Tokens');
  console.log('4. Create a new token with "Editor" permissions');
  console.log('5. Add it to your .env.local file:');
  console.log('   SANITY_API_TOKEN=your-token-here');
  console.log('6. Restart your dev server');
  process.exit(1);
} else {
  console.log('✅ SANITY_API_TOKEN is configured');
  console.log(`Token starts with: ${token.substring(0, 4)}...`);
  console.log(`Token length: ${token.length} characters`);
  
  if (!token.startsWith('sk')) {
    console.warn('⚠️  Warning: Token should usually start with "sk"');
  }
  
  if (token.length < 20) {
    console.warn('⚠️  Warning: Token seems too short');
  }
}

