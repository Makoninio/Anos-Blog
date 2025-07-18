export default function TestEnvPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="space-y-2">
        <p><strong>NEXT_PUBLIC_SANITY_PROJECT_ID:</strong> {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET'}</p>
        <p><strong>NEXT_PUBLIC_SANITY_DATASET:</strong> {process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET'}</p>
      </div>
    </div>
  );
} 