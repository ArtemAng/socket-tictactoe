import { Grid } from '@material-ui/core';
import {useContext} from 'react';
import Create from '../components/Create';
import Join from '../components/Join';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    item:{
        minWidth: 400,
        margin: 10
    }
   
}));

const StartPage = () => {
    const classes = useStyles();
    return (
        <Grid container justify="center" >
            <Grid className={classes.item} item>
                <Create />
            </Grid>
            <Grid className={classes.item} item>
                <Join />
            </Grid>
        </Grid>
    );
}

export default StartPage;