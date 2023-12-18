const crypto = require('crypto')
const addBus = (req, res, db) => {
    const { busNo, routeNo, regDate, purchaseDate, startingPoint, noOfSeats, userId, busImage } = req.body;
    const acId = crypto.randomUUID()
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (er) {
            res.status(400).json({ "message": "Invalid user" });
        }
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            db.query('SELECT * FROM collegebus WHERE busNo = ? OR routeNo = ?', [busNo, routeNo], (err, rows) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (rows.length > 0) {
                        console.log("Data already exists");
                        res.status(400).json({ "message": "Data already exists" });
                    } else {
                        result = db.query('INSERT INTO collegebus(collegeBusId,busNo,routeNo,regDate,purchaseDate,startingPoint, endingPoint,noOfSeats,busImage) VALUES ( ?, ?, ? , ? ,?, ?, ?, ?, ? )', [acId, busNo, routeNo, regDate, purchaseDate, startingPoint, '', noOfSeats, busImage], (err, result) => {
                            if (err) {
                                res.status(400).send(err.message);
                            } else {
                                res.status(200).json({ "message": "Data inserted successfully" });
                            }
                        });
                        console.log(result)
                    }
                }
            });
        }
    });
}

const updateBus = (req, res, db) => {
    const { collegeBusId, busNo, routeNo, regDate, purchaseDate, startingPoint, noOfSeats, busImage, userId } = req.body;
  
    db.query('SELECT userId FROM Users u, usertype t WHERE u.usertype_id = t.usertype_id AND UserId = ? AND t.usertype = "Admin"', [userId], (errUser, rowsUser, fieldsUser) => {
      if (errUser) {
        res.status(400).json({ "message": "Invalid user" });
      } else if (rowsUser.length === 0) {
        res.status(400).json({ "message": "Invalid user" });
      } else {
        db.query('SELECT * FROM collegebus WHERE collegeBusId = ?', [collegeBusId], (errSelect, rowsSelect) => {
          if (errSelect) {
            res.status(400).send(errSelect.message);
          } else {
            if (rowsSelect.length === 0) {
              res.status(400).json({ "message": "Record not found" });
            } else {
              const updateQuery = 'UPDATE collegebus SET busNo = ?, routeNo = ?, regDate = ?, purchaseDate = ?, startingPoint = ?, noOfSeats = ?, busImage = ? WHERE collegeBusId = ?';
              quer=db.query(updateQuery, [busNo, routeNo, regDate, purchaseDate, startingPoint, noOfSeats, busImage, collegeBusId], (errUpdate, resultUpdate) => {
                if (errUpdate) {
                  res.status(400).send(errUpdate.message);
                } else {
                  res.status(200).json({ "message": "Data updated successfully" });
                }
                console.log(quer)
              });
            }
          }
        });
      }
    });
  };
  

const deleteBus = (req, res, db) => {
    const { collegeBusId, userId } = req.body;
    const acId = crypto.randomUUID()
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (er) {
            res.status(400).json({ "message": "Invalid user" });
        }
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {

            db.query('delete from collegebus where collegeBusId=?', [collegeBusId], (err, result) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    res.status(200).json({ "message": "Data deleted successfully" });
                }
            });
        }
    }
    );
}



module.exports = { addBus, deleteBus,updateBus }