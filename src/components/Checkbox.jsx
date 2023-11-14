import React, { useState } from 'react';

const CheckboxComponent = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        id="default-checkbox"
        type="checkbox"
        value={checked}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
      />
      <label htmlFor="default-checkbox" className="text-sm font-medium text-gray-900 dark:text-gray-300">
        Burn On Reading
      </label>
    </div>
  );
};

export default CheckboxComponent;