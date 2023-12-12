export const handleShiftTab = (event, textAreaRef, markdown, setMarkdown, setNewCursorPos, TAB_SIZE) => {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    const beforeText = markdown.substring(0, selectionStart);
    const selectedText = markdown.substring(selectionStart, selectionEnd);
    const afterText = markdown.substring(selectionEnd);

    let newCursorPos;

    if (selectionStart !== selectionEnd) {
        // Handle Shift + Tab with text selected
        const unindentedText = selectedText.split('\n').map(line => 
            line.startsWith(' '.repeat(TAB_SIZE)) ? line.substring(TAB_SIZE) : line
        ).join('\n');
        const newText = beforeText + unindentedText + afterText;

        setMarkdown(newText);
        newCursorPos = selectionStart + unindentedText.length;
    } else {
        // Handle Shift + Tab with no text selected
        const lineStart = beforeText.lastIndexOf('\n') + 1;
        const line = beforeText.substring(lineStart);
        if (line.startsWith(' '.repeat(TAB_SIZE))) {
            const newText = beforeText.substring(0, lineStart) + line.substring(TAB_SIZE) + afterText;

            setMarkdown(newText);
            newCursorPos = selectionStart - TAB_SIZE;
        }
    }

    setNewCursorPos(newCursorPos);
};