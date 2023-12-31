import React from 'react';
import { createPaste } from '../../services/apiService.js';

const SaveButton = ({ markdown, expirationValue, expirationType, burnOnReading, onSuccess, onError }) => {
  const handleSaveClick = async () => {
    try {
      const formattedMarkdown = markdown.replace(/\n/g, '\\n');
      console.log("On SaveButton click values: \n" + "Markdown: " + formattedMarkdown + "\n Type: " + expirationType + "\n Value: " + expirationValue + "\n Burn On Reading: " + burnOnReading);
      const response = await createPaste(formattedMarkdown, expirationValue, expirationType, burnOnReading);
      onSuccess(response); // Call the onSuccess handler
    } catch (error) {
      onError(error); // Call the onError handler
      console.error(error);
    }
  };

  return (
    <button onClick={handleSaveClick} 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      Save
    </button>
  );
};

export default SaveButton;