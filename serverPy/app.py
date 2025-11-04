from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    # Initialize Flask app
    app = Flask(__name__)

    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/chitfund'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

    # Initialize database
    from config.database import db
    db.init_app(app)
    
    # Import models to ensure they are registered with SQLAlchemy
    # These imports are needed for SQLAlchemy to discover the models
    from models.user import User
    from models.chit_note import ChitNote
    from models.transaction import Transaction
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Initialize extensions
    Migrate(app, db)  # No need to store in a variable if not used
    JWTManager(app)    # No need to store in a variable if not used
    CORS(app)

    # Import and register blueprints
    from routes.auth_routes import auth_bp
    from routes.note_routes import note_bp
    from routes.transaction_routes import transaction_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(note_bp, url_prefix='/api/note')
    app.register_blueprint(transaction_bp, url_prefix='/api/transaction')

    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok", "message": "Server is running"}), 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
