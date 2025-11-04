from config.database import db
from models.base_model import BaseModel

class ChitNote(BaseModel):
    __tablename__ = 'chit_notes'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    note_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    transactions = db.relationship('Transaction', backref='chit_note', lazy=True, cascade='all, delete-orphan')
    
    def __init__(self, note_name, user_id, description=None, date=None):
        self.note_name = note_name
        self.user_id = user_id
        self.description = description
        if date:
            self.date = date
    
    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat() if self.date else None,
            'note_name': self.note_name,
            'description': self.description,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<ChitNote {self.note_name}>'
