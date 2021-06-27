exports.postSearchBuses = (req, res, next) => {
    const source = req.body.source || '';
    const destination = req.body.destination || '';
    const busNumber = req.body.busNumber || '';
    const isSourceDestination = source.trim().length > 0 && destination.trim().length > 0;
    const isBusNumber = busNumber.trim().length > 0;
    if (isSourceDestination) {
        return res.json({
            source: source,
            destination: destination,
        });
    }
    if (isBusNumber) {
        return res.json({
            busNumber: busNumber
        });
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.postAddNewBus = () => {

}
exports.postEditBus = () => {

}
exports.deleteBus = () => {

}