import React from 'react';
import { createPaste } from '../services/apiService.js';

const SaveButton = ({ markdown, expirationValue, expirationType, burnOnReading, onSuccess, onError }) => {
  const handleSaveClick = async () => {
    try {
      console.log("On SaveButton click values: " + "Markdown: " + markdown + "\n Type: " + expirationType + "\n Value: " + expirationValue + "\n Burn On Reading: " + burnOnReading);
      const response = await createPaste(markdown, expirationValue, expirationType.toUpperCase(), burnOnReading);
      onSuccess(response); // Call the onSuccess handler
    } catch (error) {
      onError(error); // Call the onError handler
      console.error(error);
    }
  };

  return (
    <button onClick={handleSaveClick} 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      Save Paste
    </button>
  );
};

export default SaveButton;