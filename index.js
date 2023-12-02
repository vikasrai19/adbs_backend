const express = require('express')
const login = require('./utils/login')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');


//const flash = require('connect-flash');
//const session = require('express-session');
//const validator = require('express-validator');

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: false }));
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nittebuscheck'
   });
   
   db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
   });

  //  app.get('/login', (req, res) => {
  //   const { email, password } = req.query;
  
app.post('/web/api/login', (req, res) => {
    const {email, password} = req.body;
    db.query('SELECT * FROM users u,usertype t WHERE u.usertype_id=t.usertype_id and email = ? AND password = ? and t.usertype="Admin"', [email, password], (err, rows, fields) => {
      if (err) res.status(400).send(err?.message);
   
      if (rows.length > 0) {
        console.log(rows[0].name)
        retData = {
          userId: rows[0].userId,
          usertype:rows[0].usertype_id,
          name: rows[0].name,
          email: rows[0].email,
          mobileNo: rows[0].mobileno,
        }
        res.status(201).send(retData);
      } else {
         res.status(400).send('Invalid credentials. Please try again.');
       }
})
});

/*app.post('/web/api/addac', (req, res) => {
   const {academicyear_id,academicyear, orderNo} = req.body;
   db.query('SELECT * FROM academicyear WHERE academicyear_id= ?,academicyear = ? AND orderNo = ?', [academicyear_id,academicyear, orderNo], (err, rows, fields) => {
    if (err) res.status(400).send(err?.message);
    if (rows.length > 0) {
      console.log("Already Created")}
    else{
      db.query('insert into academicyear(academicyear_id, academicyear,orderNo)values(?,?,?)');
      db.query(sql, [academicyear_id, academicyear, orderNo], (err, result) => {
        if (err) throw err;

        res.status(200).json({ "message": "Data inserted successfully" });
     });
    }
  });


})*/
app.post('/web/api/addAcademicYear', (req, res) => {
  const { academicYear, orderNo, userId } = req.body;

  const acId = crypto.randomUUID()
  db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) =>{
    if(rw.length === 0){
      res.status(400).json({ "message": "Invalid user" });

    }else{
      db.query('SELECT * FROM academicyear WHERE academicyear = ? or orderNo = ?', [academicYear, orderNo], (err, rows, fields) => {
        if (err) {
          res.status(400).send(err.message);
        } else {
          if (rows.length > 0) {
            console.log("Data already exists");
            res.status(200).json({ "message": "Data already exists" });
          } else {
            db.query('INSERT INTO academicyear (academicyear_id, academicyear, orderNo) VALUES (?, ?, ?)', [acId, academicYear, orderNo], (err, result) => {
              if (err) {
                res.status(500).send(err.message);
              } else {
                res.status(200).json({ "message": "Data inserted successfully" });
              }
            });
          }
        }
     });
    }
  })

  
});

 
   




app.post('/web/api/adddesignation', (req, res) => {
  const {designation, orderNo,userId } = req.body;
  const acId = crypto.randomUUID()
  db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) =>{
    if(er){
      res.status(400).json({ "message": "Invalid user" });
    }
    if(rw.length === 0){
      res.status(400).json({ "message": "Invalid user" });
    }else{
      db.query('SELECT * FROM  	designation WHERE designation = ? OR orderNo = ?', [designation, orderNo], (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
        } else {
          if (rows.length > 0) {
            console.log("Data already exists");
            res.status(200).json({ "message": "Data already exists" });
          } else {
            db.query('INSERT INTO designation ( designation_id,designation, orderNo) VALUES (?, ?, ?)', [ 	acId,designation, orderNo], (err, result) => {
              if (err) {
                res.status(400).send(err.message);
              } else {
                res.status(200).json({ "message": "Data inserted successfully" });
              }
            });
          }
        }
     });
    }
  
  
});
})

app.post('/web/api/addboarding', (req, res) => {
  const {BoardingPointName,BoardingPointNo,userId } = req.body;
  const acId = crypto.randomUUID()
  db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) =>{
    if(er){
      res.status(400).json({ "message": "Invalid user" });
    }
    if(rw.length === 0){
      res.status(400).json({ "message": "Invalid user" });
    }else{
         db.query('SELECT * FROM boardingpoints WHERE BoardingPointName = ? OR	BoardingPointNo = ?', [ BoardingPointName,BoardingPointNo], (err, rows) => {
       if (err) {
       res.status(400).send(err.message);
      } else {
              if (rows.length > 0) {
              console.log("Data already exists");
              res.status(200).json({ "message": "Data already exists" });
         }  else {
          db.query('INSERT INTO boardingpoints(BoardingPointid,BoardingPointName,BoardingPointNo) VALUES (?, ?, ?)', [acId,BoardingPointName,BoardingPointNo], (err, result) => {
           if (err) {
             result.status(400).send(err.message);
           } else {
             result.status(200).json({ "message": "Data inserted successfully" });
           }
         });
       }
     }
  });
}
});
})

app.get('/web/api/academicyear', (req, res) => {
  db.query('select * from academicyear', (err, result, fields) => {
    if(err){
      res.status(400).json({
        'message': err.message,
      })
    }else{
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/designation', (req, res) => {
  db.query('select * from designation', (err, result, fields) => {
    if(err){
      res.status(400).json({
        'message': err.message,
      })
    }else{
      res.status(200).json(result)
    }
  })
})

app.get('/web/api/boardingpoints', (req, res) => {
  db.query('select * from boardingpoints', (err, result, fields) => {
    if(err){
      res.status(400).json({
        'message': err.message,
      })
    }else{
      res.status(200).json(result)
    }
  })
})





app.listen(port, () => {
    console.log(`Application started running at http://localhost:${port}`);
})

