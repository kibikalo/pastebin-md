import React, { FunctionComponent, useEffect } from "react";
import handleFormattingKeys from "./Handle Keys/handleFormattingKeys";

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

    setScrollPercentage: (percentage: number) => void;
    setScrollSource: () => void;
    scrollPercentage: number | null;
    scrollSource: string;
    onEditorScroll: (percentage: number) => void;
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
    setFormattingChanges,
    setScrollPercentage,
    setScrollSource,
    scrollPercentage,
    scrollSource,
    onEditorScroll }) => {
    
    // Handles keys
    const handleKeyDown = (event) => {
        handleFormattingKeys(
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

    // Handle Sync Scroll
    const handleScroll = () => {
        if (textAreaRef.current) {
            const scrollElement = textAreaRef.current;
            const scrollPercent = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);
            console.log("Editor Scroll:", scrollPercent);
            onEditorScroll(scrollPercent);
        }
    };
    
    useEffect(() => {
        console.log(`Effect running in ${scrollSource}, received percentage: ${scrollPercentage}`);
        if (scrollPercentage !== null && textAreaRef.current && scrollSource === 'preview') {
          const scrollElement = textAreaRef.current;
          const newScrollTop = scrollPercentage * (scrollElement.scrollHeight - scrollElement.clientHeight);
          scrollElement.scrollTop = newScrollTop;
          console.log(`Editor set scrollTop to: ${newScrollTop}`);
        }
      }, [scrollPercentage]);

    return (
        <div className="border-r-2 border-light-border dark:border-dark-border">
            <textarea 
                ref={textAreaRef}
                className="box-border w-full h-full py-6 pl-8 pr-4 outline-none resize-none text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background scrollbar-thin scrollbar-thumb-light-active-component scrollbar-track-light-button-back dark:scrollbar-thumb-dark-active-component dark:scrollbar-track-dark-button-back"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
            >
            </textarea>
        </div>
    );
}

export default Editor;