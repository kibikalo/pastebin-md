import { useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ThemeSwitcher from './components/Buttons/ThemeSwitcher.jsx';
import Editor from './components/Editor/Editor.tsx';
import PasteView from './components/Editor/PasteView.jsx';
import Preview from './components/Editor/Preview.tsx';
import Toolbar from './components/Editor/Toolbar.jsx';
import { addBoldText } from './components/Editor/toolbarLogic/boldButtonFunction.ts';
import PasteSettingsModal from './components/Paste/PasteSettingsModal.jsx';


function App() {
  // State for the markdown content
  const [markdown, setMarkdown] = useState('# [Pastebin.md]()\n ```json\n{\n "by": "kibikalo"\n }\n ```\n');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // State for themes
  const [theme, setTheme] = useState('light');

  // State for Paste Menu visibilitie
  const [showPasteModal, setShowPasteModal] = useState(false);

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

            {/* Settings & Save paste*/}
            <div className='flex flex-row justify-center gap-2 p-4 bg-gray-700'>
              
              <ThemeSwitcher />

              <button onClick={() => setShowPasteModal(true)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Save Paste
              </button>

              <PasteSettingsModal isVisible={showPasteModal} 
                                  onClose={() => setShowPasteModal(false)}
                                  markdown={markdown} />
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
