from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.chit_note import ChitNote
from models.user import User
from config.database import db

note_bp = Blueprint('notes', __name__)

@note_bp.route('/addNote', methods=['POST'])
@jwt_required()
def create_note():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    if 'note_name' not in data:
        return jsonify({"message": "Note name is required"}), 400
    
    try:
        note = ChitNote(
            note_name=data['note_name'],
            description=data.get('description'),
            user_id=current_user_id,
            date=data.get('date')
        )
        db.session.add(note)
        db.session.commit()
        
        return jsonify({
            "message": "Chit note created successfully",
            "note": note.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@note_bp.route('/viewNote', methods=['GET'])
@jwt_required()
def get_notes():
    current_user_id = get_jwt_identity()
    try:
        notes = ChitNote.query.filter_by(user_id=current_user_id).all()
        
        notes_data = [note.to_dict() for note in notes]
        
        return jsonify({
            "message": "Chit notes retrieved successfully",
            "data": notes_data
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500
@note_bp.route('/<int:note_id>', methods=['GET'])
@jwt_required()
def get_note(note_id):
    current_user_id = get_jwt_identity()
    
    try:
        note = ChitNote.query.filter_by(id=note_id, user_id=current_user_id).first()
        
        if not note:
            return jsonify({"message": "Chit note not found"}), 404
            
        return jsonify({
            "message": "Chit note retrieved successfully",
            "data": note.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@note_bp.route('/<int:note_id>', methods=['PUT'])
@jwt_required()
def update_note(note_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    try:
        note = ChitNote.query.filter_by(id=note_id, user_id=current_user_id).first()
        
        if not note:
            return jsonify({"message": "Chit note not found"}), 404
        
        if 'note_name' in data:
            note.note_name = data['note_name']
        if 'description' in data:
            note.description = data['description']
        if 'date' in data:
            note.date = data['date']
        
        db.session.commit()
        
        return jsonify({
            "message": "Chit note updated successfully",
            "data": note.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@note_bp.route('/<int:note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    current_user_id = get_jwt_identity()
    
    try:
        note = ChitNote.query.filter_by(id=note_id, user_id=current_user_id).first()
        
        if not note:
            return jsonify({"message": "Chit note not found"}), 404
        
        db.session.delete(note)
        db.session.commit()
        
        return jsonify({
            "message": "Chit note deleted successfully"
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
