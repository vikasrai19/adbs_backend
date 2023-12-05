/*const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const flash = require('connect-flash');
const session = require('express-session');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Connection setup
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nittibuscheck'
});

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
router.use(flash());

// Login
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/login');
    }

    pool.query('SELECT * FROM student WHERE email = ? AND password = ?', [req.body.email, req.body.password], (error, results, fields) => {
        if (error) {
            throw error;
        }
        if (results.length > 0) {
            req.flash('success', 'Welcome back!');
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Incorrect email or password.');
            res.redirect('/login');
        }
    });
});

module.exports = router;
*/
const mysql = require('mysql');

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nittibuscheck'
});

// Sample data to insert
const busboardingpointData = {
  collegeBusId: "37902748-ffbe-4796-9", // Assuming the collegeBusId you want to insert
  academicyearId: "6bc54b4e-35b2-49e3-964c-f5d11970a685", // Assuming the academicyearId you want to insert
  boardingPointId: "3a976c5d-8835-4918-b373-3511fe837216", // Assuming the boardingPointId you want to insert
  boardingTime: '08:00:00', // Replace with the boarding time you want to insert
  dropTime: '16:00:00' // Replace with the drop time you want to insert
};

// Function to insert data into busboardingpoints table
const insertData = async () => {
  try {
    // Check if the referenced IDs exist in their respective tables before insertion
    const [collegebusExists] = await connection.query('SELECT 1 FROM collegebus WHERE collegeBusId = ?', [busboardingpointData.collegeBusId]);
    const [academicyearExists] = await connection.query('SELECT 1 FROM academicyear WHERE academicyearId = ?', [busboardingpointData.academicyearId]);
    const [boardingpointExists] = await connection.query('SELECT 1 FROM boardingpoints WHERE boardingPointId = ?', [busboardingpointData.boardingPointId]);

    if (!collegebusExists || !academicyearExists || !boardingpointExists) {
      console.error('One or more referenced IDs do not exist in their respective tables.');
      return;
    }

    // Insert query
    const insertQuery = 'INSERT INTO busboardingpoints (collegeBusId, academicyearId, boardingPointId, boardingTime, dropTime) VALUES (?, ?, ?, ?, ?)';

    // Perform the INSERT operation
    const [insertResult] = await connection.query(insertQuery, [
      busboardingpointData.collegeBusId,
      busboardingpointData.academicyearId,
      busboardingpointData.boardingPointId,
      busboardingpointData.boardingTime,
      busboardingpointData.dropTime
    ]);

    console.log('Data inserted successfully:', insertResult);
  } catch (error) {
    console.error('Error inserting data:', error); // Log the error message for debugging
  }finally {
    // Close the connection
    connection.end();
  }
};

// Connect to the database and insert data
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  insertData(); // Call the function to insert data
});

