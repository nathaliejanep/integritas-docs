'use client';

import { useState } from 'react';
import { ApiKeyFields, SubmitButton, useApiDemo } from './api-demo';
import { JsonViewer } from './json-viewer';
import { API_BASE_URL, ENDPOINT_TIMESTAMP_STATUS } from '@/lib/constants';
import { Download } from 'lucide-react';

export function ApiDemoJsonUids() {
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
  const [uids, setUids] = useState('');
  const [proofData, setProofData] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setProofData([]);

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
        .map((uid) => uid.trim())
        .filter((uid) => uid.length > 0);

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

        // Extract proof data for download
        if (data.data && Array.isArray(data.data)) {
          const proofs = data.data
            .filter((item: any) => item.onchain === true)
            .map((item: any) => ({
              address: item.address,
              data: item.data,
              proof: item.proof,
              root: item.root,
            }));
          setProofData(proofs);
        } else {
          setProofData([]);
        }

        if (!res.ok) {
          setError(`Request failed with status ${res.status}`);
        }
      } else {
        const text = await res.text();
        setError(
          `API returned non-JSON response (${res.status}): ${text.substring(
            0,
            200
          )}`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadProof = () => {
    if (proofData.length === 0) return;

    const jsonString = JSON.stringify(proofData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proof-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='border rounded-lg p-6 my-6 bg-fd-card'>
      <p className='text-sm text-fd-muted-foreground mb-4 not-prose'>
        Your API key is only used for this request and is not stored.
      </p>

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
            Enter one or more UIDs (comma or newline separated) from the
            previous step
          </p>
        </div>

        <SubmitButton loading={loading} />
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
          <div className='flex items-center justify-between mb-2'>
            <h4 className='text-sm font-medium'>Response:</h4>
            {proofData.length > 0 && (
              <button
                onClick={handleDownloadProof}
                className='flex items-center gap-2 px-3 py-1.5 text-sm bg-fd-primary text-fd-primary-foreground rounded-md hover:bg-fd-primary/90 transition-colors'
                title='Download proof JSON for verification'
              >
                <Download className='w-4 h-4' />
                Download Proof
              </button>
            )}
          </div>
          <JsonViewer data={response} />
          {proofData.length > 0 && (
            <p className='text-xs text-fd-muted-foreground mt-2'>
              ✓ Proof data ready for download. Use this file with the verify
              endpoints.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
