import React, { FunctionComponent, useEffect, useRef } from "react";
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

    scrollPercentage: number | 0;
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

    const SCROLL_TOLERANCE = 0.01; // Represents 1% change

    // Used to set caret(cursor) position for formatting features
    useEffect(() => {
        if (newCursorPos !== null && textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            setNewCursorPos(null); // Reset the cursor position state
        }
    }, [markdown, newCursorPos]);


    // const editorRef = useRef<HTMLTextAreaElement>(null);
    // Handle Sync Scroll   
    const handleScroll = () => {
        if (textAreaRef.current) {
            const scrollElement = textAreaRef.current;
            const scrollPercent = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);

            console.log(`Handle scroll: scrollTop: ${scrollElement.scrollTop}`);
            console.log(`Scroll Height: ${scrollElement.scrollHeight}, clientHeight: ${scrollElement.clientHeight}`);
            console.log(`Scroll Percent: ${scrollPercent}`);
            console.log(scrollSource);
            
            
            onEditorScroll(scrollPercent);
        }
    };
    
    useEffect(() => {
        // console.log(`Effect running in ${scrollSource}, received percentage: ${scrollPercentage}`);
        // if (scrollPercentage === null) {
        //     console.log('Received null scrollPercentage, not setting scrollTop.');
        // }
        
        if (textAreaRef.current && scrollSource === 'preview') {
            const scrollElement = textAreaRef.current;
            const currentScrollPercent = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);
            const newScrollTop = scrollPercentage * (scrollElement.scrollHeight - scrollElement.clientHeight);

            if (Math.abs(currentScrollPercent - scrollPercentage) > SCROLL_TOLERANCE) {
            scrollElement.scrollTop = newScrollTop;
            }

            // console.log(`Attempting to set scrollTop: ${newScrollTop}`);
            // console.log(`scrollHeight: ${scrollElement.scrollHeight}, clientHeight: ${scrollElement.clientHeight}`);
            
            // scrollElement.scrollTop = newScrollTop;
        }
      }, [scrollPercentage, scrollSource]);

    return (
        <div className="border-r-2 border-light-border dark:border-dark-border">
            <textarea 
                ref={textAreaRef}
                className="box-border w-full h-full py-6 pl-10 pr-4 outline-none resize-none text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background scrollbar-thin scrollbar-thumb-light-border scrollbar-track-light-button-back dark:scrollbar-thumb-dark-border dark:scrollbar-track-dark-button-back"
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