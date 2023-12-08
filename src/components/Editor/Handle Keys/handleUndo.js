export const handleUndo = (content, setContent, undoStack, setUndoStack, setRedoStack) => {
    if (Array.isArray(undoStack) && undoStack.length > 0) {
        // Pop the last state from the undo stack
        const prevState = undoStack.pop();
    
        // Push the current content to the redo stack
        setRedoStack((prevStack) => [...prevStack, content]);
    
        // Set the content to the previous state
        setContent(prevState);
    
        // Update the undo stack
        setUndoStack(undoStack.slice(0, -1));
    }
};