# ChitFund Management System

A full-stack web application for managing chit funds, built with modern web technologies.

## 🌟 Features

### User Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes and role-based access

### Chit Fund Management
- Create and manage chit fund groups
- Track members and their contributions
- View detailed chit fund history

### Transaction Management
- Record and track transactions
- Add notes to transactions
- Generate receipts and reports
- Search and filter functionality

### Responsive Design
- Mobile-friendly interface
- Modern UI with Tailwind CSS
- Interactive components and real-time updates

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT
- **API Documentation**: Swagger UI

## 📁 Project Structure

```
chitFund/
├── client/                 # Frontend application
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── assets/        # Images, icons, etc.
│       ├── components/    # Reusable UI components
│       ├── redux/         # State management
│       ├── screens/       # Page components
│       └── ...
│
└── server/                # Backend server
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   └── ...
    └── ...
```

## 🛠 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chitFund
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   # Create a .env file with required variables
   cp .env.example .env
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   # Create a .env file with API URL
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The API will be available at `http://localhost:5000`
   API documentation (Swagger UI) will be available at `http://localhost:5000/api-docs`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (default Vite port)

## 📚 API Documentation

Interactive API documentation is available at `/api-docs` when the backend server is running. This includes:
- All available endpoints
- Request/response schemas
- Try-it-out functionality

## 🔒 Environment Variables

### Server (.env)
```env
PORT=5000
JWT_SECRET=your_jwt_secret
# Add other environment variables as needed
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by Kuzhanthai