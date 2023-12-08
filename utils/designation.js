const crypto = require('crypto')

const addDesignation = (req, res, db) => {
    const { designation, orderNo, userId } = req.body;
    const acId = crypto.randomUUID()
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (er) {
            res.status(400).json({ "message": "Invalid user" });
        }
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            db.query('SELECT * FROM  	designation WHERE designation = ? OR orderNo = ?', [designation, orderNo], (err, rows) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (rows.length > 0) {
                        console.log("Data already exists");
                        res.status(400).json({ "message": "Data already exists" });
                    } else {
                        db.query('INSERT INTO designation ( designation_id,designation, orderNo) VALUES (?, ?, ?)', [acId, designation, orderNo], (err, result) => {
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
}

module.exports = { addDesignation }