# services/mbti_service.py
import pickle
import os

# 모델과 벡터라이저 파일 경로 설정
MODEL_PATH = os.path.join('models', 'svc_model.pkl')
VECTORIZER_PATH = os.path.join('models', 'vectorizer.pkl')

try:
    with open(MODEL_PATH, 'rb') as f:
        svc_model = pickle.load(f)
    with open(VECTORIZER_PATH, 'rb') as f:
        vectorizer = pickle.load(f)
except Exception as e:
    print("모델 로드 에러:", e)
    svc_model = None
    vectorizer = None

def predict_mbti(user_text: str) -> str:
    try:
        if not svc_model or not vectorizer:
            return "모델이 로드되지 않았습니다."
        X = vectorizer.transform([user_text])
        mbti_type = svc_model.predict(X)
        return mbti_type[0]
    except Exception as e:
        print("MBTI 예측 에러:", e)
        return "Unknown"
