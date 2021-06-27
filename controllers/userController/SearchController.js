exports.postSearchBus = (req, res, next) => {
    const source = req.body.source;
    const destination = req.body.destination;
    res.json(
        [
            {
                id: 'sdfsdf1',
                number: 'TN 00 H4 K5R0',
                approxTime: '12:00PM'
            },
            {
                id: 'sdfsdf2',
                number: 'TN 00 H4 K5R0',
                approxTime: '12:00PM'
            },
            {
                id: 'sdfsdf3',
                number: 'TN 00 H4 K5R0',
                approxTime: '12:00PM'
            },
            {
                id: 'sdfsdf4',
                number: 'TN 00 H4 K5R0',
                approxTime: '12:00PM'
            },
        ]
    )
}
