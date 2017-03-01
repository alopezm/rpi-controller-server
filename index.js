require('dotenv').config();

const app = require('express')();
const readline = require('readline');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const TURN_ON = 'TURN_ON';
const TURN_OFF = 'TURN_OFF';
const KEY_TURN_ON = 'o';
const KEY_TURN_OFF = 'f';

io.on('connection', (client) => {
    console.log('Connection ready!');
    client.emit(TURN_ON);
});

server.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`));

// Emitters
function emitTurnOn () {
    console.log('Turn On');
    io.emit(TURN_ON);
}

function emitTurnOff () {
    console.log('Turn Off');
    io.emit(TURN_OFF);
}

// Key
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        console.log(`Key: ${str}`);
        console.log();

        switch (str) {
            case KEY_TURN_ON:
                emitTurnOn();
                break;
            case KEY_TURN_OFF:
                emitTurnOff();
                break;
        }
    }
});

console.log('Press any key...');