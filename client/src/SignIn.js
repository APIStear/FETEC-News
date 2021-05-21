import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { Paper } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Comite Electoral
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(loginHandler) {
  const classes = useStyles();
  const _login = async googleData => {
    console.log('googleData :>> ', googleData);
    const url = process.env.REACT_APP_API_DOMAIN + "/api/auth/google";
    console.log('url :>> ', url);
    return axios
      .post(url, {
        token: googleData.tokenId
      })
      .then(response => {
        // localStorage.setItem("token", response.data.token);
        console.log('response :>> ', response);
      })
      .catch(error => {
        if(error.response) {
          return error.response.data.message
        } else return error.message;
      })
      
  }
  const _loginFailure = async error => {
    console.log('error :>> ', error);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicia de Sesión
        </Typography>
        <Box mt={5} >
          <Typography justify="center" variant="subtitle1">
            Solo para estudiantes colaboradores del Tec de Monterrey
          </Typography>
          <Box mt={2}>

            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Inicio de sesión con Google"
                onSuccess={_login}
                onFailure={_loginFailure}
                cookiePolicy={'single_host_origin'}
            />
          </Box>
        </Box>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}