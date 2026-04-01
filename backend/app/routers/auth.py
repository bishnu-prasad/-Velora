from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password, create_access_token
from app.db.database import users_collection

router = APIRouter()

@router.post("/signup")
def signup(user: UserCreate):
    email = user.email.strip().lower()
    password = user.password

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pwd = hash_password(password)

    users_collection.insert_one({
        "email": email,
        "password": hashed_pwd
    })

    return {
        "message": "User registered successfully",
        "email": email
    }


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    email = form_data.username.strip().lower()
    password = form_data.password

    user = users_collection.find_one({"email": email})

    print("LOGIN EMAIL:", email)
    print("USER FOUND:", user)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"sub": email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }