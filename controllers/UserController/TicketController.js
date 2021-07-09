const User = require('../../models/User');
const Bus = require('../../models/Bus');
const Ticket = require('../../models/Ticket');
exports.postBuyTicket = (req, res, next) => {
    const busNumber = req.body.busNumber;
    const source = req.body.source;
    const destination = req.body.destination;
    const numberOfTickets = req.body.numberOfTickets;
    const email = req.email ? req.email : undefined;
    const phone = req.phone ? req.phone : undefined;
    const findUserAndAddTicket = (condition) => {
        let user;
        User.findOne(condition)
            .then(foundUser => {
                user = foundUser;
                return Bus.findOne({
                    busNumber: busNumber
                });
            })
            .then(foundBus => {
                const newTicket = new Ticket({
                    busId: foundBus._id,
                    busNumber: busNumber,
                    source: source,
                    destination: destination,
                    numberOfTickets: numberOfTickets,
                    bookedTime: Date.now(),
                    hasUsed: false
                });
                user.tickets.push(newTicket)
                return user.save();
            })
            .then(savedUser => {
                res.json({
                    message: 'Ticket Booked',
                    error: false
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    error: true,
                    errorMessage: 'Error Occurred'
                })
            })
    }
    if (email) {
        findUserAndAddTicket({email: email});
    }
    if (phone) {
        findUserAndAddTicket({phone: phone});
    }
}
exports.getTicketHistory = (req, res, next) => {
    const email = req.email ? req.email : undefined;
    const phone = req.phone ? req.phone : undefined;
    const findAndSendHistory = (condition) => {
        User.findOne(condition)
            .then(user => {
                if (!(user.tickets && user.tickets.length > 0)) {
                    return res.json([]);
                }
                const transformedTickets = user.tickets.map(ticket => {
                    return {
                        busId:ticket.busId,
                        ticketId:ticket._id,
                        busNumber:ticket.busNumber,
                        source:ticket.source,
                        destination:ticket.destination,
                        numberOfTickets:ticket.numberOfTickets,
                        bookedTime:ticket.bookedTime,
                        hasUsed:ticket.hasUsed
                    }
                })
                res.json(transformedTickets)
            })
            .catch(err => {
                res.json({
                    error: true,
                    errorMessage: 'Error Occurred'
                })
            })
    }
    if (email) {
        findAndSendHistory({email: email})
    }
    if (phone) {
        findAndSendHistory({phone: phone})
    }
}