export const handleRedo = (content, setContent, redoStack, setUndoStack) => {
    if (Array.isArray(redoStack) && redoStack.length > 0) {
        // Pop the last state from the redo stack
        const nextState = redoStack.pop();
      
        // Push the current content to the undo stack
        setUndoStack((prevStack) => [...prevStack, content]);
      
        // Set the content to the next state
        setContent(nextState);
    }
};