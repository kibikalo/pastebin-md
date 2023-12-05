import React, { useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Editor from './components/Editor/Editor.tsx';
import Preview from './components/Editor/Preview.tsx';
import Toolbar from './components/Editor/Toolbar.tsx';
import PasteView from './components/Editor/PasteView.jsx';
import ThemeSwitcher from './components/Buttons/ThemeSwitcher.jsx';
import { addBoldText } from './components/Editor/toolbarLogic/addBoldText.ts';
import { addItalicText } from './components/Editor/toolbarLogic/addItalicText.ts';
import { addHeading } from './components/Editor/toolbarLogic/addHeading.ts';
import { addQuote } from './components/Editor/toolbarLogic/addQuote.ts';
import PasteSettingsModal from './components/Paste/PasteSettingsModal.jsx';
import { addUnorderedList } from './components/Editor/toolbarLogic/addUnorderedList.ts';
import { addOrderedList } from './components/Editor/toolbarLogic/addOrderedList.ts';


function App() {
  // State for the markdown content
  const [markdown, setMarkdown] = useState('# [Pastebin.md]()\n ```json\n{\n "by": "kibikalo"\n }\n ```\n');

  const textAreaRef = React.createRef(null);

  // State for themes
  const [theme, setTheme] = useState('light');

  // State for Paste Menu visibilitie
  const [showPasteModal, setShowPasteModal] = useState(false);

  const callback = (markdown) => {
    setMarkdown(markdown);
  }

  const handleBoldButton = () => {
    addBoldText(textAreaRef, markdown, setMarkdown);
    console.log('Bold executed');
    console.log(markdown);
  };

  const handleItalicButton = () => {
    addItalicText(textAreaRef, markdown, setMarkdown);
    console.log('Italic executed');
    console.log(markdown);
  };

  const handleStriketroughButton = () => {
    console.log('Underline executed');
  };

  const handleQuoteButton = () => {
    addQuote(textAreaRef, markdown, setMarkdown);
    console.log('Quote executed');
  }

  const handleUnorderedList = () => {
    addUnorderedList(textAreaRef, markdown, setMarkdown);
    console.log('Unordered list executed');
  }

  const handleOrderedList = () => {
    addOrderedList(textAreaRef, markdown, setMarkdown);
    console.log('Ordered list executed');
  }

  const handleHeadingButton = (level) => {
    addHeading(textAreaRef, markdown, setMarkdown, level);
    console.log("Heading " + level + " executed");
  };

  return (
    <Router>
      <Routes>
        {/* Route for creating new pastes */}
        <Route path='/' element= {
          <div className='flex flex-col w-full h-screen px-32 pt-8 bg-gray-800 text-white'>

            <Toolbar  
                      boldButtonAction={handleBoldButton}
                      italicButtonAction={handleItalicButton}
                      quoteButtonAction={handleQuoteButton}
                      unorderedListButtonAction={handleUnorderedList}
                      orderedListButtonAction={handleOrderedList}
                      headingButtonAction={handleHeadingButton}
            />
      
            {/* Main content area for editor and preview */}
            <main className='flex-grow grid grid-cols-1 sm:grid-cols-2 py-3'>
              <Editor markdown={markdown} setMarkdown={callback} textAreaRef={textAreaRef} />
              <Preview markdown={markdown} /> 
            </main>

            {/* Settings & Save paste*/}
            <div className='flex'>
              
              
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
