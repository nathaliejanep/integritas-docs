'use client';

import { useState } from 'react';
import { ApiDemoWrapper, ApiKeyFields, SubmitButton, useApiDemo } from './api-demo';
import { API_BASE_URL, ENDPOINT_TIMESTAMP_STATUS } from '@/lib/constants';

export function ApiDemoJsonUids() {
  const { apiKey, setApiKey, requestId, setRequestId, loading, setLoading, response, setResponse, error, setError } = useApiDemo();
  const [uids, setUids] = useState('');

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

    if (!uids) {
      setError('Please provide at least one UID');
      setLoading(false);
      return;
    }

    try {
      // Parse UIDs - can be comma-separated or newline-separated
      const uidArray = uids
        .split(/[,\n]/)
        .map(uid => uid.trim())
        .filter(uid => uid.length > 0);

      if (uidArray.length === 0) {
        setError('Please provide at least one valid UID');
        setLoading(false);
        return;
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      };

      if (requestId) {
        headers['x-request-id'] = requestId;
      }

      const res = await fetch(`${API_BASE_URL}${ENDPOINT_TIMESTAMP_STATUS}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ uids: uidArray }),
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
        setError(`API returned non-JSON response (${res.status}): ${text.substring(0, 200)}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiDemoWrapper response={response} error={error}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <ApiKeyFields
          apiKey={apiKey}
          setApiKey={setApiKey}
          requestId={requestId}
          setRequestId={setRequestId}
        />

        <div>
          <label htmlFor='uids' className='block text-sm font-medium mb-1'>
            UID(s) <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='uids'
            value={uids}
            onChange={(e) => setUids(e.target.value)}
            placeholder='0xFD6C5E119105643FF6DF'
            rows={3}
            className='w-full px-3 py-2 border rounded-md bg-fd-background focus:outline-none focus:ring-2 focus:ring-fd-primary font-mono text-sm'
            required
          />
          <p className='text-xs text-fd-muted-foreground mt-1'>
            Enter one or more UIDs (comma or newline separated) from the previous step
          </p>
        </div>

        <SubmitButton loading={loading} />
      </form>
    </ApiDemoWrapper>
  );
}

