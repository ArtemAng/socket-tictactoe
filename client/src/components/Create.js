import { Button, Input, Paper } from '@material-ui/core';
import { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { SocketContext } from '../App';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 25,
        maxWidth: 400,
        background: '#282c34',
        height: 200
    },
    textField: {
        width: '80%',
        margin: 10,
        color: 'white'
    },
    submit: {
        marginTop: 5,
        height: 50
    },
}));


const Create = () => {
    const classes = useStyles();
    const [roomId, setRoomID] = useState(0);
    const [userName, SetUserName] = useState(0);
    const socket = useContext(SocketContext);

    // useEffect(() => {
        

    // }, []);

    useEffect(() => {
        console.log(socket)
    }, [socket]);

    return (
        <Paper className={classes.paper}>
            <Input
                className={classes.textField}
                placeholder="Name"
                color='secondary'
                onChange={(e) => SetUserName(e.target.value)} />
            <Input
                className={classes.textField}
                placeholder="Room"
                color='secondary'
                onChange={(e) => setRoomID(e.target.value)} />
            <Link to={`/game?username=${userName}&id=${roomId}&type=create`}>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                        socket.emit('create-room', { roomId, userName })
                        socket.emit('get-rooms');

                    }}
                >
                    create
                </Button>
            </Link>
        </Paper>
    );
}
export default Create;