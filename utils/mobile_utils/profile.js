const userProfile = (req, res, db) => {
	const {userId} = req.query;
	db.query('select * from users u, usertype ut, collegebususers cbu, busboardingpoints bpp, boardingpoints bp where bpp.busBoardingPointId = cbu.busBoardingPointId and bpp.boardingPointId = bp.boardingPointId and ut.usertype_id = u.usertype_id and cbu.user = u.userId and u.userId = ?', [userId], (err, rows) =>{
		if(err){
			res.status(400).json({'message': err?.message});
		}else{
			if(rows?.length == 0){
				res.status(400).json({'message': 'Data not found'})
			}else{
				const data = rows[0];
				const retData = {
					name: data?.name,
					userId: data?.userId,
					email: data?.email,
					phoneNo: data?.mobileno,
					userType: data?.userType,
					seatNo: data?.seatNo,
					boardingPoint: data?.BoardingPointName,
					boardingTime: data?.boardingTime,
					boardingPointNo: data?.boardingPointNo,
				}
				res.status(200).json(retData)
			}

		}
	})

}

module.exports = {
	userProfile
}