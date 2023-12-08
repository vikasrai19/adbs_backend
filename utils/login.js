const login = (req, res, db) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users u,usertype t WHERE u.usertype_id=t.usertype_id and email = ? AND password = ? and t.usertype="Admin"', [email, password], (err, rows, fields) => {
        if (err) res.status(400).send(err?.message);

        if (rows.length > 0) {
            console.log(rows[0].name)
            retData = {
                userId: rows[0].userId,
                usertype: rows[0].usertype_id,
                name: rows[0].name,
                email: rows[0].email,
                mobileNo: rows[0].mobileno,
            }
            res.status(201).send(retData);
        } else {
            res.status(400).send('Invalid credentials. Please try again.');
        }
    })
}

module.exports = login
