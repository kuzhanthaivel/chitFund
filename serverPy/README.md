# ChitFund API Documentation

This is the backend API for the ChitFund application, built with Flask and MySQL.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints except `/auth/signup` and `/auth/login` require a valid JWT token in the `Authorization` header.

### Headers
```
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication

#### Register a new user
```
POST /auth/signup
```
**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123",
  "phone": "+1234567890"
}
```

#### Login
```
POST /auth/login
```
**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```
**Response:**
```json
{
  "access_token": "<jwt_token>"
}
```

#### Get current user data
```
GET /auth/userData
```
**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

### Chit Notes

#### Get all notes
```
GET /notes
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 10)
- `search` (optional): Search term to filter notes
- `sort` (optional): Sort field (e.g., `date`, `-date` for descending)

#### Create a new note
```
POST /notes
```
**Request Body:**
```json
{
  "date": "2023-11-04",
  "noteName": "Monthly Meeting",
  "description": "Discussion about monthly collections"
}
```

#### Get a single note
```
GET /notes/<int:note_id>
```

#### Update a note
```
PUT /notes/<int:note_id>
```
**Request Body:**
```json
{
  "noteName": "Updated Note Name",
  "description": "Updated description"
}
```

#### Delete a note
```
DELETE /notes/<int:note_id>
```

### Transactions

#### Get all transactions
```
GET /transactions
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 10)
- `note_id` (optional): Filter by chit note ID
- `start_date` (optional): Filter by start date (YYYY-MM-DD)
- `end_date` (optional): Filter by end date (YYYY-MM-DD)
- `sort` (optional): Sort field (e.g., `date`, `-date` for descending)

#### Create a new transaction
```
POST /transactions
```
**Request Body:**
```json
{
  "date": "2023-11-04",
  "receiptNo": "REC001",
  "amount": 1000.00,
  "totalAmount": 1000.00,
  "chitNoteId": 1
}
```

#### Get a single transaction
```
GET /transactions/<int:transaction_id>
```

#### Update a transaction
```
PUT /transactions/<int:transaction_id>
```
**Request Body:**
```json
{
  "amount": 1200.00,
  "receiptNo": "REC001_UPDATED"
}
```

#### Delete a transaction
```
DELETE /transactions/<int:transaction_id>
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields",
  "message": "Username and password are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The requested resource was not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with the following variables:
```
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
DATABASE_URL=mysql+mysqlconnector://root@localhost:3306/chitfund
```

3. Run the application:
```bash
python app.py
```

## Development

- **Framework**: Flask
- **Database**: MySQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (JSON Web Tokens)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.