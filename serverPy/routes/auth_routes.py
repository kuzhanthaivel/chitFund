from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from config.database import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not all(key in data for key in ['username', 'password', 'phone']):
        return jsonify({"message": "Missing required fields"}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400
    
    if User.query.filter_by(phone=data['phone']).first():
        return jsonify({"message": "Phone number already registered"}), 400
    
    try:
        user = User(
            username=data['username'],
            password=data['password'],
            phone=data['phone']
        )
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            "message": "User registered successfully",
            "user": user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(key in data for key in ['username', 'password']):
        return jsonify({"message": "Missing username or password"}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid username or password"}), 401
    
    access_token = create_access_token(identity=str(user.id), fresh=True,
    additional_claims={'type': 'access'})
    
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    }), 200

@auth_bp.route('/userData', methods=['GET'])
@jwt_required()
def get_user_data():
    try:
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return jsonify({"message": "No user identity found in token"}), 401
            
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"message": "User not found"}), 404
            
        return jsonify({
            "message": "User data retrieved successfully",
            "user": user.to_dict()
        }), 200
        
    except Exception as e:
        print(f"Error in get_user_data: {str(e)}")
        return jsonify({
            "message": "Failed to retrieve user data",
            "error": str(e)
        }), 500
