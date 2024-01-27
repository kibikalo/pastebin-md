export const addHeading = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  markdown: string,
  setMarkdown: (value: string) => void,
  headingLevel: number,
  setNewCursorPos: (value: number) => void
) => {
    if (textAreaRef.current && headingLevel >= 1 && headingLevel <= 6) {
      const headingPrefix = '#'.repeat(headingLevel) + ' ';
      const { selectionStart} = textAreaRef.current;
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
      const newCursorPos = charCount + headingPrefix.length;
      
      setMarkdown(newText);
      setNewCursorPos(newCursorPos);
    }
  };