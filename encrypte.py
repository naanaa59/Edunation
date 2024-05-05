from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY="e13d15c8879290396492efb62d0a424734fadd0727f19789cf62c206e16c5d2cce065e0f314661d64d083938c1ea7400ac423746e6b57c33ab68a711f1a68d91"
def verify_password(plain_password, hashed_password):
  return pwd_context.verify(plain_password, hashed_password)
    
def hash_password(password):
  return pwd_context.hash(password)
