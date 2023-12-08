const crypto = require('crypto')

const addStudent = (req, res, db) => {
    const { userImage, name, email, mobileno, userId, password, busNo } = req.body;
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (er) {
            res.status(400).json({ "message": "Invalid user" });
        }
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            db.query('select userId from users where email = ?', [email], (userErr, userRows) => {
                if (userErr) {
                    res.status(400).json({ 'message': userErr.message })
                } else {
                    if (userRows.length > 0) {
                        res.status(400).json({ 'message': 'Student already found' })
                    } else {
                        const newUserId = crypto.randomUUID()
                        const studentUserType = '4317d1e47f6a45c39dacdad3b8c301f4';
                        db.query('insert into users (userId,name, mobileno, busNo, email, password,userImage, usertype_id) values(?, ?, ?, ?, ?,?, ?, ?)', [newUserId, name, mobileno, busNo, email, password, userImage, studentUserType], (stuErr, stuRow) => {
                            if (stuErr) {
                                res.status(400).json({ 'message': stuErr.message })
                            }/*else{
                const collegeBusUserId = crypto.randomUUID()
                db.query('insert into collegebususers (collegeBusUserId, user, busBoardingPointId, academiceyearId,seatNo) values(?, ?, ?, ?, ?)', [collegeBusUserId, newUserId, boardingPointId, academicYearId, seatNo], (clgBusErr, clgBusRows) => {
                  if(clgBusErr){
                    res.status(400).json({message: clgBusErr.message})
                  }else{
                    res.status(201).json({message: 'Student added successfully'})
                  }
                })
              }*/
                        })
                    }
                }
            })
        }
    });
}

const updateStudent = (req, res, db) => {
    const { userImage, name, email, mobileno, password, busNo, userId, usertype_id } = req.body;

    db.query('SELECT usertype_id FROM usertype WHERE usertype = "student"', (err, rows) => {
        if (err || rows.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            const userTypeDB = rows[0].usertype_id;

            if (userTypeDB !== usertype_id) {
                res.status(400).json({ "message": "Invalid user type" });
            } else {
                db.query(
                    'UPDATE users SET name=?, mobileno=?, busNo=?, email=?, password=?, userImage=? WHERE userId = ?',
                    [name, mobileno, busNo, email, password, userImage, userId],
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
}

const deleteStudent = (req, res, db) => {
    const { userId, usertype_id } = req.body;

    db.query('SELECT usertype_id FROM usertype WHERE usertype = "student"', (err, rows) => {
        if (err || rows.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            const userTypeDB = rows[0].usertype_id;

            if (userTypeDB !== usertype_id) {
                res.status(400).json({ "message": "Invalid user type" });
            } else {
                db.query(
                    'DELETE FROM users WHERE userId = ?',
                    [userId],
                    (delErr, delResult) => {
                        if (delErr) {
                            res.status(400).json({ 'message': delErr.message });
                        } else if (delResult.affectedRows === 0) {
                            res.status(404).json({ 'message': 'User not found' });
                        } else {
                            console.log('Student deleted successfully.');
                            res.status(200).json({ 'message': 'Student deleted successfully.' });
                        }
                    }
                );
            }
        }
    });
}

module.exports = { addStudent, updateStudent, deleteStudent }