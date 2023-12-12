export const handleTab = (event, textAreaRef, markdown, setMarkdown, setNewCursorPos, TAB_SIZE) => {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    const beforeText = markdown.substring(0, selectionStart);
    const selectedText = markdown.substring(selectionStart, selectionEnd);
    const afterText = markdown.substring(selectionEnd);

    let newCursorPos;

    if (selectionStart !== selectionEnd) {
        // Handle Tab with text selected
        const indentedText = selectedText.split('\n').map(line => ' '.repeat(TAB_SIZE) + line).join('\n');
        const newText = beforeText + indentedText + afterText;
        setMarkdown(newText);
        newCursorPos = selectionStart + indentedText.length;
    } else {
        // Handle Tab with no text selected
        const newText = beforeText + ' '.repeat(TAB_SIZE) + afterText;
        setMarkdown(newText);
        newCursorPos = selectionStart + TAB_SIZE;
    }

    setNewCursorPos(newCursorPos)
};