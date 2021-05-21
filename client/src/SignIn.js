import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    "& h2": {
      marginTop: theme.spacing(4)
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  centerText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container >
          <Grid item md={6} className={classes.title}>
          <Typography component="h1" variant="h2">
            CE News
          </Typography>
          <Typography component="h2" variant="subtitle1">
            Eventos Estudiantiles
          </Typography>

          </Grid>
          <Grid item md={6}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                Inicia de Sesión
              </Typography>
              <Box mt={5} width="60%">
                <Typography variant="subtitle1" align="center">
                  Solo para estudiantes colaboradores del Tec de Monterrey
                </Typography>
                <Box mt={2} className={classes.centerText}>

                  <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Inicio de sesión con Google"
                      onSuccess={_login}
                      onFailure={_loginFailure}
                      cookiePolicy={'single_host_origin'}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          
        </Grid>
      </div>
    </Container>
  );
}