# utils.py
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification


# MBTI 16개 유형 (모델 학습 시 라벨 인덱스 순서와 동일)
MBTI_LABELS = [
   "ISTJ", "ISFJ", "INFJ", "INTJ",
   "ISTP", "ISFP", "INFP", "INTP",
   "ESTP", "ESFP", "ENFP", "ENTP",
   "ESTJ", "ESFJ", "ENFJ", "ENTJ"
]



def load_mbti_model(model_path):
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    return tokenizer, model


def predict_mbti(model, tokenizer, text: str) -> str:
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_idx = logits.argmax(dim=-1).item()
    return MBTI_LABELS[predicted_idx]
