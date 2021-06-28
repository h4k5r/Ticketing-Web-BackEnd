exports.getProfileSettings = (req, res, next) => {
    res.json({
        name:'Potato head'
    })
}
exports.postProfileSettings = (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    res.json({
        message:'updated name'
    })
}