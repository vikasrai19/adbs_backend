const crypto = require('crypto')

const addBusEmployee = (req, res, db) => {
    const { collegeBusId, designationId, userId, name, startDate, endDate, phono, currentStatus, empimg } = req.body;
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (er) {
            res.status(400).json({ "message": "Invalid user" });
        }
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            db.query('SELECT * FROM  collegebusemployee  WHERE collegeBusId = ? OR phono = ?', [collegeBusId, phono], (err, rows) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (rows.length > 0) {
                        console.log("Data already exists");
                        res.status(400).json({ "message": "Data already exists" });
                    } else {
                        const acId = crypto.randomUUID()
                        db.query('INSERT INTO collegebusemployee(collegeBusEmpId,name,collegeBusId,designationId,startDate,endDate,phono,empimg,currentStatus) VALUES (?, ?, ?,?,?,?,?,?,?)', [acId, name, collegeBusId, designationId, startDate, endDate, phono, empimg, currentStatus], (err, result) => {
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

module.exports = { addBusEmployee }