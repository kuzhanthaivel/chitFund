from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.transaction import Transaction
from models.chit_note import ChitNote
from models.user import User
from config.database import db
from datetime import datetime

transaction_bp = Blueprint('transactions', __name__)

@transaction_bp.route('/addTransaction/<int:note_id>', methods=['POST'])
@jwt_required()
def create_transaction(note_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    chit_note_id = note_id
    required_fields = ['receipt_no', 'amount', 'total_amount']
    if not all(field in data for field in required_fields):
        return jsonify({"message": f"Missing required fields. Required: {', '.join(required_fields)}"}), 400
    
    chit_note = ChitNote.query.filter_by(
        id=chit_note_id,
        user_id=current_user_id
    ).first()
    
    if not chit_note:
        return jsonify({"message": "Chit note not found or access denied"}), 404
    
    try:
        transaction = Transaction(
            receipt_no=data['receipt_no'],
            amount=data['amount'],
            total_amount=data['total_amount'],
            total=data.get('total'),
            user_id=current_user_id,
            chit_note_id=chit_note_id,
            date=datetime.fromisoformat(data['date']) if 'date' in data else None
        )
        
        db.session.add(transaction)
        db.session.commit()
        
        return jsonify({
            "message": "Transaction created successfully",
            "data": transaction.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500



@transaction_bp.route('/viewTransaction/<int:note_id>', methods=['GET'])
@jwt_required()
def get_transactions(note_id):
    current_user_id = get_jwt_identity()
    
    try:
        note = ChitNote.query.filter_by(
            id=note_id,
            user_id=current_user_id
        ).first()
        
        if not note:
            return jsonify({"message": "Chit note not found or access denied"}), 404
        
        transactions = Transaction.query.filter_by(
            chit_note_id=note_id,
            user_id=current_user_id
        ).order_by(Transaction.date.desc()).all()
        
        transactions_data = [txn.to_dict() for txn in transactions]
        
        return jsonify({
            "message": "Transactions retrieved successfully",
            "data": transactions_data
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@transaction_bp.route('/<int:transaction_id>', methods=['GET'])
@jwt_required()
def get_transaction(transaction_id):
    current_user_id = get_jwt_identity()
    
    try:
        transaction = Transaction.query.filter_by(
            id=transaction_id,
            user_id=current_user_id
        ).first()
        
        if not transaction:
            return jsonify({"message": "Transaction not found or access denied"}), 404
            
        return jsonify({
            "message": "Transaction retrieved successfully",
            "data": transaction.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@transaction_bp.route('/<int:transaction_id>', methods=['PUT'])
@jwt_required()
def update_transaction(transaction_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    try:
        transaction = Transaction.query.filter_by(
            id=transaction_id,
            user_id=current_user_id
        ).first()
        
        if not transaction:
            return jsonify({"message": "Transaction not found or access denied"}), 404
        
        if 'receipt_no' in data:
            transaction.receipt_no = data['receipt_no']
        if 'amount' in data:
            transaction.amount = data['amount']
        if 'total_amount' in data:
            transaction.total_amount = data['total_amount']
        if 'total' in data:
            transaction.total = data['total']
        if 'date' in data:
            transaction.date = datetime.fromisoformat(data['date'])
        
        db.session.commit()
        
        return jsonify({
            "message": "Transaction updated successfully",
            "data": transaction.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@transaction_bp.route('/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(transaction_id):
    current_user_id = get_jwt_identity()
    
    try:
        transaction = Transaction.query.filter_by(
            id=transaction_id,
            user_id=current_user_id
        ).first()
        
        if not transaction:
            return jsonify({"message": "Transaction not found or access denied"}), 404
        
        db.session.delete(transaction)
        db.session.commit()
        
        return jsonify({
            "message": "Transaction deleted successfully"
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
