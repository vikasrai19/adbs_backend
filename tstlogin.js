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
  database: 'nittebuscheck'
});

// Sample data to insert
const busboardingpointData = {
  collegeBusId: 1, // Assuming the collegeBusId you want to insert
  academicyearId: 2023, // Assuming the academicyearId you want to insert
  boardingPointId: 10, // Assuming the boardingPointId you want to insert
  boardingTime: '08:00:00', // Replace with the boarding time you want to insert
  dropTime: '16:00:00' // Replace with the drop time you want to insert
};

// Insert query
const insertQuery = 'INSERT INTO busboardingpoints (collegeBusId, academicyearId, boardingPointId, boardingTime, dropTime) VALUES (?, ?, ?, ?, ?)';

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Perform the INSERT operation
  connection.query(insertQuery, [
    busboardingpointData.collegeBusId,
    busboardingpointData.academicyearId,
    busboardingpointData.boardingPointId,
    busboardingpointData.boardingTime,
    busboardingpointData.dropTime
  ], (err, results, fields) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully!');
    }

    // Close the connection
    connection.end();
  });
});
