const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

let rooms = [
//     {
//     id: 1,
//     player1: 'sa',
//     player2: '',
//     board: {
//         place: [
//             ['', '', ''],
//             ['', '', ''],
//             ['', '', '']
//         ],
//         next: 'x'
//     },
//     status: 'waiting'
// }
];
const createRoom = (player) => {
    console.log(player, 'player');
    const room = {
        id: player.roomId,
        player1: player.player,
        player2: '',
        board: {
            place: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            next: ''
        },
        status: 'waiting'
    };
    rooms[player.roomId] = room;
    return room;
}

const joinRoom = (player, roomId, nextTip) => {
    console.log(roomId, 'joinroom');
    const room = rooms[roomId];
    if (room !== undefined) {
        room.player2 = player;
        room.status = 'ready';
        room.board.next = nextTip;
        return room;
    }
    return null;
}

// const start = ()=>io.emit('fame-start' )// take current room

io.on('connection', socket => {
    console.log('user connected', socket.id);
    socket.on('get-rooms', (data) => {
        // console.log('rooms')
        // const {roomses} = data;
        const length = rooms.filter(i=>i!==null).length;
        if (data !== length) {
            socket.emit('rooms', rooms.filter(i => i !== null));
        }
       
    })
    socket.on('create-room', (data) => {
        const room = createRoom(data);
        socket.emit('created', room);
    });

    socket.on('join-room', (data) => {
        const { player, roomId, myTip } = data;
        const room = joinRoom(player, roomId, myTip);
        if (room !== null) {
            io.emit('joined', room);
            io.emit('started', room);
        }
        else {
            socket.emit('joined', { code: 404, message: 'room not found!' });
        }
    });

    socket.on('move-change', (data) => {
        const { id } = data;
        rooms[id] = data;
        io.emit('changed', data);
    });
    socket.on('disconnected', () => {
        rooms = [];
    });
});
http.listen(1337, () => console.log('server started on PORT ' + 1337));