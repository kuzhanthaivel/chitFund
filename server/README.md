# ChitFund Server

A Node.js/Express server with TypeScript for managing Chit Fund operations, including user authentication, notes, and transaction management.

## Features

- **User Authentication**
  - User registration and login with JWT
  - Protected routes with token verification
  - User profile management

- **Notes Management**
  - Create and manage chit notes
  - View note details and history

- **Transaction Management**
  - Record transactions with receipt numbers
  - Track amounts and totals
  - View transaction history

- **API Documentation**
  - Swagger UI for API documentation
  - Available at `/api-docs` when server is running

## Tech Stack

### Core Technologies
- **Runtime**: [Node.js](https://nodejs.org/) (v14 or higher)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v4.9+)
- **Package Manager**: npm or yarn

### Backend Framework
- **Web Framework**: [Express.js](https://expressjs.com/) (v5.x)
  - Lightweight and fast web framework for Node.js
  - Handles HTTP requests and routing

### Database
- **Database**: [SQLite](https://www.sqlite.org/index.html)
  - Serverless, self-contained database
  - Zero-configuration required
  - Single file storage

### ORM
- **ORM**: [Sequelize](https://sequelize.org/) (v6.x)
  - Promise-based Node.js ORM
  - Supports transactions, relations, and more
  - Database schema migrations

### Authentication
- **JWT**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - Secure token-based authentication
  - Stateless server-side sessions
  - Token expiration and refresh mechanism

### API Documentation
- **Swagger UI**: [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
  - Interactive API documentation
  - Request/response schemas
  - Try-it-out functionality

### Development Tools
- **Build Tool**: [TypeScript Compiler](https://www.typescriptlang.org/)
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Code Quality**: ESLint (with TypeScript support)
- **Development Server**: [Nodemon](https://nodemon.io/) for auto-reloading

### Security
- **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **CORS**: [cors](https://www.npmjs.com/package/cors) middleware
- **Input Validation**: Express middleware

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript (installed as dev dependency)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd chitFund/server
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the `src` directory with the following variables:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=sqlite:./database.sqlite
```

### 4. Database Setup

The application uses SQLite with Sequelize ORM. The database will be automatically created when you start the server.

### 5. Start the Development Server

```bash
# Development mode with hot-reload
npm run dev

# Build and start production server
npm run build
npm start
```

The server will be running at `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token
- `GET /api/auth/user` - Get current user data (protected)

### Notes

- `POST /api/note/add` - Create a new chit note (protected)
- `GET /api/note/view` - View all notes (protected)

### Transactions

- `POST /api/transaction/add` - Add a new transaction (protected)
- `GET /api/transaction/view` - View all transactions (protected)

## API Documentation

For detailed API documentation with request/response examples, visit the Swagger UI at:

```
http://localhost:5000/api-docs
```

## Database Schema

### Users Table
Stores user account information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| username | STRING | NOT NULL, UNIQUE | User's login name |
| password | STRING | NOT NULL | Hashed password |
| phone | STRING | NOT NULL, UNIQUE | User's phone number |
| profilePic | STRING | NULLABLE | URL to user's profile picture |
| createdAt | DATE | NOT NULL | Timestamp of record creation |
| updatedAt | DATE | NOT NULL | Timestamp of last update |

### ChitNotes Table
Manages chit fund notes and related information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique note identifier |
| Date | DATE | NOT NULL | Date of the note |
| NoteName | STRING | NOT NULL | Name/title of the note |
| Discribtion | STRING | NOT NULL | Detailed description of the note |
| userId | INTEGER | FOREIGN KEY | Reference to Users.id |
| createdAt | DATE | NOT NULL | Timestamp of record creation |
| updatedAt | DATE | NOT NULL | Timestamp of last update |

### Transactions Table
Tracks all financial transactions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique transaction identifier |
| Date | DATE | NOT NULL | Transaction date |
| ReceiptNo | INTEGER | NOT NULL, UNIQUE | Receipt number |
| Amount | INTEGER | NOT NULL | Transaction amount |
| TotalAmount | INTEGER | NOT NULL | Total amount including any calculations |
| Total | INTEGER | NULLABLE | Running total or calculated field |
| createdAt | DATE | NOT NULL | Timestamp of record creation |
| updatedAt | DATE | NOT NULL | Timestamp of last update |

### Relationships
- A User can have multiple ChitNotes (One-to-Many)
- A User can have multiple Transactions (One-to-Many)

## Project Structure

```
src/
├── config/               # Configuration files
│   ├── config.json      # Database configuration
│   └── database.ts      # Database connection
├── controllers/         # Route controllers
│   ├── auth/           # Authentication controllers
│   ├── note/           # Note controllers
│   ├── transaction/    # Transaction controllers
│   └── middlewares/    # Custom middlewares
├── models/             # Database models
│   ├── User.ts         # User model
│   ├── ChitNote.ts     # ChitNote model
│   └── Transaction.ts  # Transaction model
├── routes/             # Route definitions
├── swagger.ts          # Swagger configuration
└── index.ts            # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| JWT_SECRET | Secret key for JWT | - |
| DATABASE_URL | Database connection URL | sqlite:./database.sqlite |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the repository or contact the maintainers.
