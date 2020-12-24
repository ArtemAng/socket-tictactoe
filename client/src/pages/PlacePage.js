import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button
} from '@material-ui/core'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react'

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

const PlacePage = ({ place, isWin, cellChange, switchMove, findWinner, move }) => {
    const classes = useStyles();
    useEffect(()=>{
        findWinner(place);

        if(isWin)
            alert('win player ' + move)
    }, [isWin, move, findWinner, place])

    return (
        <Table className={classes.root}>
            <TableBody>
                {place.map((rows, rowId, self) => (
                    <TableRow key={Date.now() * rowId}>
                        {
                            rows.map((cell, collId) => (
                                <TableCell key={Date.now() / (collId + 1)} className={classes.cell} align='center'>
                                    <Button className={classes.btn} onClick={() => {
                                        cellChange({ rowId, collId, move });
                                        switchMove();
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

const mapStateToProps = (state) => {
    return {
        place: state.place,
        move: state.user.move,
        isWin: state.user.isWin
    }
};
const mapDispatchToProps = (dispatch) => {
    const { cellChange, findWinner, switchMove } = bindActionCreators(actions, dispatch)
    return {
        cellChange,
        findWinner,
        switchMove
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PlacePage);