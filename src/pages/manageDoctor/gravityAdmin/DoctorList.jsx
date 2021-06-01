import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {Link} from "react-router-dom";

function DoctorList() {
    return (
        <div>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Manage Doctor   
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                    component={Link}
                    to="/admin/createDoctor"
                    style={{textTransform: 'none'}}
                    variant="contained"
                    size="medium"
                    color="primary"
                    startIcon={<AddIcon />}
                    >
                        Create Doctor
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default DoctorList
