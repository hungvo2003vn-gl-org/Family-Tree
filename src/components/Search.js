import { useState } from "react";

const SearchInput = ({ onSubmit }) => {
    const [birthdate, setBirthdate] = useState('');
  
    const handleChange = (e) => {
      setBirthdate(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(birthdate);
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-4 p-2 border rounded bg-gray-200">
        <label className="block mb-2">Search by Birthdate (YYYY):</label>
        <input
          type="text"
          value={birthdate}
          onChange={handleChange}
          className="border rounded px-2 py-1 mb-2 mr-3"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Search</button>
      </form>
    );
};


export default SearchInput;