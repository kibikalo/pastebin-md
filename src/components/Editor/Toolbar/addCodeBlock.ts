import React from 'react';

export const addCodeBlock = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  markdown: string,
  setMarkdown: (value: string) => void,
  setNewCursorPos: (value: number) => void
) => {
  if (textAreaRef.current) {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    const beforeText = markdown.substring(0, selectionStart);
    const afterText = markdown.substring(selectionEnd);

    let newText;
    let newCursorPos;

    if (selectionStart === selectionEnd) {
      // No text selected, insert backticks and place cursor in the middle
      newText = `${beforeText}\n\`\`\`\n\n\`\`\`${afterText}`;
      newCursorPos = selectionStart + 5; // Position cursor between the backticks
    } else {
      // Text selected, wrap it in backticks
      const selectedText = markdown.substring(selectionStart, selectionEnd);
      newText = `${beforeText}\n\`\`\`\n${selectedText}\n\`\`\`${afterText}`;
      newCursorPos = selectionEnd + 6; // Position cursor after the closing backtick
    }

    setMarkdown(newText);
    setNewCursorPos(newCursorPos);
  }
};