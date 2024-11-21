export const ShowQuestions = ({ questions }) => {
    return (
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">

            {questions.map((question) => (
                <>
                    <div className="p-6 bg-white mb-4 rounded-lg shadow flex" >
                        <div className="w-20 text-end mr-3">
                            <p className="text-sm text-gray-500">0 Votes</p>
                            <p className="text-sm text-gray-500">
                                {question.answers.length} answers
                            </p>
                        </div>
                        <div className="w-3/4">
                            <div key={question.id} >
                                <h3 className="text-md font-semibold">{question.title}</h3>

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
                        </div>
                        <div className="flex justify-end w-3/12 pr-8">
                            <div className="border bg-slate-50 pt-2 pb-2 ps-6 pr-6  rounded-full flex items-center">
                                <div className="mr-2">
                                    <i class="fa-solid fa-eye"></i>
                                </div>
                                <div>
                                    <p >20</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            ))}
        </div>
    );
};