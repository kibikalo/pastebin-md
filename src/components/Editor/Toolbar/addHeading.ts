export const addHeading = (textAreaRef, markdown, setMarkdown, headingLevel) => {
    if (textAreaRef.current && headingLevel >= 1 && headingLevel <= 6) {
      const headingPrefix = '#'.repeat(headingLevel) + ' ';
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const lines = markdown.split('\n');
      
      let currentLine = 0;
      let charCount = 0;
      for (let i = 0; i < lines.length; i++) {
        if (charCount + lines[i].length + 1 > selectionStart) {
          currentLine = i;
          break;
        }
        charCount += lines[i].length + 1;
      }
  
      lines[currentLine] = headingPrefix + lines[currentLine];
  
      const newText = lines.join('\n');
      setMarkdown(newText);
  
      // Focus the textarea and set the cursor position
      const newCursorPos = charCount + headingPrefix.length;
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  };