"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";



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
    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm my-4 bg-white">
      <div className="bg-blue-100 flex justify-between items-center px-3 py-2 border-b border-gray-200 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 text-center">output</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-2 text-xs text-gray-700 hover:bg-gray-100 gap-1"
          >
            <CopyIcon className="h-3.5 w-3.5" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-50 border-b border-gray-200">
          <TabsTrigger 
            value="code" 
            className="text-xs font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 py-2 transition-colors"
          >
            Code
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="text-xs font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 py-2 transition-colors"
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="m-0">
          <div className="max-h-[500px] overflow-auto bg-[#1e1e1e] p-4 font-mono text-sm leading-relaxed">
            <pre className="m-0 whitespace-pre-wrap break-words text-[#d4d4d4]">
              <code dangerouslySetInnerHTML={{ __html: highlightSyntax(fullCode) }} />
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="m-0 h-[800px] bg-white">
          <iframe
            srcDoc={fullCode}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin"
            title="Preview"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OutputComponent;