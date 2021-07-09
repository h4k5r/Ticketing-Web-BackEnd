const Bus = require('../../models/Bus')
exports.postTrackBus = (req, res, next) => {
    const busId = req.body.busId;
    Bus.findById(busId)
        .then(bus => {
            const location = bus.location;
            res.status(200).json(location);
        })
        .catch(err => {
            console.log(err)
        });
}