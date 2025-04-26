import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StartScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/questions");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      <motion.div
        style={{ textAlign: "center", maxWidth: "600px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          MBTI 성격유형 검사
        </h1>

        <p
          style={{
            color: "#555555",
            marginBottom: "32px",
            lineHeight: "1.6",
            fontSize: "16px",
          }}
        >
          
          자유로운 대화 속에서 여러분의 성향을 분석합니다. <br />
          답변에 담긴 생각과 표현 방식을 바탕으로,<br />
          정형화된 선택지가 아닌 자연스러운 대화로 나를 이해하는 경험.<br />
          <strong>지금 새로운 방식의 mbti 검사를 시작해보세요!</strong>
        </p>

        <button
          onClick={handleStart}
          style={{
            backgroundColor: "#3B82F6",
            color: "white",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563EB")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3B82F6")}
        >
          테스트 시작하기
        </button>
      </motion.div>
    </div>
  );
};

export default StartScreen;
