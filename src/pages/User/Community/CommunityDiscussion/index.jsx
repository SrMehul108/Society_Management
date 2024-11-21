import { useState } from "react";
import { AskQuestion } from "../../../../components/Comunity/AskQuestion";
import { ShowQuestions } from "../../../../components/Comunity/ShowQuestions";
import Sidebar from "../../../../components/Comunity/Sidebar";

const CommunityDiscussionPage = () => {
    const [questions, setQuestions] = useState([
    //   { id: 1, title: "What is the capital of France?", answers: ["Paris is the capital of France."] },
    //   { id: 2, title: "How to use React with Tailwind CSS?", answers: ["You can use className to add Tailwind styles."] },
    ]);
  
    const [showAskQuestion, setShowAskQuestion] = useState(false); // Toggle AskQuestion component
    const [activeName, setActiveName] = useState("Community"); // Active name to display in the header
  
    const handleAddQuestion = (title) => {
      const newQuestion = { id: questions.length + 1, title, answers: [] };
      setQuestions([...questions, newQuestion]);
    };
  
    const handleSelectName = (name) => {
      setActiveName(name); // Update the active name in the header
    };
  
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
      
        <Sidebar onSelectName={handleSelectName} />
  
        {/* Main Section */}
        <div className="w-3/4 flex flex-col">
          {/* Header with Active Name and Ask Question Button */}
          <div className="p-6 bg-white border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">{activeName}</h2> {/* Dynamic Header */}
            <button
              onClick={() => setShowAskQuestion(true)}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Ask Question
            </button>
          </div>
  
          {/* Conditional Rendering of Components */}
          {showAskQuestion ? (
            <AskQuestion
              onSubmit={handleAddQuestion}
              onClose={() => setShowAskQuestion(false)}
            />
          ) : (
            <ShowQuestions questions={questions} />
          )}
        </div>
      </div>
    );
  };
  
  export default CommunityDiscussionPage;