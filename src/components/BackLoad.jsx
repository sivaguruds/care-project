import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Backdrop,
    CircularProgress
}from '@material-ui/core';

const BackLoadStyle = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

function BackLoad(props) {
    const classes = BackLoadStyle();
    return (
        <div>
            <Backdrop className={classes.backdrop} open={props.open}>
                    <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}


export default BackLoad

