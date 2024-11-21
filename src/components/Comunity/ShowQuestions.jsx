 export const ShowQuestions = ({ questions }) => {
    return (
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Discussions</h2>
        {questions.map((question) => (
          <div key={question.id} className="p-4 bg-white mb-4 rounded-lg shadow">
            <h3 className="text-md font-semibold">{question.title}</h3>
            <p className="text-sm text-gray-500">
              {question.answers.length} answers
            </p>
            <div className="mt-2">
              {question.answers.map((answer, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-700 bg-gray-100 p-2 rounded mb-2"
                >
                  {answer}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };