exports.postSearchBuses = (req, res, next) => {
    const source = req.body.source || '';
    const destination = req.body.destination || '';
    const busNumber = req.body.busNumber || '';
    const isSourceDestination = source.trim().length > 0 && destination.trim().length > 0;
    const isBusNumber = busNumber.trim().length > 0;
    if (isSourceDestination) {
        console.log(source,destination)
        return res.json(
            [
                {
                    busNumber: 'TN 00 69 0000',
                    _id: '1',
                    assignedAccount: 'test@test.com'
                },
                {
                    busNumber: 'TN 00 69 0000',
                    _id: '2',
                    assignedAccount: 'test@test.com'
                },
                {
                    busNumber: 'TN 00 69 0000',
                    _id: '3',
                    assignedAccount: 'test@test.com'
                },
            ]
        );
    }
    if (isBusNumber) {
        console.log(busNumber)
        return res.json(
            [
                {
                    busNumber: 'TN 00 69 0000',
                    _id: '1',
                    assignedAccount: 'test@test.com'
                }
            ]
        );
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.getBus = (req,res,next) => {
    const busId = req.params.busId;
    res.json({
        busNumber:'TN 00 69 0000',
        stops:[
            {_id: '1', name: 'test'},
            {_id: '2', name: 'test'},
            {_id: '3', name: 'test'},
        ]
    })
}
exports.postAddNewBus = (req,res,next) => {
    const busNumber = req.body.busNumber;
    const stops = req.body.stops;
    res.status(200).json({
        message:'Added Bus'
    })
}
exports.putEditBus = (req, res, next) => {
    const id = req.body._id;
    const busNumber = req.body.busNumber;
    const stops = req.body.stops;
    console.log(req.body)
    res.status(200).json({
        message:'Edited Bus'
    })
}
exports.deleteBus = (req,res,next) => {
    const busId = req.params.busId;
    console.log(busId)
    res.json({
        message:'deleted'
    })
}