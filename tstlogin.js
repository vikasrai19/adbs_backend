const express = require('express');
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
