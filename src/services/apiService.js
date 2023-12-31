import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const createPaste = async (markdown, expirationValue, expirationTimeType, burnOnReading) => {
  try {
    console.log("On apiService call:  \n" + "Markdown: " + markdown + "\n Type: " + expirationTimeType + "\n Value: " + expirationValue + "\n Burn On Reading: " + burnOnReading);
    const response = await axios.post(`${API_BASE_URL}/`, {
      content: markdown,
      expirationValue: expirationValue,
      expirationTimeType: expirationTimeType,
      burnOnReading: burnOnReading
    });
    return response.data;
  } catch (error) {
    console.error('Error creating paste: ', error);
    throw error;
  }
};

export const readPaste = async (hash) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${hash}`);
    return response.data;
  } catch (error) {
    console.error('Error reading paste: ', error);
    throw error; // Re-throw the error so the calling component can handle it
  }
};
