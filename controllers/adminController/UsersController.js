exports.postSearchUsers = (req, res, next) => {
    const userEmail = req.body.userEmail || '';
    const userPhone = req.body.userPhone || '';
    const isUserEmail = userEmail.trim().length > 0
    const isUserPhone = userPhone.trim().length > 0;
    console.log(req.body)
    if (isUserEmail) {
        // fetch user from database using email
        return res.json({
            userEmail: userEmail,
            userId:'1'
        });
    }
    if (isUserPhone) {
        // fetch user from database using phone number
        return res.json({
            userPhone: userPhone,
            userId:'1'
        });
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.getViewHistory = (req, res, next) => {
    const userId = req.params.userId;
    console.log(req.params)
    res.status(200).json([
        {
            busId: '0000',
            ticketId: '00001',
            busNumber: '0000',
            source: 'srirangam',
            destination: 'tolgate',
            numberOfTickets: '5',
            bookedTime: '12:00',
            hasUsed: true
        },
        {
            busId: '0000',
            ticketId: '00002',
            busNumber: '0000',
            source: 'srirangam',
            destination: 'tolgate',
            numberOfTickets: '5',
            bookedTime: '12:00',
            hasUsed: true
        },
        {
            busId: '0000',
            ticketId: '00003',
            busNumber: '0000',
            source: 'srirangam',
            destination: 'tolgate',
            numberOfTickets: '5',
            bookedTime: '12:00',
            hasUsed: true
        },
        {
            busId: '0000',
            ticketId: '00004',
            busNumber: '0000',
            source: 'srirangam',
            destination: 'tolgate',
            numberOfTickets: '5',
            bookedTime: '12:00',
            hasUsed: true
        },
        {
            busId: '0000',
            ticketId: '00005',
            busNumber: '0000',
            source: 'srirangam',
            destination: 'tolgate',
            numberOfTickets: '5',
            bookedTime: '12:00',
            hasUsed: true
        }
    ])
}
exports.addNewUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(req.body)
    res.status(200).json({
        message:'added User'
    })
}

exports.putResetPassword = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(req.body)
    res.status(200).json({
        message:'user password reset'
    });
}
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId
    console.log(req.params)
    res.status(200).json({
        message:"User Deleted"
    })
}