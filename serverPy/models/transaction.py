from config.database import db
from models.base_model import BaseModel

class Transaction(BaseModel):
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    receipt_no = db.Column(db.String(100), unique=True, nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    chit_note_id = db.Column(db.Integer, db.ForeignKey('chit_notes.id', ondelete='CASCADE'), nullable=False)
    
    def __init__(self, receipt_no, amount, total_amount, user_id, chit_note_id, total=None, date=None):
        self.receipt_no = receipt_no
        self.amount = amount
        self.total_amount = total_amount
        self.total = total
        self.user_id = user_id
        self.chit_note_id = chit_note_id
        if date:
            self.date = date
    
    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat() if self.date else None,
            'receipt_no': self.receipt_no,
            'amount': float(self.amount) if self.amount is not None else None,
            'total_amount': float(self.total_amount) if self.total_amount is not None else None,
            'total': float(self.total) if self.total is not None else None,
            'user_id': self.user_id,
            'chit_note_id': self.chit_note_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Transaction {self.receipt_no}>'
