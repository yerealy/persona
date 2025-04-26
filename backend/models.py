# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import func

db = SQLAlchemy()

class UserAnswerLog(db.Model):
    __tablename__ = "user_answer_log"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    answer1 = db.Column(db.String(500))
    answer2 = db.Column(db.String(500))
    predicted_mbti = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<UserAnswerLog id={self.id}, mbti={self.predicted_mbti}>"

