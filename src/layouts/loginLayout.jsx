import React from 'react';
import Container from '@material-ui/core/Container';

const LoginLayout = (props) => {
    return (
        <div className="login-page">
            <Container maxWidth="sm">
                {props.children}
            </Container>
        </div>
    );
}

export default LoginLayout;