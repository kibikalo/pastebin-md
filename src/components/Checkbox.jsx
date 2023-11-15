import React, { useState } from 'react';

const CheckboxComponent = ({ checked, onChange }) => {

  return (
    <div className="flex items-center space-x-2">
      <input
        id="default-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
      />
      <label htmlFor="default-checkbox" className="text-sm font-medium text-gray-900 dark:text-gray-300">
        Burn On Reading
      </label>
    </div>
  );
};

export default CheckboxComponent;