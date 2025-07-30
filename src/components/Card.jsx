import React, { useState } from "react";
import axios from "axios";

const Card = (props) => {
  const [expandedId, setExpandedId] = useState(null);
  const [editableNote, setEditableNote] = useState({});

  const handleExpand = (note) => {
    setExpandedId(note._id);
    setEditableNote({ ...note }); // Copy the clicked note
  };

  const handleCollapse = () => {
    setExpandedId(null);
    setEditableNote({});
  };

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`https://note-app-backend-igxr.onrender.com/api/deleteNote/${noteId}`, {
        withCredentials: true,
      });
      props.refresh();
      handleCollapse();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://note-app-backend-igxr.onrender.com/api/editnote/${editableNote._id}`,
        {
          title: editableNote.title,
          description: editableNote.description,
        },
        { withCredentials: true },
      );
      props.refresh();
      handleCollapse();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {Array.isArray(props.data.data) && props.data.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.data.data.map((note, index) => {
            const isExpanded = expandedId === note._id;

            return (
              <div
                key={note._id || index}
                className={`bg-white shadow-md rounded-2xl p-5 border border-gray-200 transition-all duration-300 ${
                  isExpanded ? "col-span-2 lg:col-span-1 scale-105" : ""
                } cursor-pointer`}
                onClick={() => !isExpanded && handleExpand(note)}
              >
                {isExpanded ? (
                  <>
                    <input
                      type="text"
                      className="w-full font-bold text-xl mb-2 border-b border-gray-300 focus:outline-none"
                      value={editableNote.title}
                      onChange={(e) =>
                        setEditableNote((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                    <textarea
                      className="w-full h-24 resize-none border border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none"
                      value={editableNote.description}
                      onChange={(e) =>
                        setEditableNote((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    ></textarea>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleCollapse}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {note.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-4">
                      {note.description}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">
            {props.data.data?.message || "No notes found"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
