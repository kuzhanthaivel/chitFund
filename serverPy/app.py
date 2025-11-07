from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/chitfund'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

    from config.database import db
    db.init_app(app)
    
    from models.user import User
    from models.chit_note import ChitNote
    from models.transaction import Transaction
    
    with app.app_context():
        db.create_all()
    
    Migrate(app, db)  
    JWTManager(app)    
    CORS(app, 
         resources={
             r"/*": {"origins": ["https://chit.phonekadai.com", "http://localhost:3000", "http://192.168.56.1:3000"]}
         },
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    from routes.auth_routes import auth_bp
    from routes.note_routes import note_bp
    from routes.transaction_routes import transaction_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(note_bp, url_prefix='/api/note')
    app.register_blueprint(transaction_bp, url_prefix='/api/transaction')

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok", "message": "Server is running"}), 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
