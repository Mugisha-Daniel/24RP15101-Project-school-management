const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const sequelize = require('../config/database');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const teachers = await Teacher.bulkCreate([
            {
                firstName: 'John',
                lastName: 'Smith',
                email: 'john.smith@school.com',
                subject: 'Mathematics',
                phoneNumber: '123-456-7890'
            },
            {
                firstName: 'Sarah',
                lastName: 'Johnson',
                email: 'sarah.johnson@school.com',
                subject: 'English',
                phoneNumber: '123-456-7891'
            },
            {
                firstName: 'Michael',
                lastName: 'Brown',
                email: 'michael.brown@school.com',
                subject: 'Science',
                phoneNumber: '123-456-7892'
            }
        ]);

        const students = await Student.bulkCreate([
            {
                firstName: 'Emma',
                lastName: 'Wilson',
                email: 'emma.wilson@student.com',
                dateOfBirth: '2008-05-15',
                grade: 9
            },
            {
                firstName: 'James',
                lastName: 'Davis',
                email: 'james.davis@student.com',
                dateOfBirth: '2007-08-22',
                grade: 10
            },
            {
                firstName: 'Sophia',
                lastName: 'Martinez',
                email: 'sophia.martinez@student.com',
                dateOfBirth: '2009-03-10',
                grade: 8
            },
            {
                firstName: 'Oliver',
                lastName: 'Anderson',
                email: 'oliver.anderson@student.com',
                dateOfBirth: '2008-11-30',
                grade: 9
            },
            {
                firstName: 'Ava',
                lastName: 'Taylor',
                email: 'ava.taylor@student.com',
                dateOfBirth: '2007-12-05',
                grade: 10
            }
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase;