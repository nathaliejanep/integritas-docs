'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface JsonViewerProps {
  data: string;
}

export function JsonViewer({ data }: JsonViewerProps) {
  const [copied, setCopied] = useState(false);
  // Simple JSON syntax highlighter using Shiki-style colors
  const highlightJson = (json: string) => {
    // Try to format if it's valid JSON
    let formatted = json;
    try {
      const parsed = JSON.parse(json);
      formatted = JSON.stringify(parsed, null, 2);
    } catch {
      // If not valid JSON, use as-is
      formatted = json;
    }

    // Apply syntax highlighting with Shiki color scheme (GitHub style)
    return formatted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let lightColor = '#24292E'; // Default text color
          let darkColor = '#E1E4E8';

          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              // Key - blue
              lightColor = '#005CC5';
              darkColor = '#79B8FF';
            } else {
              // String value - green/cyan
              lightColor = '#032F62';
              darkColor = '#9ECBFF';
            }
          } else if (/true|false/.test(match)) {
            // Boolean - blue
            lightColor = '#005CC5';
            darkColor = '#79B8FF';
          } else if (/null/.test(match)) {
            // Null - blue
            lightColor = '#005CC5';
            darkColor = '#79B8FF';
          } else if (/^-?\d/.test(match)) {
            // Number - blue
            lightColor = '#005CC5';
            darkColor = '#79B8FF';
          }

          return `<span style="--shiki-light:${lightColor};--shiki-dark:${darkColor}">${match}</span>`;
        }
      );
  };

  const handleCopy = async () => {
    try {
      // Try to format as valid JSON, otherwise copy as-is
      let textToCopy = data;
      try {
        const parsed = JSON.parse(data);
        textToCopy = JSON.stringify(parsed, null, 2);
      } catch {
        textToCopy = data;
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className='relative'>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .json-viewer-shiki {
            color: #24292E;
          }
          .json-viewer-shiki span {
            color: var(--shiki-light);
          }
          .dark .json-viewer-shiki {
            color: #E1E4E8;
          }
          .dark .json-viewer-shiki span {
            color: var(--shiki-dark);
          }
          
          @keyframes iconFadeIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .icon-transition {
            animation: iconFadeIn 0.15s ease-in-out;
          }
        `,
        }}
      />
      <button
        onClick={handleCopy}
        className='absolute right-2 top-2 z-[2] backdrop-blur-md inline-flex items-center justify-center rounded-md p-2 text-sm font-medium duration-100 disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground transition-opacity'
        title={copied ? 'Copied!' : 'Copy to clipboard'}
        aria-label='Copy JSON to clipboard'
      >
        {copied ? (
          <Check className='w-4 h-4 icon-transition' />
        ) : (
          <Copy className='w-4 h-4 icon-transition' />
        )}
      </button>
      <pre className='json-viewer-shiki bg-fd-background border rounded-md p-4 pr-12 overflow-x-auto text-xs leading-relaxed'>
        <code
          className='bg-transparent border-none'
          dangerouslySetInnerHTML={{ __html: highlightJson(data) }}
        />
      </pre>
    </div>
  );
}
