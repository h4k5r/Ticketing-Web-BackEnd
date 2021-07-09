const Bus = require('../../models/Bus');
exports.postSearchBuses = (req, res, next) => {
    const source = req.body.source || '';
    const destination = req.body.destination || '';
    const busNumber = req.body.busNumber || '';
    const isSourceDestination = source.trim().length > 0 && destination.trim().length > 0;
    const isBusNumber = busNumber.trim().length > 0;
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
    if (isBusNumber) {
        Bus.find({
            busNumber: busNumber
        })
            .then(buses => {
                console.log(buses)
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

exports.getBus = (req, res, next) => {
    const busId = req.params.busId;
    Bus.findById(busId)
        .then(bus => {
            res.json(bus)
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postAddNewBus = (req, res, next) => {
    const busNumber = req.body.busNumber;
    const stops = req.body.stops;
    Bus.find({
        busNumber: busNumber
    })
        .then(buses => {
            if (buses.length > 0) {
                res.status(200).json({
                    message: 'Bus Exists',
                    bus: buses[0]
                });
                return Promise.reject('Bus Exists');
            } else {
                const bus = new Bus({
                    busNumber: busNumber,
                    stops: stops
                });
                return bus.save()
            }
        })
        .then(savedBus => {
            res.status(200).json({
                message: 'Added Bus',
                bus: savedBus
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.putEditBus = (req, res, next) => {
    const id = req.body._id;
    const busNumber = req.body.busNumber;
    const stops = req.body.stops;
    Bus.findByIdAndUpdate(id, {
        busNumber: busNumber,
        stops: stops
    })
        .then(bus => {
            res.status(200).json({
                message: 'Edited Bus',
                previous: bus
            })
        })
        .catch(err => {
            console.log(err)
        });

}
exports.deleteBus = (req, res, next) => {
    const busId = req.params.busId;
    Bus.findByIdAndDelete(busId)
        .then(bus => {
            res.json({
                message: 'deleted',
                DeletedBus: bus
            })
        })
        .catch(err => {
            console.log(err);
        });
}