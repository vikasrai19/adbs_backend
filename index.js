const express = require('express')
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const login = require('./utils/login')
const { createAcademicYear } = require('./utils/academic_year')
const { addDesignation } = require('./utils/designation')
const { addBoarding, addBusBoardingPoint } = require('./utils/boarding')
const { addBus } = require('./utils/bus')
const { addStudent, updateStudent } = require('./utils/student')
const { addBusEmployee } = require('./utils/employee')


//const flash = require('connect-flash');
//const session = require('express-session');
//const validator = require('express-validator');

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: false }));
const port = 3000;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'vikas',
  password: 'vikasrai',
  database: 'nittebuscheck'
});

db.connect((err) => {
  if (err) {

    console.log('error ', err.message)
    throw err;
  };
  console.log('MySQL Connected...');
});

//  app.get('/login', (req, res) => {
//   const { email, password } = req.query;


app.post('/web/api/login', (req, res) => login(req, res, db));

app.post('/web/api/addAcademicYear', (req, res) => createAcademicYear(req, res, db));

app.post('/web/api/adddesignation', (req, res) => addDesignation(req, res, db));

app.post('/web/api/addboarding', (req, res) => addBoarding(req, res, db));

//add bus is still on work donot refer this end point
app.post('/web/api/addbus', (req, res) => addBus(req, res, db));

app.post('/web/api/addstudent', (req, res) => addStudent(req, res, db));

app.post('/web/api/busboardingpoints', (req, res) => addBusBoardingPoint(req, res, db));

app.post('/web/api/addbusemployee', (req, res) => addBusEmployee(req, res, db));

app.post('/web/api/updatestudent', (req, res) => updateStudent(req, res, db));





app.post('/web/api/dltstudent', (req, res) => {

});

app.post('/web/api/updatedriver', (req, res) => {
  const { collegeBusEmpId, name, phono, empimg, designation_id } = req.body;
  db.query('SELECT designation_id  FROM designation WHERE designation="driver"', (err, rows) => {
    if (err || rows.length === 0) {
      res.status(400).json({ "message": "Invalid user" });
    } else {
      const userTypeDB = rows[0].designation_id;

      if (userTypeDB !== designation_id) {
        res.status(400).json({ "message": "Invalid user type" });
      } else {
        db.query(
          'UPDATE collegebusemployee SET name=?, phono=?,empimg=? WHERE collegeBusEmpId  = ?',
          [name, phono, empimg, collegeBusEmpId],
          (stuErr, stuRow) => {
            if (stuErr) {
              res.status(400).json({ 'message': stuErr.message });
            } else {
              console.log('Student details updated successfully.');
              res.status(200).json({ 'message': 'Student details updated successfully.' });
            }
          }
        );
      }
    }
  });
});

app.post('/web/api/dltemp', (req, res) => {
  const { collegeBusEmpId, designationId } = req.body;

  db.query('SELECT designation_id FROM designation WHERE designation = "driver"', (err, rows) => {
    if (err || rows.length === 0) {
      res.status(400).json({ "message": "Invalid user" });
    } else {
      const userTypeDB = rows[0].designation_id;

      if (userTypeDB !== designationId) {
        res.status(400).json({ "message": "Invalid user type" });
      } else {
        db.query(
          'DELETE FROM collegebusemployee  WHERE collegeBusEmpId  = ?',
          [collegeBusEmpId],
          (delErr, delResult) => {
            if (delErr) {
              res.status(400).json({ 'message': delErr.message });
            } else if (delResult.affectedRows === 0) {
              res.status(404).json({ 'message': 'college bus employee not found' });
            } else {
              console.log('Student deleted successfully.');
              res.status(200).json({ 'message': 'college bus employee deleted successfully.' });
            }
          }
        );
      }
    }
  });
});


app.get('/web/api/academicyear', (req, res) => {
  db.query('select * from academicyear', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/designation', (req, res) => {
  db.query('select * from designation', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/boardingpoints', (req, res) => {
  db.query('select * from boardingpoints', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/colegebus', (req, res) => {
  db.query('select * from collegebus', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/student', (req, res) => {
  const studentUserType = '4317d1e47f6a45c39dacdad3b8c301f4';
  db.query('select * from users where usertype_id=?', [studentUserType], (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/driver', (req, res) => {
  const driverUserType = '23ecf27394504c9583aebb614ba10510';
  db.query('select * from users where usertype_id=?', [driverUserType], (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/users', (req, res) => {
  db.query('select * from users', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

//dashboard contents
app.get('/web/api/drivercount', (req, res) => {
  const driverUserType = '23ecf27394504c9583aebb614ba10510';
  db.query('select count(usertype_id) as drivers from users where usertype_id=?', [driverUserType], (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/busescount', (req, res) => {
  db.query('select count(collegeBusId) as buses from collegebus', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/studentscount', (req, res) => {
  const studentUserType = '4317d1e47f6a45c39dacdad3b8c301f4';
  db.query('select count(usertype_id) as students from users where usertype_id=?', [studentUserType], (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/boardingpointcount', (req, res) => {
  db.query('select count(BoardingPointid) as points from boardingpoints', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/busemployee', (req, res) => {
  db.query('select * from  collegebusemployee', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})



//end dashboard contents

app.listen(port, () => {
  console.log(`Application started running at http://localhost:${port}`);
})

