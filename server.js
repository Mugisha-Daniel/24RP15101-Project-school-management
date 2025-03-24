const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const studentRoutes = require('./src/routes/studentRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const seedDatabase = require('./src/seeders/seed');

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to School Management System API' });
});

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

sequelize.sync().then(async () => {
    console.log('Database synchronized');
    await seedDatabase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Error synchronizing database:', error);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => gracefulShutdown(app));
process.on('SIGINT', () => gracefulShutdown(app));

function gracefulShutdown(server) {
    console.log('Received shutdown signal. Closing server and database connections...');
    server.close(async () => {
        try {
            await sequelize.close();
            console.log('Database connections closed.');
            process.exit(0);
        } catch (err) {
            console.error('Error closing database connections:', err);
            process.exit(1);
        }
    });
}