# Chit Fund Management System

A modern web application for managing chit funds, built with React, TypeScript, and Redux Toolkit.

## 🚀 Features

- **User Authentication**
  - Secure login/signup flow
  - JWT token-based authentication
  - Protected routes

- **Chit Fund Management**
  - View chit fund details in grid/table views
  - Add new chit fund entries
  - Search and filter functionality

- **Transaction Management**
  - Record transactions
  - Add notes to transactions
  - View transaction history

- **Responsive Design**
  - Mobile-friendly interface
  - Collapsible sidebar
  - Modern UI with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**
  - React 18 with TypeScript
  - Redux Toolkit for state management
  - React Router for navigation
  - Tailwind CSS for styling
  - Lucide Icons
  - React Hot Toast for notifications

- **Build Tools**
  - Vite (based on project structure)
  - TypeScript
  - ESLint & Prettier

## 📦 Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/       # Reusable UI components
│   ├── AddNotePopUp.tsx
│   ├── AddTransactionPopUp.tsx
│   ├── Button.tsx
│   ├── GridView.tsx
│   ├── Input.tsx
│   ├── SearchBar.tsx
│   ├── SideMenuBar.tsx
│   └── TableView.tsx
├── redux/           # State management
│   ├── authenticationSlice.ts
│   ├── hook.ts
│   ├── popUpSlice.ts
│   └── store.ts
├── screens/         # Page components
│   ├── login.tsx
│   ├── signup.tsx
│   └── Transaction.tsx
├── types/           # TypeScript type definitions
│   └── user.type.ts
├── App.tsx          # Main application component
└── index.tsx        # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd chitFund/client
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `test` - Run tests
- `lint` - Run ESLint
- `format` - Format code with Prettier

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)