# services/response_service.py
import anthropic
from config import ANTHROPIC_API_KEY

def get_claude_response(user_message: str) -> str:
    if not ANTHROPIC_API_KEY:
        return "Claude API Key가 설정되지 않았습니다."
    try:
        client = anthropic.Client(api_key=ANTHROPIC_API_KEY)
        
        # 메시지 리스트 구성
        messages = [
            {"role": "user", "content": user_message}
        ]
        
        # Messages API 호출
        response = client.messages.create(
            model="claude-3-7-sonnet-20250219",  
            messages=messages,
            max_tokens=300
        )
        
        # 반환된 결과가 리스트 형태일 경우
        if isinstance(response, list):
            if len(response) > 0 and isinstance(response[0], dict) and "content" in response[0]:
                content_val = response[0]["content"]
                # 만약 content_val이 리스트라면 문자열로 변환
                if isinstance(content_val, list):
                    content_str = " ".join([str(item) for item in content_val])
                else:
                    content_str = content_val
                return content_str.strip()
            else:
                return "응답 형식이 올바르지 않습니다."
        # 객체 형태로 반환된 경우
        elif hasattr(response, "content"):
            content_val = response.content
            if isinstance(content_val, list):
                content_str = " ".join([str(item) for item in content_val])
            else:
                content_str = content_val
            return content_str.strip()
        else:
            return "응답 형식을 알 수 없습니다."
    except Exception as e:
        print("Claude 응답 생성 에러:", e)
        return "응답 생성 중 에러가 발생했습니다."
