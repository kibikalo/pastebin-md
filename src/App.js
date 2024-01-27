import React, { useRef, useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Editor from './components/Editor/Editor.tsx';
import Preview from './components/Editor/Preview.tsx';
import Toolbar from './components/Editor/Toolbar.tsx';
import PasteView from './components/Editor/PasteView.jsx';
import { addBold } from './components/Editor/Toolbar/addBold.ts';
import { addItalic } from './components/Editor/Toolbar/addItalic.ts';
import { addHeading } from './components/Editor/Toolbar/addHeading.ts';
import { addQuote } from './components/Editor/Toolbar/addQuote.ts';
import { addUnorderedList } from './components/Editor/Toolbar/addUnorderedList.ts';
import { addOrderedList } from './components/Editor/Toolbar/addOrderedList.ts';
import { addStriketrough } from './components/Editor/Toolbar/addStrkitrough.ts';
import { addCodeBlock } from './components/Editor/Toolbar/addCodeBlock.ts';
import { addLink } from './components/Editor/Toolbar/addLink.ts';
import { addImage } from './components/Editor/Toolbar/addImage.ts';
import CaretPosition from './components/Editor/CaretPosition.jsx';


function App() {
  // State for the markdown content
  const [markdown, setMarkdown] = useState("");

  // State for formatting features
  const textAreaRef = React.createRef(null);
  const [newCursorPos, setNewCursorPos] = useState(null);

  // State for Sync Scroll feature
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [scrollSource, setScrollSource] = useState(''); // 'editor' or 'preview'

  // Undo / Redo feature
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [formattingChanges, setFormattingChanges] = useState([]);

  // State for Paste Menu visibilitie
  const [showPasteModal, setShowPasteModal] = useState(false);

  // Text by default in editor view
  useEffect(() => {
    fetch('/byDefault.txt')
        .then(response => response.text())
        .then(text => setMarkdown(text))
        .catch(error => console.error('Error fetching default content:', error));
}, []);

  const updateContent = (markdown, newFormattingChanges) => {
    setMarkdown(markdown);
    setFormattingChanges(newFormattingChanges);
  }

  // Function to update scroll source to 'editor'
  const handleEditorScroll = (percentage) => {
    setScrollSource('editor');
    setScrollPercentage(percentage);
  };

  // Function to update scroll source to 'preview'
  const handlePreviewScroll = (percentage) => {
    setScrollSource('preview');
    setScrollPercentage(percentage);
  };

  // Formatting features handlers
  const handleBoldButton = () => { addBold(textAreaRef, markdown, setMarkdown, setNewCursorPos); };
  const handleItalicButton = () => { addItalic(textAreaRef, markdown, setMarkdown, setNewCursorPos); }
  const handleStriketroughButton = () => { addStriketrough(textAreaRef, markdown, setMarkdown, setNewCursorPos); }
  const handleQuoteButton = () => { addQuote(textAreaRef, markdown, setMarkdown, setNewCursorPos); }
  const handleCodeButton = () => { addCodeBlock(textAreaRef, markdown, setMarkdown, setNewCursorPos) }
  const handleUnorderedList = () => { addUnorderedList(textAreaRef, markdown, setMarkdown, setNewCursorPos); }
  const handleOrderedList = () => { addOrderedList(textAreaRef, markdown, setMarkdown, setNewCursorPos); }
  const handleHeadingButton = (level) => { addHeading(textAreaRef, markdown, setMarkdown, level, setNewCursorPos); }
  const handleInsertLink = () => { addLink(textAreaRef, markdown, setMarkdown, setNewCursorPos) }
  const hdndaleInsertImage = () => { addImage(textAreaRef, markdown, setMarkdown, setNewCursorPos) }

  return (
    // <Router>
    //   <Routes>
    //     {/* Route for creating new pastes */}
    //     <Route path='/' element= {
          <div className='flex flex-col w-full h-screen'>

            <Toolbar
                      boldButtonAction={handleBoldButton}
                      italicButtonAction={handleItalicButton}
                      striketroughAction={handleStriketroughButton}
                      quoteButtonAction={handleQuoteButton}
                      codeButtonAction={handleCodeButton}
                      unorderedListButtonAction={handleUnorderedList}
                      orderedListButtonAction={handleOrderedList}
                      headingButtonAction={handleHeadingButton}
                      insertLinkButtonAction={handleInsertLink}
                      insertImageButtonAction={hdndaleInsertImage}
            />
      
            {/* Main content area for editor and preview */}
            <div className='grid flex-grow grid-cols-1 sm:grid-cols-2'>
              <Editor markdown={markdown} 
                      setMarkdown={(markdown, newFormattingChanges) => updateContent(markdown, newFormattingChanges)} 
                      textAreaRef={textAreaRef}

                      undoStack={undoStack}
                      setUndoStack={setUndoStack}
                      redoStack={redoStack}
                      setRedoStack={setRedoStack}

                      newCursorPos={newCursorPos}
                      setNewCursorPos={setNewCursorPos}

                      formattingChanges={formattingChanges}
                      setFormattingChanges={setFormattingChanges}

                      scrollPercentage={scrollPercentage}
                      scrollSource={scrollSource}
                      onEditorScroll={handleEditorScroll}
              />

              <Preview  markdown={markdown}
                        scrollPercentage={scrollPercentage}
                        scrollSource={scrollSource} 
                        onPreviewScroll={handlePreviewScroll}
              />
              
            </div>

            <CaretPosition />

            {/* Settings & Save paste
            <div className='flex'>
              
              
              <ThemeSwitcher />

              <button onClick={() => setShowPasteModal(true)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Save Paste
              </button>

              <PasteSettingsModal isVisible={showPasteModal} 
                                  onClose={() => setShowPasteModal(false)}
                                  markdown={markdown} />
            </div> */}

          </div>
        // }/>

    //     {/* Route for viewing a paste by hash */}
    //     <Route path="/:hash" element={ <PasteView/> } />
        
    //   </Routes>
    // </Router>
  );
}

export default App;
