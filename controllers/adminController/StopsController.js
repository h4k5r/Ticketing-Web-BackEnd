exports.postSearchStops = (req, res, next) => {
    const stopName = req.body.stopName || '';
    const stopId = req.body.stopId || '';
    const isStopName = stopName.trim().length > 0
    const isStopId = stopId.trim().length > 0;
    if (isStopName) {
        console.log(isStopName);
        // fetch stop from database using stop name
        return res.json({
            stopName: stopName,
        });
    }
    if (isStopId) {
        console.log(stopId);
        // fetch stop from database using stopId
        return res.json({
            stopId: stopId
        });
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.getStop = (req,res,next) => {
    const stopId = req.params.stopId;
    res.status(200).json({
        _id: '4',
        name: 'test'
    });
}
exports.postAddNewStop = (req, res, next) => {

}
exports.postEditStop = (req, res, next) => {

}
exports.deleteStop = (req, res, next) => {

}