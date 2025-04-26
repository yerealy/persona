import React, { useState } from "react";
import { FaSyncAlt, FaPaperPlane } from "react-icons/fa";

const scenarios = [
  {
    questions: [
      {
        id: "space_1",
        question: "당신은 지금 화성에 첫 발을 디딘 승무원입니다. 어떻게 대응하시겠습니까?",
        options: [
          "구조물에 즉시 접근하여 조사한다.",
          "지구 통제 센터에 보고한 후 지시를 기다린다.",
          "원격 탐사 로봇을 보내 먼저 조사한다.",
          "다른 승무원들과 함께 안전한 거리에서 관찰한다.",
        ],
      },
      {
        id: "space_2",
        question: "국제 우주정거장에서 긴급 상황이 발생했습니다. 어떻게 대응하시겠습니까?",
        options: [
          "즉시 지구로 귀환 절차를 시작한다.",
          "승무원 일부를 구명 캡슐에 태워 산소 소비를 줄인다.",
          "우주복을 착용하고 산소 소비를 최소화한다.",
          "가능한 빨리 수리를 시도하면서 비상 프로토콜을 가동한다.",
        ],
      },
    ],
  },
];

const QuestionDisplay = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [userName, setUserName] = useState("사용자");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const changeQuestion = () => {
    let newIndex = Math.floor(Math.random() * scenarios[0].questions.length);
    while (newIndex === currentQuestionIndex) {
      newIndex = Math.floor(Math.random() * scenarios[0].questions.length);
    }
    setCurrentQuestionIndex(newIndex);
    setShowDescription(false); 
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleSubmit = async () => {
    if (answer.trim() === "") return;
  
    try {
      const response = await fetch("http://localhost:5000/api/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }), 
      });
  
      if (response.ok) {
        alert(`답변이 제출되었습니다: ${answer}`);
        setAnswer("");
        onSubmit && onSubmit(answer); 
      } else {
        alert("답변 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버와의 통신 중 문제가 발생했습니다.");
    }
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: "20px", justifyContent: "flex-start", position: "relative" }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {scenarios[0].questions[currentQuestionIndex].question}
        </div>
        <FaSyncAlt style={{ cursor: "pointer" }} onClick={changeQuestion} />
      </div>

      <div onClick={toggleDescription} style={{ cursor: "pointer", color: "#808080", marginTop: "10px", textDecoration: "underline" }}>
        {showDescription ? "설명 숨기기" : "자세한 설명을 보려면 클릭하시오."}
      </div>

      {showDescription &&
        scenarios[0].questions[currentQuestionIndex].options.map((option, index) => (
          <div key={index} style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9", textAlign: "center", maxWidth: "600px" }}>
            {option}
          </div>
        ))}


      <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)", width: "90%", maxWidth: "600px", backgroundColor: "white", padding: "10px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>{userName}</span>
        <input type="text" placeholder="답변을 입력하세요." value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ padding: "5px", fontSize: "14px", width: "60%", border: "1px solid #ccc", borderRadius: "5px" }} />
        <FaPaperPlane style={{ cursor: "pointer" }} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default QuestionDisplay;
