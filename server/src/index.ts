import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import transactionRoutes from './routes/transactionRoutes';
import db from './models/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());  

async function startServer() {
  try {
    await initializeDatabase();
    db.sequelize.sync({ alter: true });

    app.use('/api/auth', authRoutes);
    app.use('/api/note', noteRoutes);
    app.use('/api/transaction', transactionRoutes);


    app.get('/api/', (req, res) => {
      res.send('Hello from TypeScript Server!');
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error : any) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();