"""Security and JWT token generation helpers."""
import hashlib
import hmac
import base64
import json
import time
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
from app.core.config import settings


def get_password_hash(password: str) -> str:
    """Hash password using salt + PBKDF2-HMAC-SHA256 for cross-platform zero-dependency reliability."""
    salt = "hireloop_salt_security_v1"
    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        iterations=100000
    )
    return key.hex()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against hashed password."""
    return hmac.compare_digest(get_password_hash(plain_password), hashed_password)


def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create a signed JWT-compatible token using HMAC-SHA256."""
    to_encode = data.copy()
    now = datetime.now(timezone.utc)
    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": int(expire.timestamp()), "iat": int(now.timestamp())})
    
    # Header
    header = {"alg": "HS256", "typ": "JWT"}
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    
    # Payload
    payload_b64 = base64.urlsafe_b64encode(json.dumps(to_encode).encode()).decode().rstrip("=")
    
    # Signature
    signing_input = f"{header_b64}.{payload_b64}".encode()
    signature = hmac.new(settings.SECRET_KEY.encode(), signing_input, hashlib.sha256).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode().rstrip("=")
    
    return f"{header_b64}.{payload_b64}.{signature_b64}"


def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decode and verify HMAC-SHA256 JWT token."""
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        header_b64, payload_b64, signature_b64 = parts
        
        # Verify signature
        signing_input = f"{header_b64}.{payload_b64}".encode()
        expected_sig = hmac.new(settings.SECRET_KEY.encode(), signing_input, hashlib.sha256).digest()
        
        # Pad signature_b64
        rem = len(signature_b64) % 4
        padded_sig = signature_b64 + ("=" * (4 - rem) if rem else "")
        provided_sig = base64.urlsafe_b64decode(padded_sig.encode())
        
        if not hmac.compare_digest(expected_sig, provided_sig):
            return None
            
        # Decode payload
        rem_p = len(payload_b64) % 4
        padded_payload = payload_b64 + ("=" * (4 - rem_p) if rem_p else "")
        payload = json.loads(base64.urlsafe_b64decode(padded_payload.encode()).decode())
        
        # Check expiration
        if "exp" in payload and payload["exp"] < time.time():
            return None
            
        return payload
    except Exception:
        return None
