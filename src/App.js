import { useState, useRef, useEffect } from 'react';
import Editor from './components/Editor/Editor.tsx';
import Preview from './components/Editor/Preview.tsx';
import TypeButton from './components/Paste/TypeButton.jsx';
import ValueButton from './components/Paste/ValueButton.jsx';
import Checkbox from './components/Paste/BurnOnReading.jsx';
import SaveButton from './components/Paste/SaveButton.jsx';
import PasteView from './components/Editor/PasteView.jsx';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { expirationTypeMapping } from './constants/ExpirationTypeMapping.js';
import { expirationValueMapping } from './constants/ExpirationValueMapping.js';
import Toolbar from './components/Editor/Toolbar.jsx';
import { addBoldText } from './components/Editor/toolbarLogic/boldButtonFunction.ts'
import ThemeSwitcher from './components/Buttons/ThemeSwitcher.jsx'
import SavePasteModal from './components/Paste/SavePasteModal.jsx';


function App() {
  // State for the markdown content
  const [markdown, setMarkdown] = useState('# [Pastebin.md]()\n ```json\n{\n "by": "kibikalo"\n }\n ```\n');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // State for themes
  const [theme, setTheme] = useState('light');

  // State for Paste Menu visibilitie
  const [showPasteModal, setShowPasteModal] = useState(false);

  // State for the Expiration Type selection
  const [expirationType, setExpirationType] = useState('NULL');
  // State for the Expiration Value selection
  const [expirationValue, setExpirationValue] = useState('0');
  // State for the Burn On Reading selection
  const [burnOnReading, setBurnOnReading] = useState(false);

  const callback = (markdown: string) => {
    setMarkdown(markdown);
  }

  const handleBoldButton = () => {
    addBoldText(textAreaRef, markdown, setMarkdown);
    console.log('Bold executed');
  };

  const handleItalicButton = () => {
    console.log('Italic executed');
    // Perform Action 2
  };

  const handleUnderlineButton = () => {
    console.log('Underline executed');
    // Perform Action 3
  };

  // Handler function to update the Expiration Type state
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
      setExpirationType('NULL');
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
    <Router>
      <Routes>
        {/* Route for creating new pastes */}
        <Route path='/' element= {
          <div className='flex flex-col w-full h-screen bg-gray-800 text-white'>

            <Toolbar  
                      boldButtonAction={handleBoldButton}
                      italicButtonAction={handleItalicButton}
                      underlineButtonAction={handleUnderlineButton}
            />
      
            {/* Main content area for editor and preview */}
            <main className='flex-grow grid grid-cols-1 sm:grid-cols-2 px-20   py-3'>
              <Editor markdown={markdown} setMarkdown={callback} textAreaRef={textAreaRef} />
              <Preview markdown={markdown} />
            </main>

            {/* Save bar with buttons contolling paste preferences*/}
            <div className='flex flex-row gap-2 p-4 bg-gray-700'>
              <span>Expiration Type</span>
              <TypeButton 
                          onSelect={handleSelectExpirationType} 
                          selectedValue={Object.keys(expirationTypeMapping).find(key => expirationTypeMapping[key] === expirationType) || 'Select Expiration Type'}/>

              <span>Expiration Value</span>
              <ValueButton  
                            onSelectValue={handleSelectExpirationValue}
                            selectedValue={Object.keys(expirationValueMapping).find(key => expirationValueMapping[key] === expirationValue) || 'Select Expiration Value'}/>
    
              <Checkbox 
                        checked={burnOnReading} 
                        onChange={(e) => handleBurnOnReadingChange(e.target.checked)} />

              <SaveButton 
                          markdown={markdown} 
                          expirationValue={expirationValue}
                          expirationType={expirationType}
                          burnOnReading={burnOnReading} 
                          onSuccess={onSuccess} 
                          onError={onError} />
              
              <ThemeSwitcher />

              <button onClick={() => setShowPasteModal(true)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Save Paste
              </button>

              <SavePasteModal  isVisible={showPasteModal} 
                               onClose={() => setShowPasteModal(false)} />
                          
            </div>

          </div>
        }/>

        {/* Route for viewing a paste by hash */}
        <Route path="/:hash" element={ <PasteView/> } />
      </Routes>
    </Router>
  );
}

export default App;
