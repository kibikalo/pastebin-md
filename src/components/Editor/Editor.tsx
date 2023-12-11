import React, { FunctionComponent, KeyboardEvent, useEffect } from "react";
import handleEditorKeys from "./Handle Keys/handleEditorKeys";

interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
    undoStack: string[];
    setUndoStack: (stack: string[]) => void;
    redoStack: string[];
    setRedoStack: (stack: string[]) => void;
    
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const Editor: FunctionComponent<EditorProps> = ({ markdown, setMarkdown, textAreaRef, undoStack, redoStack, setUndoStack, setRedoStack, newCursorPos, setNewCursorPos }) => {
    
    // Handles keys
    const handleKeyDown = (event) => {
        handleEditorKeys(event, textAreaRef, markdown, setMarkdown, undoStack, setUndoStack, redoStack, setRedoStack, setNewCursorPos);
    };

    useEffect(() => {
        if (newCursorPos !== null && textAreaRef.current) {
          textAreaRef.current.focus();
          textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
          setNewCursorPos(null); // Reset the cursor position state
        }
      }, [markdown, newCursorPos]); // Depend on markdown and newCursorPos

    return (
        <div className="rounded-l-[20px] bg-gray-600 border-r-2 border-gray-500">
            <textarea 
                ref={textAreaRef}
                className="w-full h-full resize-none outline-none p-6 text-gray-200 box-border rounded-l-[20px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600 bg-gray-600"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                onKeyDown={handleKeyDown}
            >
            </textarea>
        </div>
    );
}

export default Editor;