const busDetails = (req, res, db) => {
	const {collegeBusId} = req.query;
	db.query('select * from collegebus cb, boardingPoints bp where cb.startingPoint = bp.boardingPointId and cb.collegeBusId = ?', [collegeBusId], (err, rows) => {
		if(err){
			res.status(400).json({'message': err.toString()});
		}else{
			if(rows.length === 0){
				res.status(400).json({'message': 'No Data found'})
			}else{
				let respData = rows[0];
				db.query('select * from busboardingpoints bbp, boardingpoints bp where bbp.boardingPointId = bp.boardingPointId and bbp.collegeBusId = ? order by bp.BoardingPointNO', [collegeBusId], (bpErr, bpRows) => {
					if(err){
						res.status(400).json({'message': err.toString()});
					}else{
						let retData = {
							...respData,
							boardingPointList: bpRows,
						}
						res.status(200).json(retData);
					}
				})
			}
		}
	});
}

module.exports = {busDetails}