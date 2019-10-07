const Booking = require('../models/Booking');
const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async store(request, response) {
        const { spot_id } = request.params;
        const { date } = request.body;
        const { user_id } = request.headers;

        const user = await User.findById(user_id);

        if (!user)
            return response.status(400).json({ error: 'Usuario nao encontrado' });

        const spot = await Spot.findById(spot_id);

        if (!spot)
            return response.status(400).json({ error: 'Spot nao encontrado' });

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = request.connectedUsers[booking.spot.user];
        if (ownerSocket) {
            request.io.to(ownerSocket).emit('booking_request', booking);
        }

        return response.json(booking);
    }
}