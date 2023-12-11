import React from 'react';

export const addStriketrough = (
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
      // No text selected
      newText = `${beforeText}~~${afterText}`;
      newCursorPos = selectionStart + 1;
    } else {
      // Text Selected
      const selectedText = markdown.substring(selectionStart, selectionEnd);
      newText = `${beforeText}~${selectedText}~${afterText}`;
      newCursorPos = selectionEnd + 2;
    }

    setMarkdown(newText);
    setNewCursorPos(newCursorPos);
  }
};