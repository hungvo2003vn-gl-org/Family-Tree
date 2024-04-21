import React, { useEffect, useState } from "react";

const RawDataDisplay = ({ initialData, defaultData, onSubmit }) => {
  const [editedData, setEditedData] = useState(JSON.stringify(initialData, undefined, 2));

  useEffect(()=> {
    setEditedData(JSON.stringify(initialData, undefined, 2))
  }, [initialData])

  const handleChange = (event) => {
    setEditedData(event.target.value);
  };

  const handleSubmit = () => {
    try {
      const submitData = JSON.parse(editedData)
      onSubmit(submitData);
      alert("Update Tree successfully!")
    } catch (error) {
      alert(`Wrong JSON format or Tree Data Structure
All the id must be unique, all the relationship must be well-structured`)
    }
  };

  const handleSetReset = () => {
    setEditedData(JSON.stringify(initialData ? initialData : defaultData, undefined, 2))
  }

  const handleSetDefault = () => {
    setEditedData(JSON.stringify(defaultData, undefined, 2))
  }

  const handleClear = () => {
    setEditedData('')
  }


  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Raw Data:</h2>
      <textarea
        className="bg-gray-200 p-4 rounded-md w-full"
        value={editedData}
        onChange={handleChange}
        rows={10}
      ></textarea>
      <div>
        <div className="flex justify-between">
          <button
            className="mt-2 w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>

          <button
            className="mt-2 w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        <div className="flex justify-between">
          <button
            className="mt-2 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSetReset}
          >
            Set file
          </button>

          <button
            className="mt-2 w-1/3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSetDefault}
          >
            Default
          </button>
        </div>
      </div>
    
    </div>
  );
};

export default RawDataDisplay;



