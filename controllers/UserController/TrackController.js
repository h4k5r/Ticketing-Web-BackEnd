exports.postTrackBus = (req, res, next) => {
    const busId = req.body.busId;
    console.log(busId)
    res.status(200).json(
        {
            lat: 10.809865,
            lng: 78.695961
        }
    )
}