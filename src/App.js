import React, { useRef, useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Editor from './components/Editor/Editor.tsx';
import Preview from './components/Editor/Preview.tsx';
import Toolbar from './components/Editor/Toolbar.tsx';
import PasteView from './components/Editor/PasteView.jsx';
import ThemeSwitcher from './components/Buttons/ThemeSwitcher.jsx';
import { addBoldText } from './components/Editor/Toolbar/addBoldText.ts';
import { addItalicText } from './components/Editor/Toolbar/addItalicText.ts';
import { addHeading } from './components/Editor/Toolbar/addHeading.ts';
import { addQuote } from './components/Editor/Toolbar/addQuote.ts';
import PasteSettingsModal from './components/Paste/PasteSettingsModal.jsx';
import { addUnorderedList } from './components/Editor/Toolbar/addUnorderedList.ts';
import { addOrderedList } from './components/Editor/Toolbar/addOrderedList.ts';
import { addStriketrough } from './components/Editor/Toolbar/addStrkitrough.ts';
import { addCodeBlock } from './components/Editor/Toolbar/addCodeBlock.ts';


function App() {
  // State for the markdown content
  const [markdown, setMarkdown] = useState('# [Pastebin.md]()\n ```json\n{\n "by": "kibikalo"\n }\n ```\n');

  const textAreaRef = React.createRef(null);
  const [newCursorPos, setNewCursorPos] = useState(null);

  // Undo / Redo feature
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // State for Paste Menu visibilitie
  const [showPasteModal, setShowPasteModal] = useState(false);

  const callback = (markdown) => {
    setMarkdown(markdown);
  }

  // Function to handle changes in the editor content
  const handleChange = (event) => {
    const newContent = event.target.value;
    // Push the current content to the undo stack
    setUndoStack((prevStack) => [...prevStack, markdown]);
    // Clear the redo stack
    setRedoStack([]);
    // Update the content
    setMarkdown(newContent);
  };

  // Formatting features handlers
  const handleBoldButton = () => { addBoldText(textAreaRef, markdown, setMarkdown, setNewCursorPos); };

  const handleItalicButton = () => { addItalicText(textAreaRef, markdown, setMarkdown, setNewCursorPos); }

  const handleStriketroughButton = () => { addStriketrough(textAreaRef, markdown, setMarkdown, setNewCursorPos); }

  const handleQuoteButton = () => { addQuote(textAreaRef, markdown, setMarkdown); }

  const handleCodeButton = () => { addCodeBlock(textAreaRef, markdown, setMarkdown, setNewCursorPos) }

  const handleUnorderedList = () => { addUnorderedList(textAreaRef, markdown, setMarkdown); }

  const handleOrderedList = () => { addOrderedList(textAreaRef, markdown, setMarkdown); }

  const handleHeadingButton = (level) => { addHeading(textAreaRef, markdown, setMarkdown, level); }

  return (
    <Router>
      <Routes>
        {/* Route for creating new pastes */}
        <Route path='/' element= {
          <div className='flex flex-col w-full h-screen px-32 pt-8 text-white bg-gray-800'>

            <Toolbar  
                      boldButtonAction={handleBoldButton}
                      italicButtonAction={handleItalicButton}
                      striketroughAction={handleStriketroughButton}
                      quoteButtonAction={handleQuoteButton}
                      codeButtonAction={handleCodeButton}
                      unorderedListButtonAction={handleUnorderedList}
                      orderedListButtonAction={handleOrderedList}
                      headingButtonAction={handleHeadingButton}
            />
      
            {/* Main content area for editor and preview */}
            <main className='grid flex-grow grid-cols-1 py-3 sm:grid-cols-2'>
              <Editor markdown={markdown} 
                      setMarkdown={callback} 
                      textAreaRef={textAreaRef}
                      undoStack={undoStack}
                      setUndoStack={setUndoStack}
                      redoStack={redoStack}
                      setRedoStack={setRedoStack}
                      newCursorPos={newCursorPos}
                      setNewCursorPos={setNewCursorPos}
              />

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
