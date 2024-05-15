from flask import Flask, request, jsonify, abort
import jwt
from datetime import datetime, timedelta
from models import storage

app = Flask(__name__)

SECRET_KEY="e13d15c8879290396492efb62d0a424734fadd0727f19789cf62c206e16c5d2cce065e0f314661d64d083938c1ea7400ac423746e6b57c33ab68a711f1a68d91"
ALGORITHM = "HS256"

def check_token(authorization: str = None):
    if not authorization or not authorization.startswith("Bearer "):
        abort(400, description="Authorization header missing or invalid")
    try:
        token = authorization[7:]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except jwt.JWTError:
        abort(401, description="Invalid token")

    # Assuming you have a function to get the user by email
    user = storage.get_user_email(email)
    return user

@app.route('/token_check/', methods=['GET'])
def client_login():
    authorization = request.headers.get('Authorization')
    user = check_token(authorization)
    return jsonify({"user": user.to_dict()})