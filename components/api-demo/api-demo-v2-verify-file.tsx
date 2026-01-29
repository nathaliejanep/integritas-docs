'use client';

import { useState } from 'react';
import {
  ApiDemoWrapper,
  ApiKeyFields,
  SubmitButton,
  useApiDemo,
} from './api-demo';
import { API_BASE_URL, ENDPOINT_V2_VERIFY_FILE } from '@/lib/constants';

export function ApiDemoV2VerifyFile() {
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
  const [reportRequired, setReportRequired] = useState(true);

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
        'x-report-required': reportRequired.toString(),
      };

      if (requestId) {
        headers['x-request-id'] = requestId;
      }

      const res = await fetch(`${API_BASE_URL}${ENDPOINT_V2_VERIFY_FILE}`, {
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
            placeholder='106F1589B5818A400679A87A19214C43605DEC3EBFDD61E45A776A81C120DD9B'
            className='w-full px-3 py-2 border rounded-md bg-fd-background focus:outline-none focus:ring-2 focus:ring-fd-primary font-mono text-sm'
            required
          />
          <p className='text-xs text-fd-muted-foreground mt-1'>
            Enter the file hash to verify
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <input
            id='reportRequired'
            type='checkbox'
            checked={reportRequired}
            onChange={(e) => setReportRequired(e.target.checked)}
            className='rounded border-fd-border'
          />
          <label
            htmlFor='reportRequired'
            className='text-sm font-medium'
          >
            Request PDF report (x-report-required)
          </label>
        </div>

        <SubmitButton loading={loading} />
      </form>
    </ApiDemoWrapper>
  );
}
