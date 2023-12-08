const addBus = (req, res, db) => {
    const { busNo, routeNo, regDate, purchaseDate, startingPoint, endingPoint, noOfSeats, userId, busImage } = req.body;
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
                        db.query('INSERT INTO collegebus(collegeBusId,busNo,routeNo,regDate,purchaseDate,startingPoint,endingPoint,noOfSeats,busImage) VALUES (?, ?, ?, ? , ? ,?, ?, ?, ? )', [acId, busNo, routeNo, regDate, purchaseDate, startingPoint, endingPoint, noOfSeats, busImage], (err, result) => {
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

module.exports = { addBus }