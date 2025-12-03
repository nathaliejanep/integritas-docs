'use client';

import { useState } from 'react';
import { ApiDemoWrapper, ApiKeyFields, SubmitButton, useApiDemo } from './api-demo';
import { API_BASE_URL, ENDPOINT_VERIFY_POST } from '@/lib/constants';

export function ApiDemoVerifyData() {
  const { apiKey, setApiKey, requestId, setRequestId, loading, setLoading, response, setResponse, error, setError } = useApiDemo();
  const [file, setFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [reportRequired, setReportRequired] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProofFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
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
      setError('Please select a file to verify');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (proofFile) {
        formData.append('jsonproof', proofFile);
      }

      const headers: HeadersInit = {
        'x-api-key': apiKey,
      };

      if (requestId) {
        headers['x-request-id'] = requestId;
      }

      if (reportRequired) {
        headers['x-report-required'] = 'true';
      }

      const res = await fetch(`${API_BASE_URL}${ENDPOINT_VERIFY_POST}`, {
        method: 'POST',
        headers,
        body: formData,
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
          <label htmlFor='file' className='block text-sm font-medium mb-1'>
            Source File <span className='text-red-500'>*</span>
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

        <div>
          <label htmlFor='proofFile' className='block text-sm font-medium mb-1'>
            Proof File{' '}
            <span className='text-fd-muted-foreground'>(optional)</span>
          </label>
          <input
            id='proofFile'
            type='file'
            accept='.json'
            onChange={handleProofFileChange}
            className='w-full px-3 py-2 border rounded-md bg-fd-background focus:outline-none focus:ring-2 focus:ring-fd-primary file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-fd-primary file:text-fd-primary-foreground hover:file:bg-fd-primary/90 cursor-pointer'
          />
          {proofFile && (
            <p className='text-xs text-fd-muted-foreground mt-1'>
              Selected: {proofFile.name}
            </p>
          )}
          <p className='text-xs text-fd-muted-foreground mt-1'>
            Upload the JSON proof file if you have one
          </p>
        </div>

        <div className='flex items-center'>
          <input
            id='reportRequired'
            type='checkbox'
            checked={reportRequired}
            onChange={(e) => setReportRequired(e.target.checked)}
            className='h-4 w-4 rounded border-gray-300 text-fd-primary focus:ring-fd-primary focus:ring-2'
          />
          <label htmlFor='reportRequired' className='ml-2 block text-sm'>
            Request NFT trace report
          </label>
        </div>

        <SubmitButton loading={loading} />
      </form>
    </ApiDemoWrapper>
  );
}

