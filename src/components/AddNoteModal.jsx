import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNoteModal = ({ onClose, onNoteAdded,refreshMynote }) => {

  const navigate = useNavigate();
  const redirectHomePage = ()=>{
    // navigate('/Home')
    // window.location.reload()
    refreshMynote()
    onClose()
  }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleAddNote = async () => {
    if (!title || !description) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://note-app-backend-igxr.onrender.com/api/addnote",
        { title, description },
        { withCredentials: true }
      );
      refreshMynote()
      setTitle("");
      setDescription("");
      if (res.data.success || res.data.message === "note added successfullly!!!") {
        if (onNoteAdded) onNoteAdded(); // To refresh notes
        
        
      } else {
        setError(res.data.message || "Failed to add note");
      }
    } catch (err) {
      setError("An error occurred while adding the note.");
    }
  };

  return (
    <div className="fixed inset-0   bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a Note</h2>

        {error && <p className="text-green-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        ></textarea>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={()=>{
              handleAddNote();
              
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Add Note
          </button>
          <button
            onClick={redirectHomePage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
