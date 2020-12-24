import { Button, Input, Paper, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import io from 'socket.io-client';

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

    submit: {
        marginTop: 5,
        height: 50
    },
}));
let socket = io.connect('localhost:1337');

const Join = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        console.log(socket);
        // socket = ;
        socket.emit('get-rooms');
        socket.on('rooms', (data) => {
            setRooms(data);
            console.log('ss1');
        })

    })
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography variant='h4' className={classes.header} color='secondary' >Join into room</Typography>
            {
                rooms.map((room, i) => (
                    <div>
                        <Button key={i} className={classes.header} variant='outlined' color='secondary'> create </Button>
                        <span>s</span>
                    </div>
                ))
            }
        </Paper>
    );
}
export default Join;