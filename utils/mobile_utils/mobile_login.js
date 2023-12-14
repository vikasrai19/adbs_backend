const mobileLogin = (req, res, db) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users u,usertype t WHERE u.usertype_id=t.usertype_id and u.email = ? AND u.password = ? and t.usertype in ("student", "Staff")', [email, password], (err, rows, fields) => {
        if (err) {
            res.status(400).json({ 'message': err?.message });
        } else {
            if (rows?.length == 0) {
                res.status(400).json({ 'message': 'No users found' })
            } else {
                let retData = {
                    userId: rows[0].userId,
                    usertype: rows[0].usertype_id,
                    name: rows[0].name,
                    email: rows[0].email,
                    mobileNo: rows[0].mobileno,
                }
                res.status(201).json(retData);
            }
        }
    })
}

module.exports = { mobileLogin }