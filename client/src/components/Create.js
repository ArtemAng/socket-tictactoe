import { Button, Input, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

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
    return (
        <Paper className={classes.paper}>
           <Input className={classes.textField} placeholder="Name" color='secondary' />
           <Input className={classes.textField} placeholder="Room" color='secondary' />
           <Button variant='outlined' color='secondary'> create </Button>
        </Paper>
    );
}
export default Create;