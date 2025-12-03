'use client';

import { useState } from 'react';
import { API_BASE_URL, ENDPOINT_FILE_HASH } from '@/lib/constants';

export function LiveDemoFileUpload() {
  const [apiKey, setApiKey] = useState('');
  const [requestId, setRequestId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    if (!apiKey) {
      setError('Please provide an API key');
      setLoading(false);
      return;
    }

    if (!file) {
      setError('Please select a file to upload');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const headers: HeadersInit = {
        'x-api-key': apiKey,
      };

      if (requestId) {
        headers['x-request-id'] = requestId;
      }

      const res = await fetch(`${API_BASE_URL}${ENDPOINT_FILE_HASH}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));

      if (!res.ok) {
        setError(`Request failed with status ${res.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border rounded-lg p-6 my-6 bg-fd-card'>
      <p className='text-sm text-fd-muted-foreground mb-4 not-prose'>
        Your API key is only used for this request and is not stored.
      </p>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='apiKey' className='block text-sm font-medium mb-1'>
            API Key <span className='text-red-500'>*</span>
          </label>
          <input
            id='apiKey'
            type='text'
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder='your-api-key'
            className='w-full px-3 py-2 border rounded-md bg-fd-background focus:outline-none focus:ring-2 focus:ring-fd-primary'
            required
          />
          <p className='text-xs text-fd-muted-foreground mt-1'>
            Get your API key from{' '}
            <a
              href='https://integritas.minima.global/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-fd-primary hover:underline'
            >
              integritas.minima.global
            </a>
          </p>
        </div>

        <div>
          <label htmlFor='requestId' className='block text-sm font-medium mb-1'>
            Request ID{' '}
            <span className='text-fd-muted-foreground'>(optional)</span>
          </label>
          <input
            id='requestId'
            type='text'
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            placeholder='test-123'
            className='w-full px-3 py-2 border rounded-md bg-fd-background focus:outline-none focus:ring-2 focus:ring-fd-primary'
          />
          <p className='text-xs text-fd-muted-foreground mt-1'>
            Add a request ID to trace every step of the process
          </p>
        </div>

        <div>
          <label htmlFor='file' className='block text-sm font-medium mb-1'>
            File <span className='text-red-500'>*</span>
          </label>
          <input
            id='file'
            type='file'
            onChange={handleFileChange}
            className='w-full px-3 py-2 border rounded-md bg-fd-background focus:outline-none focus:ring-2 focus:ring-fd-primary file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-fd-primary file:text-fd-primary-foreground hover:file:bg-fd-primary/90 cursor-pointer'
            required
          />
          {file && (
            <p className='text-xs text-fd-muted-foreground mt-1'>
              Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full px-4 py-2 bg-fd-primary text-fd-primary-foreground rounded-md hover:bg-fd-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors'
        >
          {loading ? 'Sending Request...' : 'Send Request'}
        </button>
      </form>

      {error && (
        <div className='mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md'>
          <p className='text-sm text-red-800 dark:text-red-200'>
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {response && (
        <div className='mt-4'>
          <h4 className='text-sm font-medium mb-2'>Response:</h4>
          <pre className='bg-fd-background border rounded-md p-4 overflow-x-auto text-xs'>
            <code>{response}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
