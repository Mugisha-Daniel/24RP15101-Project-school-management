const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'),
    logging: false,
    retry: {
        max: 5,
        backoffBase: 1000,
        backoffExponent: 1.5
    }
});

// Test the connection and handle errors
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
}

testConnection();

module.exports = sequelize;