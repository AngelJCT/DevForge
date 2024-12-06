'use client';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useActiveCode,
  SandpackConsole,
} from '@codesandbox/sandpack-react';
import { atomDark } from '@codesandbox/sandpack-themes';
import { useState } from 'react';

const CustomPreview = () => {
  const { code } = useActiveCode();
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <SandpackPreview className="flex-1" showNavigator={true} />
      <div className="border-t border-gray-700">
        <button
          onClick={() => setIsConsoleOpen(!isConsoleOpen)}
          className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-gray-700 flex items-center justify-between"
        >
          <span>Console</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${isConsoleOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isConsoleOpen ? 'h-32' : 'h-0'
          } overflow-hidden`}
        >
          <SandpackConsole />
        </div>
      </div>
    </div>
  );
};

export default function CodePlayground({ 
  starterCode, 
  solution,
  dependencies = {},
  template = "react",
  showSolution = true 
}) {
  const [showingSolution, setShowingSolution] = useState(false);
  
  const files = {
    '/App.js': showingSolution ? solution : starterCode,
    '/styles.css': `
      body {
        font-family: sans-serif;
        -webkit-font-smoothing: auto;
        -moz-font-smoothing: auto;
        -moz-osx-font-smoothing: grayscale;
        font-smoothing: auto;
        text-rendering: optimizeLegibility;
        font-smooth: always;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }
      
      h1 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
    `,
  };

  const customSetup = {
    dependencies: {
      "@heroicons/react": "^2.0.18",
      "date-fns": "^2.30.0",
      "react-date-range": "^1.4.0",
      ...dependencies
    },
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <SandpackProvider
        theme={atomDark}
        template={template}
        files={files}
        customSetup={customSetup}
        options={{
          externalResources: [
            'https://cdn.tailwindcss.com',
          ],
          visibleFiles: ['/App.js'],
          activeFile: '/App.js',
        }}
      >
        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Interactive Code Editor
          </h3>
          {showSolution && (
            <button
              onClick={() => setShowingSolution(!showingSolution)}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showingSolution ? 'Show Starter Code' : 'Show Solution'}
            </button>
          )}
        </div>
        <SandpackLayout>
          <SandpackCodeEditor 
            showTabs={false}
            showLineNumbers={true}
            showInlineErrors={true}
            wrapContent={true}
            className="h-[400px]"
          />
          <CustomPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
