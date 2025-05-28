"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CopyIcon } from "lucide-react";



const OutputComponent = () => {
  const [copied, setCopied] = useState(false);

  // Default example content
  const exampleHtml =  `
<div class="card">
  <div class="card-header">
    <h2>Welcome to My App</h2>
  </div>
  <div class="card-body">
    <p>This is a beautifully styled component</p>
    <button id="demo-btn" class="btn">Click Me</button>
  </div>
  <div class="card-footer">
    <small>Try hovering over this card!</small>
  </div>
</div>
  `.trim();

  const exampleCss =  `
.card {
  font-family: 'Arial', sans-serif;
  width: 300px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
.card-header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 15px;
}
.btn {
  background-color: #6e8efb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
  `.trim();

  const exampleJs =  `
document.getElementById('demo-btn').addEventListener('click', () => {
  alert('Button clicked!');
});
  `.trim();

  const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Output</title>
  <style>
    ${exampleCss}
  </style>
</head>
<body>
  ${exampleHtml}
  <script>
    ${exampleJs}
  </script>
</body>
</html>`.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to format code with proper indentation
  const formatCode = (code: string) => {
    const lines = code.split('\n');
    let indent = 0;
    return lines.map(line => {
      line = line.trim();
      if (line.match(/<\/|\}\s*>|\}\s*\/>/)) indent = Math.max(0, indent - 2);
      const result = ' '.repeat(indent) + line;
      if (line.match(/<[^/]|{\s*$/)) indent += 2;
      return result;
    }).join('\n');
  };

  // Function to apply syntax highlighting
  const highlightSyntax = (code: string) => {
    const formatted = formatCode(code);
    return formatted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(".*?")/g, '<span style="color: #ce9178">$1</span>')
      .replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9-]*)/g, '<span style="color: #569cd6">$1</span>')
      .replace(/([a-zA-Z-]+)=/g, '<span style="color: #9cdcfe">$1</span>=')
      .replace(/&lt;!--.*?--&gt;/g, '<span style="color: #6a9955">$&</span>')
      .replace(/\b(document|function|addEventListener|const|let|var)\b/g, '<span style="color: #569cd6">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #569cd6">$1</span>')
      .replace(/\b(\d+)\b/g, '<span style="color: #b5cea8">$1</span>');
  };

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      margin: '1rem 0',
      backgroundColor: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#1e293b'
        }}>Output</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={copyToClipboard}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: '#334155'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <CopyIcon style={{ width: '0.875rem', height: '0.875rem' }} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <Tabs defaultValue="preview" style={{ width: '100%' }}>
        <TabsList style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          width: '100%',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <TabsTrigger value="code" style={{
            padding: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#64748b',
            cursor: 'pointer',
            textAlign: 'center',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s'
          }}>
            Code
          </TabsTrigger>
          <TabsTrigger value="preview" style={{
            padding: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#64748b',
            cursor: 'pointer',
            textAlign: 'center',
            borderBottom: '2px solid transparent',
            transition: 'all 0.2s'
          }}>
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code" style={{ margin: 0 }}>
          <div style={{ 
            maxHeight: '500px',
            overflow: 'auto',
            backgroundColor: '#1e1e1e',
            padding: '1rem',
            fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            <pre style={{ 
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#d4d4d4'
            }}>
              <code dangerouslySetInnerHTML={{ __html: highlightSyntax(fullCode) }} />
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="preview" style={{ 
          margin: 0,
          // height: '800px',
          backgroundColor: 'white'
        }}>
          <iframe
            srcDoc={fullCode}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'white'
            }}
            sandbox="allow-scripts allow-same-origin"
            title="Preview"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OutputComponent;