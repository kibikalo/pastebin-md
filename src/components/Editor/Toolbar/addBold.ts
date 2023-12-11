import React from "react";

export const addBold = (
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
      // No text selected, insert '****' and place cursor in the middle
      newText = `${beforeText}****${afterText}`;
      newCursorPos = selectionStart + 2; // Position cursor between the '**'
    } else {
      // Text selected, wrap it in '**'
      const selectedText = markdown.substring(selectionStart, selectionEnd);
      newText = `${beforeText}**${selectedText}**${afterText}`;
      newCursorPos = selectionEnd + 4; // Position cursor after the closing '**'
    }

    setMarkdown(newText);
    setNewCursorPos(newCursorPos);
  }
};
