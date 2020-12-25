import { Button, Input, Paper, Typography } from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../App';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        maxWidth: 400,
        background: '#282c34',
    },
    header: {
        margin: 5
    },

    indicator: {
        width: 10,
        height: 10
    },
    room: {
        display: 'flex'
    },
    waiting: {
        backgroundColor: 'green',
        marginTop: 15,
        borderRadius: '50%',
        width: 10,
        height: 10,
    },
    started: {
        width: 10,
        marginTop: 15,
        borderRadius: '50%',
        height: 10,
        backgroundColor: 'red'
    },
    submit: {
        marginTop: 5,
        height: 50
    },
}));


const Join = () => {
    const [userName, setUserName] = useState('');
    const [rooms, setRooms] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        // socket = ;
        socket.on('rooms', (data) => {
            console.log(data);
            setRooms(data);
        });
    }, [socket, setRooms, rooms]);
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography variant='h4' className={classes.header} color='secondary' >Join into room</Typography>
            <Input onChange={(e) => setUserName(e.target.value)} className={classes.textField} placeholder="Name" color='secondary' />
            {
                rooms.map((room, i) => (
                    <div className={classes.room}>
                        <Button
                            key={i}
                            onClick={() => socket.emit('join-room', [userName, room.id])}
                            className={classes.header}
                            variant='outlined'
                            color='secondary'> {room.id} </Button>
                        <div className={room.status === 'waiting' ? classes.waiting : classes.started}></div>
                    </div>
                ))
            }
        </Paper>
    );
}
export default Join;