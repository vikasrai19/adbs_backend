const MobileDashboardUser = (req, res, db) => {
    const { userId } = req.body;
    db.query('select * from busboardingpoints bbp inner join collegebususers cbu on cbu.busBoardingPointId = bbp.busBoardingPointId inner join collegebus cb on cb.collegeBusId = bbp.collegeBusId inner join Users u on u.userId = user where u.userId = ?', [userId], (err, rows, fields) => {
        if (err) {
            res.status(400).json({ 'message': err?.message });
        } else {
            if (rows?.length == 0) {
                res.status(400).json({ 'message': 'No Data found' });
            } else {
                console.log('data ', rows)
                let retData = {

                }
                res.status(200).json({ 'message': 'Successfully got some data' })
            }
        }
    })

}

const MobileDashboardDriver = (req, res, db) => {

}

module.exports = { MobileDashboardUser, MobileDashboardDriver }