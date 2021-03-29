import React,  {useState} from 'react';
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { 
        Typography, 
        Avatar, 
        FormControl, 
        FormHelperText, 
        InputLabel, 
        OutlinedInput,
        InputAdornment,
        IconButton,
        Button
    } 
from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
    formInput: {
        marginBottom: '15px'
    },
    invalidFeedback: {
        color: 'red'
    }
    
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

    const classes = loginStyle();
    const [login, setLogin] = useState (initialValue);
    const { register, handleSubmit, watch, errors } = useForm();

    // INPUT CHANGE FUNCTIONS
    const handleInputChange = event => {
        const {name, value} = event.target;
        setLogin({ ...login, [name]: value });
    }

    // SHOW PASSWORD FUNCTIONS
    const handleClickShowPassword = () => {
        setLogin({ ...login, showPassword: !login.showPassword});
    }

    // LOGIN FUNCTIONS
    const onSubmit = data => {
        console.log(data);
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

                {/* LOGIN BUTTON */}
                <Button type="submit" variant="contained" size="large" fullWidth color="primary">Login</Button>

            </form>
        </div>
    );
}

export default LoginPage;