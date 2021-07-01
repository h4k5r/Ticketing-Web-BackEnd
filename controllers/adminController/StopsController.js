const BusStop = require('../../models/BusStop');
exports.postSearchStops = (req, res, next) => {
    const stopName = req.body.stopName || '';
    const stopId = req.body.stopId || '';
    const isStopName = stopName.trim().length > 0
    const isStopId = stopId.trim().length > 0;
    if (isStopName) {
        // fetch stop from database using stop name
        BusStop.find({
            name: stopName
        })
            .then(stops => {
                const transformedStops = stops.map(stop => {
                    return {
                        _id: stop._id,
                        name: stop.name
                    }
                });
                return res.json(transformedStops);
            })
            .catch(err => {
                console.log(err)
            })

    }
    if (isStopId) {
        // fetch stop from database using stopId
        BusStop.find({
            _id:stopId
        })
            .then(stops => {
                const transformedStops = stops.map(stop => {
                    return {
                        _id: stop._id,
                        name: stop.name
                    }
                });
                return res.json(transformedStops);
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (!(isStopName || isStopId)) {
        return res.json({
            test: 'no valid params'
        });
    }
}
exports.getStop = (req, res, next) => {
    const stopId = req.params.stopId;
    BusStop.findById(stopId)
        .then(stop => {
            res.status(200).json({
                _id: stop._id,
                name: stop.name
            });
        })
        .catch(err => {
            console.log(err)
        })

}
exports.postAddNewStop = (req, res, next) => {
    const stopName = req.body.stopName;
    const busStop = new BusStop({
        name: stopName
    });
    busStop.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'added stop',
                stop: result
            })
        })
        .catch(err => {
            console.log(err);
        })
    console.log(req.body)

}
exports.putEditStop = (req, res, next) => {
    const stopName = req.body.stopName;
    const _id = req.body._id;
    console.log(req.body)
    BusStop.findByIdAndUpdate(_id, {
        name:stopName
    })
        .then(result => {
            res.status(200).json({
                message: 'edited stop',
                stop:result
            });
        })
        .catch(err => {
            console.log(err)
        })


}
exports.deleteStop = (req, res, next) => {
    const _id = req.params.stopId;
    console.log(_id);
    BusStop.findByIdAndDelete(_id)
        .then(stop => {
            res.json({
                message: 'deleted stop',
                stop:stop
            })
        })
        .catch(err => {
            console.log(err)
        })


}