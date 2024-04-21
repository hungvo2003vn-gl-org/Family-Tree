// JSONFileInput.js
import React, { useState } from "react";

const JSONFileInput = ({ onFileChange }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        onFileChange(jsonData);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Invalid JSON file. Please select a valid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Select JSON File:
      </label>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errorMessage && <div className="text-red-500 text-xs italic">{errorMessage}</div>}
    </div>
  );
};

export default JSONFileInput;