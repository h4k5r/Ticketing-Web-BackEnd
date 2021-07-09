const Bus = require('../../models/Bus');

exports.postSearchBus = (req, res, next) => {
    const source = req.body.source || '';
    const destination = req.body.destination || '';
    const isSourceDestination = source.trim().length > 0 && destination.trim().length > 0;
    if (isSourceDestination) {
        Bus.find({
            $or: [
                {'stops.name': source},
                {'stops.name': destination}
            ]
        })
            .then(buses => {
                res.json(buses)
            })
            .catch(err => {
                console.log(err)
            })
        return;
    }
    return res.json({
        test: 'no valid params'
    });
}
