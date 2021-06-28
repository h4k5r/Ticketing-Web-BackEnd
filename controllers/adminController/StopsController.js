exports.postSearchStops = (req, res, next) => {
    const stopName = req.body.stopName || '';
    const stopId = req.body.stopId || '';
    const isStopName = stopName.trim().length > 0
    const isStopId = stopId.trim().length > 0;
    if (isStopName) {
        console.log(isStopName);
        // fetch stop from database using stop name
        return res.json([
            {
                stopName: 'stop 1',
                stopId: '1'
            },
            {
                stopName: 'stop 2',
                stopId: '2'
            },
            {
                stopName: 'stop 3',
                stopId: '3'
            },
        ]);
    }
    if (isStopId) {
        console.log(stopId);
        // fetch stop from database using stopId
        return res.json([
            {
                stopName:'stop 1',
                stopId:'1'
            }
        ]);
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.getStop = (req, res, next) => {
    const stopId = req.params.stopId;
    res.status(200).json({
        _id: stopId,
        name: `from node ${stopId}`
    });
}
exports.postAddNewStop = (req, res, next) => {
    const stopName = req.body.stopName;
    console.log(req.body)
    res.status(200).json({
        message:'added stop'
    })
}
exports.postEditStop = (req, res, next) => {
    const stopName = req.body.stopName;
    const _id = req.body._id;
    console.log(req.body)
    res.status(200).json({
        message:'edited stop'
    });
}
exports.deleteStop = (req, res, next) => {
    const _id = req.params.stopId
    console.log(_id)
    res.json({
        message:'deleted stop'
    })
}