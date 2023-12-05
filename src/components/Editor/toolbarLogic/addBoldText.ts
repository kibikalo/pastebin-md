import React from "react";

// Function to wrap selected text with bold markdown or insert bold markdown
export const addBoldText = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  markdown: string,
  setMarkdown: (value: string) => void
) => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const beforeText = markdown.substring(0, selectionStart);
      const afterText = markdown.substring(selectionEnd);

      let newText;
      let newCursorPos;

    if (selectionStart === selectionEnd) {
      // No text selected, insert '**' and place cursor in the middle
      newText = `${beforeText}****${afterText}`;
      newCursorPos = beforeText + 2;
    } else {
      // Text selected, wrap it in '**'
      const selectedText = markdown.substring(selectionStart, selectionEnd);
      newText = `${beforeText}**${selectedText}**${afterText}`;
      newCursorPos = selectionEnd + 2; // Adjust for selection length
    }

    setMarkdown(newText);

    // Update the cursor position
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
    }
};