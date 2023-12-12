export const handleUndo = (content, setContent, undoStack, setUndoStack, setRedoStack, formattingChanges, setFormattingChanges) => {
    if (Array.isArray(undoStack) && undoStack.length > 0) {
        // Pop the last state from the undo stack
        const { content: prevState, changes } = undoStack.pop();
        setRedoStack((prevStack) => [...prevStack, { content, changes: formattingChanges }]);
        setContent(prevState);
        setUndoStack(undoStack.slice(0, -1));
        setFormattingChanges(changes);
    }
};