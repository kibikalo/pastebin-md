import { addBoldText } from './toolbarLogic/addBoldText.ts';
import { addItalicText } from './toolbarLogic/addItalicText.ts';
import { addQuote } from './toolbarLogic/addQuote.ts';
import { addUnorderedList } from './toolbarLogic/addUnorderedList.ts';
import { addOrderedList } from './toolbarLogic/addOrderedList.ts';
import { addHeading } from './toolbarLogic/addHeading.ts';
import { addStriketrough } from './toolbarLogic/addStrkitrough.ts';
import performUndo from './toolbarLogic/undo.js';
import performRedo from './toolbarLogic/redo.js'; 


const handleEditorKeys = (event, textAreaRef, markdown, setMarkdown, content, undoStack, redoStack, setContent, setUndoStack, setRedoStack) => {

    // Hot Keys handling 
    if (event.ctrlKey || event.metaKey) { // metaKey is for MacOS
        switch (event.key.toLowerCase()) {
            case 'b': // Ctrl + B
                event.preventDefault();
                addBoldText(textAreaRef, markdown, setMarkdown);
                break;
            case 'i': // Ctrl + I
                event.preventDefault();
                addItalicText(textAreaRef, markdown, setMarkdown);
                break;
            case 'u': // Ctrl + U
                event.preventDefault();
                addUnorderedList(textAreaRef, markdown, setMarkdown);
                break;
            case 'o': // Ctrl + O
                event.preventDefault();
                addOrderedList(textAreaRef, markdown, setMarkdown);
                break;
            case 'q': // Ctrl + Q
                event.preventDefault();
                addQuote(textAreaRef, markdown, setMarkdown);
                break;
            case 's': // Ctrl + S
                event.preventDefault();
                addStriketrough(textAreaRef, markdown, setMarkdown);
                break;
            default:
                break;
        }
        
        // Ctrl + 1 to Ctrl + 6 key handling for Headings
        if (event.key >= '1' && event.key <= '6') {
            event.preventDefault();
            const headingLevel = parseInt(event.key, 10);
            addHeading(textAreaRef, markdown, setMarkdown, headingLevel);
        }
    }

    // Undo / Redo
    const isUndoKey = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z';
    const isRedoKey = (event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'z';

    if (isUndoKey) {
      // Ctrl + Z (Windows) or Command + Z (macOS) for undo
      performUndo(markdown, setMarkdown, undoStack, setUndoStack, setRedoStack);
    } else if (isRedoKey) {
      // Ctrl + Shift + Z (Windows) or Command + Shift + Z (macOS) for redo
      performRedo(markdown, setMarkdown, undoStack, redoStack, setUndoStack, setRedoStack);
    }

    // 'Enter' key handling for automatic list continuation
    if (event.key === 'Enter' && textAreaRef.current) {
        const { selectionStart } = textAreaRef.current;
        const lines = markdown.split('\n');
        let currentLine = markdown.substring(0, selectionStart).split('\n').length - 1;

        if (lines[currentLine].startsWith('- ')) {
            // Check if current list item is empty (only contains '- ')
            if (lines[currentLine].trim() === '-') {
                // Replace current line with empty line
                lines[currentLine] = '';
            } else {
                // Continue with new unordered list item
                lines.splice(currentLine + 1, 0, '- ');
            }
            event.preventDefault();
            const newText = lines.join('\n');
            setMarkdown(newText);
        } else if (lines[currentLine].match(/^\d+\.\s/)) {
            // Check if current list item is empty (only contains '1. ')
            const numberMatch = lines[currentLine].match(/^(\d+)\.\s/);
            if (numberMatch && lines[currentLine].trim() === `${numberMatch[1]}.`) {
                // Replace current line with empty line
                lines[currentLine] = '';
            } else {
                // Continue with new ordered list item
                const number = numberMatch ? parseInt(numberMatch[1], 10) + 1 : 1;
                lines.splice(currentLine + 1, 0, `${number}. `);
            }
            event.preventDefault();
            const newText = lines.join('\n');
            setMarkdown(newText);
        }
    }
};

export default handleEditorKeys;