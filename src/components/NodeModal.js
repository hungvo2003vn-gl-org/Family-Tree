import React, { useState } from "react";

const NodeModal = ({ isOpen, onClose, editedNode, onInputChange, onSave, onAddChild, onAddSpouse }) => {

  const [warning, setWarning] = useState(false)
  const handleWarning = () => {
    setWarning(true)
  };

  const handleCloseWarning = () => {
    setWarning(false)
  }

  return (

    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-auto">
        <div className="bg-white p-6 rounded-lg shadow-md w-1/4">

          <h2 className="text-lg font-semibold mb-4">Edit Node Information</h2>

          {/* id */}
          <div className="mb-4">
            <label htmlFor="id" className="block mb-1">id:</label>
            <input 
              type="text" 
              id="id" 
              name="id" 
              value={editedNode.id} 
              onChange={handleWarning}
              onBlur={handleCloseWarning}
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
            />
            { warning && <span className=" italic text-red-700">Cannot edit Primary key</span>}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={editedNode.name} 
              onChange={onInputChange} 
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
            />
          </div>
          {/* Birthdate */}
          <div className="mb-4">
            <label htmlFor="yearOfBirth" className="block mb-1">Year of Birth:</label>
            <input 
              type="text" 
              id="yearOfBirth" 
              name="yearOfBirth" 
              value={editedNode.yearOfBirth} 
              onChange={onInputChange} 
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
            />
          </div>
          {/* Handle button */}
          <div className="flex justify-between">

            <button 
              onClick={onSave} 
              className="py-2 w-1/3 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Save
            </button>

            <button 
              onClick={onClose} 
              className="py-2 w-1/3 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Cancel
            </button>

          </div>
          {/* Add button */}
          <div className="flex justify-between mt-3">
            <button 
              onClick={onAddChild} 
              className="py-2 w-1/3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Add Child
            </button>
            <button 
              onClick={onAddSpouse} 
              className="py-2 w-1/3 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Add Spouse
            </button>
          </div>

        </div>
      </div>
    )
  );
};

export default NodeModal;
