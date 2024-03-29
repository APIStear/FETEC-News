import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { Paper } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isWhiteSpaceOrEmpty } from './UserDashboard';

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
  centerText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SignIn({loginHandler}) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  const _login = async googleData => {
    let {respError, firstLogin, user} = await _loginHandler(googleData.tokenId);
    if (respError) {
      toast.error(respError)
    } else if(firstLogin){
      history.push("/dashboard", {success: "Bienvenid@! Registra tus datos de perfil."})
    } else {
      if(isWhiteSpaceOrEmpty(user.gender) || isWhiteSpaceOrEmpty(user.careerProgram) || isWhiteSpaceOrEmpty(user.schoolProgram)) {
        history.push("/dashboard", {success: "Inicio de sesión exitoso. Registra tus datos de perfil."})
      } else {
        let { from } = location.state || { from: { pathname: "/" } };
        history.replace(from, {success: "Inicio de sesión exitoso"})
      }
    }
  }

  const _loginHandler = token => {
    const url = process.env.REACT_APP_API_DOMAIN + "/api/auth/google";
    return axios
      .post(url, { token })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        loginHandler(true);
        return {respError: null, firstLogin: response.data.firstLogin, user: response.data.user}
      })
      .catch(error => {
        if(error.response) {
          return {respError: error.response.data.message};
        } else return {respError: error.message};
      })

  }
  const _loginFailure = async error => {
    toast.error(error);
    toast.error(error.details);
  }

  useEffect(() => {
    document.title= 'Login | Comité Ejecutivo'
    if(location && location.state && location.state.error !== "") {
      toast.error(location.state.error)
    }
    if(localStorage.getItem("token")){
      // Check first if usable, if not stay
      history.push("/", {success: "Ya iniciaste sesión."})
    }
  }, [history, location]);

  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer
          position="top-right"
          draggable={false}
          autoClose={4000}

        />
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container >
          <Grid item md={6} className={classes.title}>
          <Typography component="h1" variant="h2">
            Comité Ejecutivo
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
                  Solo para estudiantes y colaboradores del Tec de Monterrey
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
