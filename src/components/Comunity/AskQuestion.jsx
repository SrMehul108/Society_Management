import React, { useState } from "react";

export const AskQuestion = ({ onSubmit, onClose }) => {
    const [questionTitle, setQuestionTitle] = useState("");
  
    const handleSubmit = () => {
      if (questionTitle.trim() === "") return;
      onSubmit(questionTitle);
      setQuestionTitle("");
      onClose(); // Close the component after submitting
    };
  
    return (
      <div className="p-6 w-full bg-white h-full">
        <h2 className="text-xl font-semibold mb-4">Writing a good question</h2>
        <div className="bg-blue-100 p-4 rounded-md text-sm mb-4">
          <p>
            You're ready to ask a programming-related question and this form will
            help guide you through the process.
          </p>
          <p className="mt-2">**Steps:**</p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Add "tags" which help surface your question to members of the community.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <label className="block text-gray-700 font-medium mb-2">
            Be Spacific and imagine you're asking a question to another person.
          </label>
          <input
            type="text"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            placeholder="e.g. is there an  R function for finding the index of  an element in a vector?"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex mt-4 space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-800"
          >
           Next
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };