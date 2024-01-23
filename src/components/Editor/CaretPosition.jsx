import React from 'react';
import useCaretPosition from './useCaretPosition';

// TODO: add actual caret display instead of placeholder
const CaretPosition = ({ textAreaRef }) => {
  return (
    <div className='footer h-[22px] bg-light-button-back dark:bg-dark-button-back'>
      <div className='flex flex-row justify-end gap-4 px-4 text-sm text-center text-light-text dark:text-dark-text'>
          <p>Line: 0</p>
          <p>Column: 0</p>
      </div>
    </div>
  );
};

export default CaretPosition;
