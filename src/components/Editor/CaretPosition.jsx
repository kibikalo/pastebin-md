import React from 'react';
import useCaretPosition from './useCaretPosition';

// TODO: add actual caret display
const CaretPosition = ({ textAreaRef }) => {
  return (
    <div className='footer h-[22px] bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400'>
      <div className='flex flex-row justify-end gap-4 px-4 text-sm text-center text-black dark:text-white'>
          <p>Line: 0</p>
          <p>Column: 0</p>
      </div>
    </div>
  );
};

export default CaretPosition;
