const crypto = require('crypto')

const addBusEmployee = (req, res, db) => {
  const { collegeBusId, designationId, userId, name, startDate, endDate, phono, currentStatus, empimg,email,password,userTypeId } = req.body;
  console.log(req.body);
  db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
    if (er) {
      res.status(400).json({ "message": "Invalid user" });
    }
    if (rw.length === 0) {
      res.status(400).json({ "message": "Invalid user" });
    } else {
            db.query('select userId from users where email=? OR mobileno=?',[email,password],(err,rw1,f1)=>{
              if(err){
                res.status(400).json({"message":err.message});
              }
              else{
                if (rw1.length>0) {
                  res.status(400).json({ "message": "employee already presented"});
                }
                else{
                const acId = crypto.randomUUID()
                db.query('insert into users (userId,name, mobileno, email, password,userImage, usertype_id) values(?, ?, ?, ?, ?,?, ?)', [acId, name,phono, email, password, empimg, userTypeId], (usrErr, usrRow) => {
                  if(usrErr){
                    res.status(400).json({"message":usrErr.message});
                  }
                  else{
                    const emid = crypto.randomUUID()
                    db.query('INSERT INTO collegebusemployee(collegeBusEmpId,collegeBusId,designationId,startDate,endDate,currentStatus,userId) VALUES (?, ?, ?,?,?,?,?)', [emid,collegeBusId, designationId, startDate, endDate, currentStatus,acId], (emperr, empresult) => {
                      if(emperr){
                        res.status(400).json({"message":emperr.message});
                      }
                      else{
                        res.status(200).json({ "message": "employee inserted successfully"});
                      }


                    })
                  }

                })
                }

              }


            })

      // db.query('SELECT * FROM  collegebusemployee  WHERE collegeBusId = ? OR phono = ?', [collegeBusId, phono], (err, rows) => {
      //   if (err) {
      //     res.status(400).send(err.message);
      //   } else {
      //     if (rows.length > 0) {
      //       console.log("Data already exists");
      //       res.status(400).json({ "message": "Data already exists" });
      //     } else {
      //       const acId = crypto.randomUUID()
      //       // let data = 
      //       db.query('INSERT INTO collegebusemployee(collegeBusEmpId,name,collegeBusId,designationId,startDate,endDate,phono,empimg,currentStatus) VALUES (?, ?, ?,?,?,?,?,?,?)', [acId, name, collegeBusId, designationId, startDate, endDate, phono, empimg, currentStatus], (err, result) => {
      //         // console.log(data)
      //         if (err) {
      //           res.status(400).send(err.message);
      //         } else {
      //           res.status(200).json({ "message": "Data inserted successfully" });
      //         }
      //       });
      //     }
      //   }
      // });
    }
  });
}
const deleteBusEmployee = (req, res, db) => {
  const { collegeBusEmpId, designationId } = req.body;
  console.log(collegeBusEmpId)

  db.query('SELECT designation_id FROM designation WHERE designation = "driver"', (err, rows) => {
    if (err || rows.length === 0) {
      res.status(400).json({ "message": "Invalid user" });
    } else {
      const userTypeDB = rows[0].designation_id;
      const designationId = 'b1832cb0c66246b493d72da60cd206d0'

      let empUserId;

      db.query('select userId from collegebusemployee where collegeBusEmpId = ?', [collegeBusEmpId], (er, rw) => {
        if(er){
          res.status(400).json({message: er.message});
        }else{
          empUserId = rw[0]?.userId
        }
      })

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
              db.query('delete from users where userId = ?', [empUserId], (userEr, userRow) => {
                if(userEr){
                  res.status(400).send({message: userEr.message});
                }  else{
                  console.log('Student deleted successfully.');
                  res.status(200).json({ 'message': 'college bus employee deleted successfully.' });
                }
              })

            }
          }
        );
      }
    }
  });
};

const updateBusEmployee = (req, res) => {
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
};



module.exports = { addBusEmployee, deleteBusEmployee, updateBusEmployee }