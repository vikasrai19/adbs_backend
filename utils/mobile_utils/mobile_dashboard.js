const mobileDashboardUser = (req, res, db) => {
    const { userId } = req.query;
    db.query('select * from users u, collegebususers cbu, busboardingpoints bbp, collegebus cb, boardingpoints bp where cb.startingPoint = bp.BoardingPointId and cb.collegeBusId = bbp.collegeBusId and cbu.user = u.userId and bbp.busBoardingPointId = cbu.busBoardingPointId and userId = ?', [userId], (err, rows, fields) => {
        if (err) {
            res.status(400).json({ 'message': err?.message });
        } else {
            if (rows?.length == 0) {
                res.status(400).json({ 'message': 'No Data found' });
            } else {
                let data = rows[0];
                let driverDetails;
                db.query('select * from collegebusemployee cbe, users u, usertype ut where u.userId = cbe.userId and ut.usertype_id = u.usertype_id and cbe.collegeBusId = ? and ut.usertype = ?', [data?.collegeBusId, 'driver'], (empErr, empRow) => {
                    if (empErr) {
                        res.status(400).json({'message': empErr.message});
                    }else{
                        driver = empRow[0];
                        console.log(driver)
                        let retData = {
                            busNo: data?.busNo,
                            seatNo: data?.seatNo,
                            boardingPointId: data?.boardingPointId,
                            boardingTime: data?.boardingTime,
                            staringPoint: data?.startingPoint,
                            endingPoint: data?.endingPoint,
                            routeNo: data?.routeNo,
                            driverName: driver?.name,
                            driverMobileNo: driver?.mobileno,
                            driverEmail: driver?.email,
                            startingPoint: data?.BoardingPointName,
                        }
                        res.status(200).json(retData)
                    }
                })
            }
        }
    })

}

const mobileDashboardDriver = (req, res, db) => {

}

module.exports = { mobileDashboardDriver, mobileDashboardUser }