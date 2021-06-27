exports.postSearchStops = (req, res, next) => {
    const stopName = req.body.stopName || '';
    const stopId = req.body.stopId || '';
    const isStopName = stopName.trim().length > 0
    const isStopId = stopId.trim().length > 0;
    if (isStopName) {
        // fetch stop from database using stop name
        return res.json({
            stopName: stopName,
        });
    }
    if (isStopId) {
        // fetch stop from database using stopId
        return res.json({
            stopId: stopId
        });
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.postAddNewStop = (req, res, next) => {

}
exports.postEditStop = (req, res, next) => {

}
exports.deleteStop = (req, res, next) => {

}