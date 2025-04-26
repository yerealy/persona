# config.py
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv('1.env')

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY", "MBTI-CHATBOT-SECRET-KEY")


# 현재 파일(프로젝트 루트) 기준으로 .env 경로를 찾는다
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(BASE_DIR, ".env")

# .env 파일 로드
load_dotenv(dotenv_path=env_path)

# 환경변수에서 MySQL 접속 정보 가져오기
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", 3306)  # 기본값 3306
DB_NAME = os.getenv("DB_NAME")

# Flask-SQLAlchemy에서 사용할 DB URI
SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# SQLAlchemy 설정
SQLALCHEMY_TRACK_MODIFICATIONS = False
