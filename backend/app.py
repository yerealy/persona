# app.py
import os
from flask import Flask, request, send_from_directory, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from models import db, UserAnswerLog
from utils import load_mbti_model, predict_mbti
from flask_cors import CORS
import config
import openai

# Flask 앱 한 번만 생성
app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app, origins=["http://localhost:3000"])

# SQLAlchemy 설정
app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
db.init_app(app)

openai.api_key = "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"
def generate_image(prompt):
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    image_url = respone['data'][0]['url']
    return image_url

# BERT 모델 로딩
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
tokenizer, model = load_mbti_model(MODEL_DIR)

# 테이블 생성 (처음 한 번만)
with app.app_context():
    db.create_all()

@app.route("/predict", methods=["POST"])
def predict():
    answer1 = request.form.get("answer1", "")
    answer2 = request.form.get("answer2", "")
    user_text = f"{answer1} {answer2}"
    
    mbti_type = predict_mbti(model, tokenizer, user_text)
    
    new_log = UserAnswerLog(
        answer1=answer1,
        answer2=answer2,
        predicted_mbti=mbti_type
    )
    db.session.add(new_log)
    db.session.commit()
    
    return f"당신의 MBTI 유형은 <b>{mbti_type}</b> 입니다."

@app.route("/api/chat", methods=["POST"])
def chat_api():
    data = request.get_json()
    message = data.get("message", "")
    
    if not message:
        return jsonify({"reply": "입력된 메시지가 없습니다.", "mbti_guess": None}), 400
    
    mbti_type = predict_mbti(model, tokenizer, message)
    
    new_log = UserAnswerLog(
        answer1=message,
        answer2="",
        predicted_mbti=mbti_type
    )
    db.session.add(new_log)
    db.session.commit()
    
    return jsonify({
        "reply": f"MBTI 예측 결과는 '{mbti_type}' 입니다.",
        "mbti_guess": mbti_type
    })

# 추가: /questions 엔드포인트
@app.route("/questions", methods=["GET"])
def get_questions():
    # 여기에 필요한 로직 구현
    return jsonify({"message": "질문 목록 반환"})

# 새로 추가할 /next_question 엔드포인트
@app.route("/next_question", methods=["POST"])
def next_question():
    data = request.get_json()
    user_answer = data.get('answer')

    # 여기서 '다음 질문' 생성하는 로직 (일단 예시로 고정된 질문 사용)
    next_q = generate_next_question(user_answer)

    # 생성된 질문에 대해 이미지 생성
    image_url = generate_image(next_q)

    return jsonify({
        "question": next_q,
        "image_url": image_url
    })


# 다른 라우트보다 먼저 정의 - /persona 리다이렉트
@app.route('/persona')
@app.route('/persona/')
def persona_root():
    return redirect('/')

# /persona/static/ 경로 처리
@app.route('/persona/static/<path:filename>')
def persona_static(filename):
    return send_from_directory(app.static_folder, filename)

# 그 외 /persona/ 경로 처리
@app.route('/persona/<path:path>')
def persona_path(path):
    # manifest.json 파일 처리
    if path == "manifest.json":
        return send_from_directory(app.static_folder, "manifest.json")
    # 나머지는 index.html로
    return send_from_directory(app.static_folder, "index.html")

# React 정적 파일 제공 라우팅
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    file_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
