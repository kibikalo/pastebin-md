import React from 'react';

export const addItalicText = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  markdown: string,
  setMarkdown: (value: string) => void
) => {
  if (textAreaRef.current) {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    const beforeText = markdown.substring(0, selectionStart);
    const selectedText = markdown.substring(selectionStart, selectionEnd);
    const afterText = markdown.substring(selectionEnd);

    const newText = selectedText
      ? `${beforeText}*${selectedText}*${afterText}`
      : `${beforeText}**${afterText}`;
    setMarkdown(newText);

    textAreaRef.current.focus();
    const newCursorPos = selectionStart + (selectedText ? 2 : 1);
    textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
  }
};