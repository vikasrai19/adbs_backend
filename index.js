const express = require('express')
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const login = require('./utils/login')
const { createAcademicYear } = require('./utils/academic_year')
const { addDesignation } = require('./utils/designation')
const { addBoarding, addBusBoardingPoint } = require('./utils/boarding')
const { addBus, deleteBus } = require('./utils/bus')
const { addStudent, updateStudent, deleteStudent } = require('./utils/student')
const { addBusEmployee, deleteBusEmployee, updateBusEmployee } = require('./utils/employee')

const { mobileLogin } = require('./utils/mobile_utils/mobile_login')
const { mobileDashboardUser } = require('./utils/mobile_utils/mobile_dashboard')
const { userProfile } = require('./utils/mobile_utils/profile')
const { busDetails } = require('./utils/mobile_utils/bus_details')


//const flash = require('connect-flash');
//const session = require('express-session');
//const validator = require('express-validator');

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: false }));
const port = 3000;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
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

app.post('/web/api/addbus', (req, res) => addBus(req, res, db));
app.post('/web/api/addbusemployee', (req, res) => addBusEmployee(req, res, db));

app.post('/web/api/dltstudent', (req, res) => deleteStudent(req, res, db));

app.post('/web/api/busboardingpoints', (req, res) => addBusBoardingPoint(req, res, db));

app.post('/web/api/addstudent', (req, res) => addStudent(req, res, db));

app.post('/web/api/deleteemployee', (req, res) => deleteBusEmployee(req, res, db));

//add bus is still on work donot refer this end point


app.post('/web/api/updatestudent', (req, res) => updateStudent(req, res, db));
app.post('/web/api/updateemployee', (req, res) => updateBusEmployee(req, res, db));

app.post('/web/api/deletebus', (req, res) => deleteBus(req, res, db));

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

app.get('/web/api/busboardingpoints', (req, res) => {
  db.query('select * from busboardingpoints bpp, boardingPoints bp where bp.boardingPointId = bpp.boardingPointId', (err, result, fields) => {
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
  const designationId = '56d33d7538cd458b83e2279eefba4a1f';
  db.query('select * from users u, collegebusemployee cbe where cbe.userId = u.userId and u.usertype_id=? ', [designationId], (err, result, fields) => {
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

app.get('/web/api/designation', (req, res) => {
  db.query('select * from  designation', (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/usertype', (req, res) => {
  db.query('select * from  usertype', (err, result, fields) => {
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



// Mobile backend contents
app.post('/mobile/api/login', (req, res) => mobileLogin(req, res, db));

app.get('/mobile/api/users/dashboard', (req, res) => mobileDashboardUser(req, res, db));

app.get('/mobile/api/users/profile', (req, res) => userProfile(req, res, db));

app.get('/mobile/api/users/busDetails', (req, res) => busDetails(req, res, db));

app.listen(port, () => {
  console.log(`Application started running at http://localhost:${port}`);
})

//deletebus
//updateemployee
//update admin details

app.get('/web/api/buseview', (req, res) => {
  const{collegeBusId}=req.body;
  db.query('select c.collegeBusId, s.BoardingPointName,b.boardingTime,b.dropTime,c.busNo from boardingpoints s,busboardingpoints b,collegebus c where s.BoardingPointid=b.boardingPointId and s.BoardingPointid=c.startingPoint and c.collegeBusId= ?', [collegeBusId],(err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      })
    } else {
      res.status(200).json(result)
    }
  })
})


app.get('/web/api/empdetails', (req, res) => {
  const{collegeBusEmpId}=req.body;

  db.query('SELECT c.collegeBusEmpId, u.name, u.mobileno, u.userImage, c.designationId FROM collegebusemployee c, users u WHERE u.userId = c.userId AND c.collegeBusEmpId = ?', [collegeBusEmpId], (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      });
    } else {
      res.status(200).json(result);
    }
  });
});

//userImage, name, email, mobileno, password, busNo, userId, usertype_id

app.get('/web/api/studentdetails', (req, res) => {
  const{userId}=req.body;

  db.query('SELECT userId,name, mobileno,email,password,userImage ,usertype_id  FROM users WHERE userId= ?', [userId], (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/web/api/admindetails', (req, res) => {
  const{userId}=req.body;

  db.query('SELECT userId,name,mobileno,email,password,userImage ,usertype_id  FROM users WHERE userId= ? and usertype_id="23ecf27394504c9583aebb614ba10510"', [userId], (err, result, fields) => {
    if (err) {
      res.status(400).json({
        'message': err.message,
      });
    } else {
      res.status(200).json(result);
    }
  });
});

