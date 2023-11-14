import { useState } from 'react';
import Editor from './components/Editor.tsx';
import Preview from './components/Preview.tsx';
import DropdownButton from './components/DropdownButton.jsx';
import ValueButton from './components/ValueButton.jsx';
import Checkbox from './components/Checkbox.jsx';

function App() {
  const storedMarkdown = localStorage.getItem('MARKDOWN');
  const [markdown, setMarkdown] = useState(storedMarkdown ? storedMarkdown : '# Markdown Editor');

  const callback = (markdown: string) => {
    setMarkdown(markdown);
    localStorage.setItem('MARKDOWN', markdown);
  }

  return (
    <div className='flex flex-col w-full h-screen bg-gray-800 text-white'>
    {/* Top bar with buttons */}
    <div className='flex flex-row gap-2 p-4'>
      <DropdownButton />
      <ValueButton />
      <Checkbox />
    </div>

    {/* Main content area for editor and preview */}
    <main className='flex-grow grid grid-cols-1 sm:grid-cols-2'>
      <Editor markdown={markdown} setMarkdown={callback} />
      <Preview markdown={markdown} />
    </main>
  </div>
  );
}

export default App;
