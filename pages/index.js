import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
      setError('');
      setCopied(false);
    } catch (err) {
      setError('Failed to shorten URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center px-4">
        <main className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🔗 URL Shortener</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Shorten URL
            </button>
          </form>

          {shortUrl && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700">Short URL:</p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-indigo-600 font-medium break-all hover:underline"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}

          {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
        </main>
      </div>
    </>
  );
}
