const crypto = require('crypto')

const createAcademicYear = (req, res, db) => {
    const { academicYear, orderNo, userId } = req.body;

    const acId = crypto.randomUUID()
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });

        } else {
            db.query('SELECT * FROM academicyear WHERE academicyear = ? or orderNo = ?', [academicYear, orderNo], (err, rows, fields) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (rows.length > 0) {
                        console.log("Data already exists");
                        res.status(400).json({ "message": "Data already exists" });
                    } else {
                        db.query('INSERT INTO academicyear (academicyear_id, academicyear, orderNo) VALUES (?, ?, ?)', [acId, academicYear, orderNo], (err, result) => {
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
    })
}


module.exports = { createAcademicYear }