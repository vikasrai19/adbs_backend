const crypto = require('crypto')

const addBoarding = (req, res, db) => {
    const { BoardingPointName, BoardingPointNo, userId } = req.body;
    const acId = crypto.randomUUID()
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (er) {
            res.status(400).json({ "message": "Invalid user" });
        }
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            db.query('SELECT * FROM boardingpoints WHERE BoardingPointName = ? OR	BoardingPointNo = ?', [BoardingPointName, BoardingPointNo], (err, rows) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (rows.length > 0) {
                        console.log("Data already exists");
                        res.status(400).json({ "message": "Data already exists" });
                    } else {
                        db.query('INSERT INTO boardingpoints(BoardingPointid,BoardingPointName,BoardingPointNo) VALUES (?, ?, ?)', [acId, BoardingPointName, BoardingPointNo], (err, result) => {
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

const addBusBoardingPoint = (req, res, db) => {
    const { boardingTime, dropTime, userId, boardingPointId, collegeBusId, academicYearId } = req.body;
    db.query('select userId from Users u, usertype t where u.usertype_id = t.usertype_id and UserId=? and t.usertype = "Admin"', [userId], (er, rw, fl) => {
        if (er) {
            res.status(400).json({ "message": "Invalid user" });
        }
        if (rw.length === 0) {
            res.status(400).json({ "message": "Invalid user" });
        } else {
            db.query('SELECT * FROM busboardingpoints WHERE collegeBusId = ? OR	academicyearId= ? OR boardingPointId= ?', [collegeBusId, academicYearId, boardingPointId], (err, rows) => {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    if (rows.length > 0) {
                        console.log("Data already exists");
                        res.status(400).json({ "message": "Data already exists" });
                    } else {
                        const acId = crypto.randomUUID()
                        db.query('INSERT INTO busboardingpoints(busBoardingPointId,collegeBusId,academicyearId,boardingPointId,boardingTime,dropTime) VALUES (?, ?, ?,?,?,?)', [acId, collegeBusId, academicYearId, boardingPointId, boardingTime, dropTime], (err, result) => {
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

module.exports = { addBoarding, addBusBoardingPoint }