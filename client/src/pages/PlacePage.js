import { useState, useEffect, useContext } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
    TableHead,
    Typography
} from '@material-ui/core';
import queryString from 'querystring';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../App';

const useStyles = makeStyles({
    root: {
        width: 300,
        margin: '0 auto'
    },
    btn: {
        width: 100,
        height: 100,
        align: 'center',
    },
    cell: {
        width: 100,
        padding: 0,
        height: 100,
    }
})

const PlacePage = () => {
    const classes = useStyles();
    const [myTip, setTip] = useState('');
    const socket = useContext(SocketContext);
    const [userName, setName] = useState('')
    const [room, setRoom] = useState({
        id: 1,
        player1: 'sa',
        player2: '',
        board: {
            place: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            next: 'x'
        },
        status: 'waiting'
    });

    useEffect(() => {
        const [player, roomId, type] = Object.values(queryString.parse(window.location.search));
        setName(player);
        if (type === 'create') {
            socket.emit('create-room', { player, roomId })
            setTip('x');
        }
        else {
            socket.emit('join-room', { player, roomId, myTip: myTip==='x'? 'o':'x' })
            setTip('o');
        }
        console.log(socket)
    }, [socket]);

    useEffect(() => {
        socket.on('started', data => setRoom(data));
        socket.on('joined', data => {
            if (data.code !== 404) {
                setRoom(data);
            } else {
                alert('room not found');
                window.history.back();
            }
        });
        socket.on('changed', data => setRoom(data));
    }, [socket, setRoom]);

    const cellChange = (idRow, idCol) => {
        socket.on('changed', (data) => setRoom(data))
        const newState = { ...room };
        newState.board.place[idRow][idCol] = room.board.next;
        newState.board.next = room.board.next === 'x' ? 'o' : 'x';
        setRoom(newState);
        socket.emit('move-change', room);

    }

    const findWinner = () => {
        const { place } = room.board;
        let move = '';
        let isWin = false;
        const rows = place.map(row => row.filter((item, idx, self) => self.indexOf(item) === idx || item === ''));
        rows.map(i => {
            if (i.length === 1) {
                isWin = true
                move = i[0]
            }
            return i;
        });

        let cols = [];
        for (let i = 0; i < 3; i++) {
            let res = [];
            for (let j = 0; j < 3; j++) {
                res.push(place[j][i]);
            }
            cols.push(res);
        }

        cols.map(col => col.filter((item, idx, self) => self.indexOf(item) === idx || item === '')).map(i => {
            if (i.length === 1) {
                isWin = true;
                move = i[0];
            }
            return i;
        });

        let diaganals = [[], []];

        for (let i = 0, j = 2; i < 3 && j > -1; i++, j--) {
            diaganals[0].push(place[i][i]);
            diaganals[1].push(place[i][j]);
        }

        diaganals.map(diaganal => (
            diaganal.filter((item, idx, self) => self.indexOf(item) === idx || item === '')
        )).map(i => {
            if (i.length === 1) {
                isWin = true;
                move = i[0];
            }
            return i;
        });
        if (isWin) {
            alert('win ' + move);
        }
        return isWin
    }
    useEffect(() => {
        findWinner()
    });

    return (
        <Table className={classes.root}>
            <TableHead >
                <TableRow>
                    <TableCell colSpan={3}>
                        <Typography align='center' variant='h6' color='secondary'>Hi {userName}! Your tip is: {myTip}</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {room.board.place.map((rows, rowId, self) => (
                    <TableRow key={Date.now() * rowId}>
                        {
                            rows.map((cell, collId) => (
                                <TableCell key={Date.now() / (collId + 1)} className={classes.cell} align='center'>
                                    <Button
                                        variant='outlined'
                                        color='secondary'
                                        className={classes.btn} onClick={() => {
                                            if (myTip===room.board.next) {
                                                !findWinner() && cellChange(rowId, collId);
                                            }
                                        }}>
                                        {cell}
                                    </Button>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default PlacePage;