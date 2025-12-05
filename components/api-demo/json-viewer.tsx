'use client';

interface JsonViewerProps {
  data: string;
}

export function JsonViewer({ data }: JsonViewerProps) {
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
        `,
        }}
      />
      <pre className='json-viewer-shiki bg-fd-background border rounded-md p-4 overflow-x-auto text-xs leading-relaxed'>
        <code
          className='bg-transparent border-none'
          dangerouslySetInnerHTML={{ __html: highlightJson(data) }}
        />
      </pre>
    </div>
  );
}
