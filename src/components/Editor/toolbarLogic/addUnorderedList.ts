export const addUnorderedList = (textAreaRef, markdown, setMarkdown) => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const lines = markdown.split('\n');
      
      let currentLine = 0;
      let charCount = 0;
      for (let i = 0; i < lines.length; i++) {
        // +1 for the newline character
        if (charCount + lines[i].length + 1 > selectionStart) {
          currentLine = i;
          break;
        }
        charCount += lines[i].length + 1;
      }
  
      lines[currentLine] = '- ' + lines[currentLine];

      const newText = lines.join('\n');
      setMarkdown(newText);
  
      // Focus the textarea and set the cursor position
      const newCursorPos = charCount + 2; // 2 for '> '
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  };