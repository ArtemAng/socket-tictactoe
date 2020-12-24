const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http,   {
    cors: {
      origin: '*',
    }
  });

const rooms = ['sad'];
const createRoom = (player) => {
    const roomId = Math.floor(1000 + Math.random() * 9000);
    const room = {
        id: roomId,
        player1: player,
        player2: '',
        board: {
            next: ''
        },
        status: 'waiting'
    };
    rooms[roomId] = room;
    return room;
}

const joinRoom = (player, roomId) => {
    const room = roomId[roomId];
    if (room !== undefined) {
        room.player2 = player;
        room.status = 'ready';
        room.next = player1;
        return room;
    }
    return null;
}

// const start = ()=>io.emit('fame-start' )// take current room

io.on('connection', socket=>{
    console.log('user connected', socket.id);
    socket.on('get-rooms', ()=>{
        console.log(rooms);
        socket.emit('rooms', rooms);
    })
    socket.on('create-room', (data)=>{
        const room = createRoom(data);
        socket.emit('created', room);
    });

    socket.on('join-room', (data)=>{
        const [player, roomId] = data;
        const room = joinRoom(player, roomId);
        if (room!==null) {
            io.emit('joined', room);
            io.emit('started', room);
        }
    });

    socket.on('moove-changed', (data)=>{
        const {roomId} = data;
        rooms[roomId] = data;
        io.emit('changed', data);
    });
    socket.on('disconnected', ()=>console.log('=('));
});
http.listen(1337,()=>console.log('server started on PORT ' + 1337));