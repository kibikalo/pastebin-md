import { addBold } from '../Toolbar/addBold.ts';
import { addItalic } from '../Toolbar/addItalic.ts';
import { addQuote } from '../Toolbar/addQuote.ts';
import { addUnorderedList } from '../Toolbar/addUnorderedList.ts';
import { addOrderedList } from '../Toolbar/addOrderedList.ts';
import { addHeading } from '../Toolbar/addHeading.ts';
import { addStriketrough } from '../Toolbar/addStrkitrough.ts';
import { handleUndo } from './handleUndo.js';
import { handleRedo } from './handleRedo.js';
import { handleTab } from './handleTab.js';
import { handleShiftTab } from './handleShiftTab.js';
import { handleEnter } from './handleEnter.js'
import { addCodeBlock } from '../Toolbar/addCodeBlock.ts';
import { addLink } from '../Toolbar/addLink.ts';
import { addImage } from '../Toolbar/addImage.ts';

const handleEditorKeys = (event, textAreaRef, markdown, setMarkdown, undoStack, redoStack, setUndoStack, setRedoStack, setNewCursorPos) => {

    // Formatting hot keys handling 
    if (event.ctrlKey || event.metaKey) { // metaKey is for MacOS
        switch (event.key.toLowerCase()) {
            case 'b': // Ctrl + B
                event.preventDefault();
                addBold(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 'i': // Ctrl + I
                event.preventDefault();
                addItalic(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 's': // Ctrl + S
                event.preventDefault();
                addStriketrough(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 'u': // Ctrl + U
                event.preventDefault();
                addUnorderedList(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 'o': // Ctrl + O
                event.preventDefault();
                addOrderedList(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 'q': // Ctrl + Q
                event.preventDefault();
                addQuote(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 'r': // Ctrl + R
                event.preventDefault();
                addCodeBlock(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 'l': // Ctrl + L
                event.preventDefault();
                addLink(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            case 'p': // Ctrl + P
                event.preventDefault();
                addImage(textAreaRef, markdown, setMarkdown, setNewCursorPos);
                break;
            default:
                break;
        }
        
        // Ctrl + 1 to Ctrl + 6 key handling for Headings
        if (event.key >= '1' && event.key <= '6') {
            event.preventDefault();
            const headingLevel = parseInt(event.key, 10);
            addHeading(textAreaRef, markdown, setMarkdown, headingLevel, setNewCursorPos);
        }
    }

    // Undo / Redo
    const isUndoKey = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z';
    const isRedoKey = (event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'z';
    if (isUndoKey) {
      // Ctrl + Z (Windows) or Command + Z (macOS) for undo
      handleUndo(markdown, setMarkdown, undoStack, setUndoStack, setRedoStack);
    } else if (isRedoKey) {
      // Ctrl + Shift + Z (Windows) or Command + Shift + Z (macOS) for redo
      handleRedo(markdown, setMarkdown, undoStack, redoStack, setUndoStack, setRedoStack);
    }

    // Tab / Shift + Tab handling
    const TAB_SIZE = 4;
    const { key, shiftKey } = event;

    if (key === 'Tab') {
        event.preventDefault();
        if (event.shiftKey) {
            handleShiftTab(event, textAreaRef, markdown, setMarkdown, TAB_SIZE);
        } else {
            handleTab(event, textAreaRef, markdown, setMarkdown, TAB_SIZE);
        }
    }

    // 'Enter' key handling for automatic list continuation
    if (event.key === 'Enter' && textAreaRef.current) {
        handleEnter(event, textAreaRef, markdown, setMarkdown);
    }
};

export default handleEditorKeys;