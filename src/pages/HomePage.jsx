import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";
import AddNoteModal from "../components/AddNoteModal";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import Card from "../components/Card";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [noteMessage, setNoteMessage] = useState({ message: "", data: {} });
  const { username } = location.state || {};
  const [loading, setLoading] = useState(false);
  const redirectLogin = () => {
    navigate("/");
  };

 const [question, setQuestion] = useState({message: ""});
const [answer, setAnswer] = useState("")
const handleQuestionChange = (e)=>{
  setQuestion((prev)=>({...prev, message: e.target.value}));
  console.log(question.message)
}

const getAnswer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer(""); // Clear previous answer

    try {
      const res = await axios.post('http://localhost:5000/chat', question)

      question.message = "";
      setAnswer(res.data.response)
    } catch (err) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const mynotes = async (e) => {
    //   e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/api/getnote", {
        withCredentials: true,
      });
      console.log(res.data);

      setNoteMessage({
        message: "Notes fetched!",
        data: res.data.notes, // Or format it however you like
      });
    } catch (error) {
      setNoteMessage({
        message: "Error getting notes",
        data: "",
      });
    }
  };
  useEffect(() => {
    mynotes();
  }, []);
  const [logoutmessage, setLogoutmessage] = useState("");
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/logout");
      redirectLogin();
      setLogoutmessage("Logged out!!!");
    } catch (error) {
      setLogoutmessage("failed to logout!!!");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNoteClick = () => {
    setIsModalOpen(true);
    mynotes();
  };
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className="bg-blue-300">
      {/* {mynotes()} */}
      <div className="text-3xl font-semibold text-blue-600 bg-blue-100 px-6 py-3 rounded-2xl shadow-md animate-fade-in-down w-fit mx-auto mt-10">
        Hi {username} 👋
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Your Notes
        </h2>

        <Card data = {noteMessage} refresh = {mynotes} onClick= {()=>{console.log("I am clicked")}}/>
      </div>

      <div>{logoutmessage}</div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200 font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleAddNoteClick}
          className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus size={28} />
        </button>
      </div>

      {isModalOpen && (
        <AddNoteModal
          onClose={handleCloseModal}
          onNoteAdded={mynotes}
          refreshMynote={mynotes} // Refresh notes after adding
        />
      )}
     <div className="max-w-xl mx-auto mt-10 bg-white shadow-2xl rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">AI Assistant</h1>

      <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
        {question.message && (
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-sm">
              {question.message}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center space-x-2 animate-pulse">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          </div>
        ) : (
          answer && (
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg max-w-sm text-gray-800">
                {answer}
              </div>
            </div>
          )
        )}
      </div>

      <form onSubmit={getAnswer} className="flex">
        <input
          type="text"
          value={question.message}
          onChange={handleQuestionChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 rounded-r-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
    </div>
  );
};

export default HomePage;
