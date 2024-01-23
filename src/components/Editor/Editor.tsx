import React, { FunctionComponent, useEffect } from "react";
import handleEditorKeys from "./Handle Keys/handleEditorKeys";

interface EditorProps {
    textAreaRef: React.RefObject<HTMLTextAreaElement>;

    markdown: string;
    setMarkdown: (markdown: string) => void;
    undoStack: string[];
    setUndoStack: (stack: string[]) => void;
    redoStack: string[];
    setRedoStack: (stack: string[]) => void;

    newCursorPos: number | null;
    setNewCursorPos: (pos: number | null) => void;

    formattingChanges: string[];
    setFormattingChanges: (stack: string[]) => void;
}

const Editor: FunctionComponent<EditorProps> = ({ 
    markdown,
    setMarkdown,
    textAreaRef,
    undoStack,
    redoStack,
    setUndoStack,
    setRedoStack,
    newCursorPos,
    setNewCursorPos,
    formattingChanges,
    setFormattingChanges }) => {
    
    // Handles keys
    const handleKeyDown = (event) => {
        handleEditorKeys(
            event,
            textAreaRef,
            markdown,
            setMarkdown,
            undoStack,
            setUndoStack,
            redoStack,
            setRedoStack,
            setNewCursorPos,
            formattingChanges,
            setFormattingChanges);
    };

    // Used to set caret(cursor) position for formatting features
    useEffect(() => {
        if (newCursorPos !== null && textAreaRef.current) {
          textAreaRef.current.focus();
          textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
          setNewCursorPos(null); // Reset the cursor position state
        }
      }, [markdown, newCursorPos]);

    return (
        <div className="border-r-2 border-light-border dark:border-dark-border">
            <textarea 
                ref={textAreaRef}
                className="box-border w-full h-full py-6 pl-8 pr-4 outline-none resize-none text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background scrollbar-thin"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                onKeyDown={handleKeyDown}
            >
            </textarea>
        </div>
    );
}

export default Editor;