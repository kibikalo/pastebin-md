// Function to wrap selected text with bold markdown or insert bold markdown
export const addBoldText = (textAreaRef: React.RefObject<HTMLTextAreaElement>, markdown: string, setMarkdown: (value: string) => void) => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const beforeText = markdown.substring(0, selectionStart);
      const selectedText = markdown.substring(selectionStart, selectionEnd);
      const afterText = markdown.substring(selectionEnd);
  
      const newText = selectedText
        ? `${beforeText}**${selectedText}**${afterText}`
        : `${beforeText}**${afterText.substring(0, selectionStart)}**${afterText.substring(selectionStart)}`;
      setMarkdown(newText);
  
      // Set the cursor position after the inserted "**"
      textAreaRef.current.focus();
      const newCursorPos = selectionStart + (selectedText ? 4 : 2);
      textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
};