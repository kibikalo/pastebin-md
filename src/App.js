import { useState } from 'react';
import Editor from './components/Editor.tsx';
import Preview from './components/Preview.tsx';
import TypeButton from './components/TypeButton.jsx';
import ValueButton from './components/ValueButton.jsx';
import Checkbox from './components/Checkbox.jsx';
import SaveButton from './components/SaveButton.jsx';

function App() {
  // State for the markdown content
  const [markdown, setMarkdown] = useState('# [Pastebin.md]()\n ```diff\n - by @kibikalo\n ```\n ```json\n {\n "created-by": "kibikalo"\n }\n ```\n');
  // State for the Expiration Type selection
  const [expirationType, setExpirationType] = useState('Expiration Type');
  // State for the Expiration Value selection
  const [expirationValue, setExpirationValue] = useState('Expiration Value');
  // State for the Burn On Reading selection
  const [burnOnReading, setBurnOnReading] = useState(false);

  const callback = (markdown: string) => {
    setMarkdown(markdown);
  }

  // Callback function to update the expirationType from DropdownButton
  const handleSelectExpirationType = (value) => {
    if (!burnOnReading) { // Only update if burnOnReading is not checked
      setExpirationType(value);
    }
  };

  // Handler function to update the Expiration Value state
  const handleSelectExpirationValue = (value) => {
    if (!burnOnReading) { // Only update if burnOnReading is not checked
      setExpirationValue(value);
    }
  };

  // Handler function to update the burnOnReading state
  const handleBurnOnReadingChange = (isChecked) => {
    setBurnOnReading(isChecked);
    if (isChecked) {
      setExpirationType('Null');
      setExpirationValue('0');
    }
  };

  // Define the onSuccess handler
  const onSuccess = (response) => {
    alert(`Paste created! URL: http://localhost:8080/${response.hash}`);
  };

  // Define the onError handler 
  const onError = (error) => {
    alert('Failed to create paste: ' + error);
  };

  return (
    <div className='flex flex-col w-full h-screen bg-gray-800 text-white'>
    {/* Top bar with buttons */}
    <div className='flex flex-row gap-2 p-4'>
      <TypeButton onSelect={handleSelectExpirationType} selectedValue={expirationType}/>
      <ValueButton selectedValue={expirationValue} onSelectValue={handleSelectExpirationValue} />
      <Checkbox checked={burnOnReading} onChange={(e) => handleBurnOnReadingChange(e.target.checked)} />
      <SaveButton markdown={markdown} expirationValue={expirationValue} expirationType={expirationType}  burnOnReading={burnOnReading} onSuccess={onSuccess} onError={onError} />
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
