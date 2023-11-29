import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readPaste } from '../../services/apiService.js';
import Preview from './Editor.tsx';

const PasteView = () => {
  const { hash } = useParams();
  const [pasteContent, setPasteContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPaste = async () => {
      try {
        const response = await readPaste(hash);
        console.log("Response data: \n" + response);

        setPasteContent(response.content);
      } catch (error) {
        setError('Failed to fetch paste.'); // Set an error message in state
        console.error(error);
      }
    };

    
    if (hash && hash.length === 8) { // Hash validation
      loadPaste();                   // API call
    } else {
      setError('Invalid paste hash.'); // TODO: Set an error message if the hash is invalid
    }
  }, [hash]);

  if (error) {
    return <div>{error}</div>; // TODO: 
  }

  console.log("Paste content: \n" + pasteContent);

  const formattedContent = pasteContent.replace(/\\n/g, '\n');
  console.log("Formated content: \n" + formattedContent);

  return (
    <div className='bg-gray-800'>
      <Preview markdown={formattedContent} />
    </div>
  );
};

export default PasteView;