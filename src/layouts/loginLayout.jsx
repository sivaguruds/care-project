import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const LoginLayout = (props) => {
    const classes = useStyles();
    return (
        <div className="login-page">
             <Container component="main" maxWidth="xs">
             <CssBaseline />
                    <div className={classes.paper}>
                        {props.children}
                    </div>
            </Container>
        </div>
    );
}

export default LoginLayout;