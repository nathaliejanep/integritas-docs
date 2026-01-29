'use client';

import { useState } from 'react';
import {
  ApiDemoWrapper,
  ApiKeyFields,
  SubmitButton,
  useApiDemo,
} from './api-demo';
import { API_BASE_URL, ENDPOINT_V2_FILE_CHECK } from '@/lib/constants';

export function ApiDemoV2FileCheck() {
  const {
    apiKey,
    setApiKey,
    requestId,
    setRequestId,
    loading,
    setLoading,
    response,
    setResponse,
    error,
    setError,
  } = useApiDemo();
  const [hash, setHash] = useState('');

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

    if (!hash) {
      setError('Please provide a hash');
      setLoading(false);
      return;
    }

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      };

      if (requestId) {
        headers['x-request-id'] = requestId;
      }

      const res = await fetch(`${API_BASE_URL}${ENDPOINT_V2_FILE_CHECK}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ hash }),
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));

        if (!res.ok) {
          setError(`Request failed with status ${res.status}`);
        }
      } else {
        const text = await res.text();
        setError(
          `API returned non-JSON response (${res.status}): ${text.substring(0, 200)}`,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiDemoWrapper
      response={response}
      error={error}
    >
      <form
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        <ApiKeyFields
          apiKey={apiKey}
          setApiKey={setApiKey}
          requestId={requestId}
          setRequestId={setRequestId}
        />

        <div>
          <label
            htmlFor='hash'
            className='block text-sm font-medium mb-1'
          >
            Hash <span className='text-red-500'>*</span>
          </label>
          <input
            id='hash'
            type='text'
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder='a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890'
            className='w-full px-3 py-2 border rounded-md bg-fd-background focus:outline-none focus:ring-2 focus:ring-fd-primary font-mono text-sm'
            required
          />
          <p className='text-xs text-fd-muted-foreground mt-1'>
            Enter the hash to check on the blockchain
          </p>
        </div>

        <SubmitButton loading={loading} />
      </form>
    </ApiDemoWrapper>
  );
}
