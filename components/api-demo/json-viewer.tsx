'use client';

interface JsonViewerProps {
  data: string;
}

export function JsonViewer({ data }: JsonViewerProps) {
  // Simple JSON syntax highlighter
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

    // Apply syntax highlighting
    return formatted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = 'text-fd-foreground';

          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              // Key
              cls = 'text-blue-600 dark:text-blue-400 font-medium';
            } else {
              // String value
              cls = 'text-green-600 dark:text-green-400';
            }
          } else if (/true|false/.test(match)) {
            // Boolean
            cls = 'text-purple-600 dark:text-purple-400';
          } else if (/null/.test(match)) {
            // Null
            cls = 'text-red-600 dark:text-red-400';
          } else if (/^-?\d/.test(match)) {
            // Number
            cls = 'text-orange-600 dark:text-orange-400';
          }

          return `<span class="${cls}">${match}</span>`;
        }
      );
  };

  return (
    <div className='relative'>
      <pre className='bg-fd-background border rounded-md p-4 overflow-x-auto text-xs leading-relaxed'>
        <code
          className='bg-transparent border-none'
          dangerouslySetInnerHTML={{ __html: highlightJson(data) }}
        />
      </pre>
    </div>
  );
}
