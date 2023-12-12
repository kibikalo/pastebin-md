export const handleRedo = (content, setContent, redoStack, setUndoStack, formattingChanges, setFormattingChanges) => {
    if (Array.isArray(redoStack) && redoStack.length > 0) {
        const { content: nextState, changes } = redoStack.pop();
        setUndoStack((prevStack) => [...prevStack, { content, changes: formattingChanges }]);
        setContent(nextState);
        setFormattingChanges(changes);
    }
};