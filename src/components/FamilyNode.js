import React, { useState } from "react";
import NodeModal from "./NodeModal.js";

const FamilyNode = ({ 
  node, 
  isRoot, 
  style,
  isSearchingFor,
  handleOpenModal,
  setEditedNode
}) => {
  const { name, yearOfBirth } = node;
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyle = {
    ...style,
    transform: isHovered ? `${style.transform} scale(1.1)` : style.transform
  };

  const handleDetail = () => {
    handleOpenModal()
    setEditedNode(node)
  };


  return (
    <div
      style={hoverStyle}
      className={`p-4 border border-gray-300 rounded-lg shadow-md bg-slate-400 hover:bg-gray-400 transition duration-300 ease-in-out ${isSearchingFor === yearOfBirth.toString() ? ' ring-8 ring-yellow-500 bg-yellow-500' : ''}`}
      onMouseEnter={() => {setIsHovered(true)}}
      onMouseLeave={() => {setIsHovered(false)}}
    >
      <div className="mb-2 flex justify-between">
        <div>
          {node.name.slice(0, 12)}
        </div>
        <div>
          <button 
            className="flex items-center gap-1 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-110"
            onClick={handleDetail}
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path d="M2.75 7.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5zM2.75 11.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5zM2.75 15.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5z"/>
          </svg>
        </button>
        </div>
      </div>
      <div className="mb-2">
        Birthdate: {yearOfBirth}
      </div>
    </div>
  );
};

export default FamilyNode;
