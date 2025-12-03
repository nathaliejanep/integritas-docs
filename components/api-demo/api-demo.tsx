'use client';

import { useState, ReactNode } from 'react';

interface ApiDemoWrapperProps {
  children: ReactNode;
  response: string | null;
  error: string | null;
}

export function ApiDemoWrapper({
  children,
  response,
  error,
}: ApiDemoWrapperProps) {
  return (
    <div className='border rounded-lg p-6 my-6 bg-fd-card'>
      <p className='text-sm text-fd-muted-foreground mb-4 not-prose'>
        Your API key is only used for this request and is not stored.
      </p>

      {children}

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

interface ApiKeyFieldsProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  requestId: string;
  setRequestId: (id: string) => void;
}

export function ApiKeyFields({
  apiKey,
  setApiKey,
  requestId,
  setRequestId,
}: ApiKeyFieldsProps) {
  return (
    <>
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
    </>
  );
}

interface SubmitButtonProps {
  loading: boolean;
  text?: string;
}

export function SubmitButton({
  loading,
  text = 'Send Request',
}: SubmitButtonProps) {
  return (
    <button
      type='submit'
      disabled={loading}
      className='w-full px-4 py-2 bg-fd-primary text-fd-primary-foreground rounded-md hover:bg-fd-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors'
    >
      {loading ? 'Sending Request...' : text}
    </button>
  );
}

export function useApiDemo() {
  const [apiKey, setApiKey] = useState('');
  const [requestId, setRequestId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return {
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
  };
}
