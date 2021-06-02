import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { Paper, TextField, Button, Grid, Box, CssBaseline, Typography } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function checkInput(password) {
  return password !== "";
}

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
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white'
  },
}));


const Admin = ({ loginHandler }) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = 'Admin | Comité Ejecutivo'
    if(location && location.state && location.state.error !== "") {
      toast.error(location.state.error)
    }
    if(localStorage.getItem("token")){
      // Check first if usable, if not stay
      history.push("/events", {success: "Ya iniciaste sesión."})
    }
  }, [location, history]);

  const _login = e => {
    e.preventDefault();
    if(!checkInput(password)){
      return toast.error('Debes ingresar una contraseña')
    }
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/api/auth/admin`,
        {password})
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", "admin")
        loginHandler(true);
        history.push('/events', {success: "Inicio de sesión exitoso."})
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else return toast.error(error.message);
      });
  }

  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      _login(e);
    }
  };
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
          <Grid item xs={6} className={classes.title}>
          <Typography component="h1" variant="h2">
            Comité Ejecutivo
          </Typography>
          <Typography component="h2" variant="subtitle1">
            Eventos Estudiantiles
          </Typography>

          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                Inicia de Sesión
              </Typography>
              <Box mt={5} width="60%">
                <Typography variant="subtitle1" align='center'>
                  Login de administrador
                </Typography>
                <Box mt={2}>
                  <form>
                    <TextField
                        id='password'
                        label='Contraseña de admin'
                        type='password'
                        autoComplete='current-password'
                        fullWidth
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={_handleKeyDown}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={_login}
                    >
                      Sign In
                    </Button>
                  </form>
                </Box>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </div>
    </Container>
  );
}

export default Admin;
