import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function AlertMessage(props) {
    return (
        <div>
            <Snackbar open={props.open} autoHideDuration={5000} >
                <Alert variant="filled"  severity={props.messageType}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertMessage

