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
      console.log(`Selection start: ${selectionStart}, end: ${selectionEnd}`); // Log selection positions


      let newText;
      let newCursorPos;

    if (selectionStart === selectionEnd) {
      // No text selected, insert '**' and place cursor in the middle
      console.log("No text selected"); // Log when no text is selected
      newText = `${beforeText}****${afterText}`;
      newCursorPos = selectionStart + 2;
      console.log(`New cursor position: ${newCursorPos}`); // Log new cursor position

    } else {
      // Text selected, wrap it in '**'
      const selectedText = markdown.substring(selectionStart, selectionEnd);
      newText = `${beforeText}**${selectedText}**${afterText}`;
      newCursorPos = selectionEnd + 4; // Adjust for selection length
    }

    console.log(newCursorPos);
    

    setMarkdown(newText);

    // Update the cursor position
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 10);
  }
};