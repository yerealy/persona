import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionDisplay from "./QuestionDisplay";
import StartScreen from "./StartScreen";
import ResultScreen from "./ResultScreen";

function App() {
  const handleSubmit = (input) => {
    console.log("사용자 입력:", input);
  };

  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route
          path="/questions"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
              <QuestionDisplay onSubmit={handleSubmit} />
            </div>
          }
        />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
