const mobileDashboardUser = (req, res, db) => {
    const { userId } = req.query;
    console.log("user id ", userId)
    db.query('select * from users u, collegebususers cbu, busboardingpoints bbp, collegebus cb where cb.collegeBusId = bbp.collegeBusId and cbu.user = u.userId and bbp.busBoardingPointId = cbu.busBoardingPointId and userId = ?', [userId], (err, rows, fields) => {
        if (err) {
            res.status(400).json({ 'message': err?.message });
        } else {
            if (rows?.length == 0) {
                res.status(400).json({ 'message': 'No Data found' });
            } else {
                console.log('data ', rows)
                let data = rows[0];
                let retData = {
                    busNo: data?.busNo,
                    seatNo: data?.seatNo,
                    boardingPointId: data?.boardingPointId,
                    boardingTime: data?.boardingTime,
                    staringPoint: data?.startingPoint,
                    endingPoint: data?.endingPoint,
                    routeNo: data?.routeNo,
                    boardingTime: data?.boardingTime,
                }
                res.status(200).json(retData)
            }
        }
    })

}

const mobileDashboardDriver = (req, res, db) => {

}

module.exports = { mobileDashboardDriver, mobileDashboardUser }