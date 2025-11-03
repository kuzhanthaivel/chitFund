import { Sequelize } from 'sequelize';

const dbConfig = {
  database: 'chitfund',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql' as const,
  logging: false,
};

const sequelize = new Sequelize(dbConfig);

async function initializeDatabase() {
  try {
    const tempSequelize = new Sequelize({
      ...dbConfig,
      database: '',
    });

    await tempSequelize.query('CREATE DATABASE IF NOT EXISTS chitfund;');
    console.log('Database checked/created successfully');
    await tempSequelize.close();
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

export { sequelize, initializeDatabase };
