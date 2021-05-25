import React,  {useState} from 'react';
import { useHistory } from "react-router-dom";
import AccountApi from '../services/api/account/accountAll';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { 
        Typography, 
        Avatar, 
        FormControl, 
        FormHelperText,
        FormControlLabel,
        Checkbox,
        InputLabel, 
        OutlinedInput,
        InputAdornment,
        IconButton,
        Button
    } 
from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import BackLoad from '../components/BackLoad'

const loginStyle = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    loginBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 4)
    },
    formInput: {
        marginBottom: '10px'
    },
    invalidFeedback: {
        color: 'red'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    
}));


const LoginPage = () => {
    
    // MESSAGES
    const required = "This field is required";
    const emailPattern = "Please enter a valid email address.";

    // ERROR COMPONENT
    const errorMessage = error => {
        return <div className={classes.invalidFeedback}>{error}</div>;
    };

    const initialValue = {
        userName: '',
        password: '',
        showPassword: false,
        rember: '',
    };

    let history = useHistory ();
    const classes = loginStyle();
    const [login, setLogin] = useState (initialValue);
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, errors } = useForm();

    // INPUT CHANGE FUNCTIONS
    const handleInputChange = event => {
        const {name, value} = event.target;
        setLogin({ ...login, [name]: value });
    }

    // SHOW PASSWORD FUNCTIONS
    const handleClickShowPassword = () => {
        setLogin({ ...login, showPassword: !login.showPassword});
    }

    const pageChange =() => {
        let path = "/admin/doctorList";
        history.push(path);
    }

    // LOGIN FUNCTIONS
    const onSubmit = data => {
       setOpen(true) 
       let requestData = {
            email: data.userName,
            password: data.password,
       }
       AccountApi.login(requestData)
      .then(response => {
        // LOCAL STORGE AUTH_TOKEN
        localStorage.setItem("auth_token", response.data.authToken);

        // LOCAL STORGE USER
        let userInfo = response.data.user;
        localStorage.setItem("user_info", JSON.stringify(userInfo));

        // LOCAL STORGE USER ID
        localStorage.setItem("user_id", userInfo.userId);

        //LOCAL STORAGE ORGANIZATION TYPE
        localStorage.setItem("org_type", userInfo.organizationType);

        setOpen(false);
       
        if(userInfo.userRole[0].tag === "GA"){
            console.log('user role', userInfo.userRole[0].tag);
            pageChange ();
        }

      })
      .catch((error) => {
          console.log(error.response.data.message)
        setOpen(false);
      });
    }


    return (
        <div className={classes.loginBlock}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h6" component="h1">
                Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                
                {/* USER NAME */}
                <FormControl variant="outlined" fullWidth className={classes.formInput}>
                    <InputLabel htmlFor="userName">User Name</InputLabel>
                    <OutlinedInput type="email" id="userName" name="userName" value={login.userName} label="User Name" onChange={handleInputChange} inputRef={register({required: true, pattern: /^\S+@\S+$/i})} />
                    <FormHelperText>
                        {errors.userName &&
                        errors.userName.type === "required" &&
                        errorMessage(required)}
                        {errors.userName &&
                        errors.userName.type === "pattern" &&
                        errorMessage(emailPattern)}
                    </FormHelperText>
                </FormControl>

                {/* PASSWORD */}
                <FormControl variant="outlined" fullWidth className={classes.formInput}>

                    <InputLabel htmlFor="userName">Password</InputLabel>
                    <OutlinedInput type={login.showPassword ? 'text' : 'password'} id="password" name="password" value={login.password} label="Password" onChange={handleInputChange} endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            {login.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    } inputRef={register({required: true})}/>
                    <FormHelperText>
                        {errors.password &&
                        errors.password.type === "required" &&
                        errorMessage(required)}
                    </FormHelperText>
                </FormControl>
                
                <FormControlLabel
                control={<Checkbox value={login.rember} color="primary" />}
                label="Remember me"
                />

                {/* LOGIN BUTTON */}
                <Button type="submit" className={classes.submit} variant="contained" size="large" fullWidth color="primary">Login</Button>

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>

            </form>
            <BackLoad open={open}/>
        </div>
    );
}

export default LoginPage;