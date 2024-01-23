import { useEffect, useState } from 'react';

const useCaretPosition = (textAreaRef) => {
  const [caretPosition, setCaretPosition] = useState({ line: 1, column: 1 });

  const handleCaretPosition = () => {
    if (textAreaRef.current) {
      const caretPos = textAreaRef.current.selectionStart;
      const textLines = textAreaRef.current.value.substr(0, caretPos).split('\n');
      const line = textLines.length;
      const column = textLines.pop().length + 1;
      setCaretPosition({ line, column });
    }
  };

  useEffect(() => {
    const textarea = textAreaRef.current;

    const updateCaretPosition = () => {
      handleCaretPosition();
    };

    if (textarea) {
      textarea.addEventListener('input', updateCaretPosition);
      textarea.addEventListener('click', updateCaretPosition);
      textarea.addEventListener('keydown', updateCaretPosition);
      textarea.addEventListener('keydown', updateCaretPosition);
      return () => {
        textarea.removeEventListener('input', updateCaretPosition);
        textarea.removeEventListener('click', updateCaretPosition);
        textarea.removeEventListener('keydown', updateCaretPosition);
        textarea.removeEventListener('keydown', updateCaretPosition);
      };
    }
  }, [textAreaRef]);

  return caretPosition;
};

export default useCaretPosition;