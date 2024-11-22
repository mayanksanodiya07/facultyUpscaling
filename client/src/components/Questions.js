function Questions({ question, selectedAnswer, onResponseChange }) {
  const handleSelectChange = (e) => {
    onResponseChange(question.code, e.target.value);
  };

  return (
    <div className="mb-2">
      {/* Question Label */}
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {question.question}
      </label>
      
      {/* Answer Dropdown */}
      <div className="relative">
        <select
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedAnswer}
          onChange={handleSelectChange}
          name={question.code}
        >
          <option>Choose...</option>
          {question.answers.map((answer, index) => (
            <option key={index} value={answer}>
              {answer}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Questions;
