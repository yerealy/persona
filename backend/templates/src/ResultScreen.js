import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

const MBTI_TYPES = {
  INFP: {
    title: "열정적인 중재자",
    emoji: "🌸",
    description: "상상력이 풍부하고 따뜻한 마음을 지닌 이상주의자입니다. 감정에 민감하고 깊이 있는 인간관계를 추구합니다.",
  },
  // 다른 타입도 후에 추가해놓기
};

const ResultScreen = () => {
  const navigate = useNavigate();
  const mbti = "INFP"; // 테스트용
  const typeInfo = MBTI_TYPES[mbti];
  const shareUrl = "http://localhost:3000";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #f3e5f5, #e1f5fe)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: "30px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
          🎉 당신의 MBTI는...
        </h1>
        <div style={{ fontSize: "50px", marginBottom: "10px" }}>{typeInfo?.emoji}</div>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
          {mbti} - {typeInfo?.title}
        </h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>{typeInfo?.description}</p>

        <button
          onClick={() => navigate("/questions")}
          style={{
            backgroundColor: "#9c27b0",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        >
          다시 해보기
        </button>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
          <FacebookShareButton url={shareUrl} quote={`내 MBTI는 ${mbti}입니다!`}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={`내 MBTI는 ${mbti}입니다!`}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <TelegramShareButton url={shareUrl} title={`내 MBTI는 ${mbti}입니다!`}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>
          <WhatsappShareButton url={shareUrl} title={`내 MBTI는 ${mbti}입니다!`}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <LineShareButton url={shareUrl} title={`내 MBTI는 ${mbti}입니다!`}>
            <LineIcon size={40} round />
          </LineShareButton>
          <EmailShareButton url={shareUrl} subject="내 MBTI 결과!" body={`내 MBTI는 ${mbti}입니다!`}>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
