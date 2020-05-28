const socketio = require('socket.io');

const ParseStringAsArray = require('./utils/ParseStringAsArray');

const connections = [];

exports.setupWebSocket = (server) => {
    const io = socketio(server);

    io.on('connection', socket => {

    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
        id: socket.id,
        coordinates: {
            latitude = Number(latitude),
            longitude = Number(longitude)
        },
        techs: ParseStringAsArray(techs)
    })
}