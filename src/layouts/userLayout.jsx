import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const userStyles = makeStyles((theme) =>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
    }
}));

const UserLayout = (props) => {
    const classes = userStyles();
    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                {props.children}
            </div>
        </Container>
    );
}

export default UserLayout;