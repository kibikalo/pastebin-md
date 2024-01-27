export const addOrderedList = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  markdown: string,
  setMarkdown: (value: string) => void,
  setNewCursorPos: (value: number) => void
) => {
    if (textAreaRef.current) {
      const { selectionStart } = textAreaRef.current;
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
  
      lines[currentLine] = '1. ' + lines[currentLine];

      const newText = lines.join('\n');
      const newCursorPos = charCount + 3; // 3 for '1. '

      setMarkdown(newText);
      setNewCursorPos(newCursorPos);
    }
  };