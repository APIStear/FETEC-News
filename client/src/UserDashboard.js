import { useEffect, useReducer } from 'react';
import { Button, Container, Grid, TextField, Typography, FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router';
import Image from 'material-ui-image'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getUserId, getToken, deleteToken, deleteUserId } from './TokenUtilities';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePicture: {
    padding: theme.spacing(4, 2,8),
    maxWidth: '30%'
  },
  linkText: {
    // marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    padding: [[theme.spacing(1), theme.spacing(3)]],
    display: 'block'
  },
  title: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(4),
    "& h2": {
      marginTop: theme.spacing(1)
    },
    "& input": {
      paddingTop: theme.spacing(1.5)
    },
  },
  formCtl: {
    paddingTop: theme.spacing(1.5),
    minWidth: 195
  },
  textFieldAlign: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
  }
}));

const initialState = {
  name: "",
  profilePicture: "",
  studentId: "",
  email: "",
  gender: "",
  careerProgram: "",
  semester: 0,
  isTec21: false,
  schoolProgram: ""
}


export function isWhiteSpaceOrEmpty(input) {
  return /^\s*$/i.test(input);
}

export function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}
const UserDashboard = ({history}) => {
  let location = useLocation();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    if(location && location.state && location.state.error !== "") {
      if(location.state.error !== "") {
        toast.error(location.state.error);
      }
      if(location.state.success !== "") {
        toast.success(location.state.success);
      }
    }
    
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/users/${getUserId()}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then(response => {
      dispatch({field: 'name', value: response.data.user.name})
      dispatch({field: 'profilePicture', value: response.data.user.profilePicture})
      dispatch({field: 'studentId', value: response.data.user.studentId})
      dispatch({field: 'email', value: response.data.user.email})
      dispatch({field: 'gender', value: response.data.user.gender})
      dispatch({field: 'careerProgram', value: response.data.user.careerProgram})
      dispatch({field: 'semester', value: response.data.user.semester})
      dispatch({field: 'isTec21', value: response.data.user.isTec21})
      dispatch({field: 'schoolProgram', value: response.data.user.schoolProgram})
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 405) {
          deleteToken();
          deleteUserId();
          history.push("/login", {from: location, error: 'Debes iniciar sesión para hacer eso.'});
        } else {
          toast.error(error.response.data.message)
        }
      } else {
        toast.error("Hubo un error")
      }
    })
  }, [location, history])
    
  const _edit = () => {
    if(isWhiteSpaceOrEmpty(state.careerProgram)) {
      return toast.error("Debes elegir una carrera");
    } else if(isWhiteSpaceOrEmpty(state.gender)) {
      return toast.error("Debes elegir un género");
    } else if(isWhiteSpaceOrEmpty(state.schoolProgram)) {
      return toast.error("Debes elegir un plan");
    } else if(!state.semester || state.semester >= 13 || state.semester <= 0) {
      return toast.error("Semestre invalido")
    }

    axios.put(`${process.env.REACT_APP_API_DOMAIN}/api/users/${getUserId()}`,
    {
      ...state
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(() => {
        toast.success("Datos actualizados exitosamente!")
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 405) {
            deleteToken();
            deleteUserId();
            history.push("/login", {from: location, error: 'Debes iniciar sesión para hacer eso.'});
          } else {
            toast.error(error.response.data.message)
          }
        } else {
          toast.error("Hubo un error")
        }
      }) 
  }
  const onChange = (e) => {
    let { name, value } = e.target;
    if(name === 'semester') {
      // Checking for integer
      let parsed = parseInt(value);
      dispatch({field: name, value: parsed})
      return null;
    } else {
      dispatch({ field: name, value: value })
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer 
          position="top-right"
          draggable={false}
          autoClose={4000}

      />
      <div className={classes.paper}>
        <Grid container>
          <Grid item md={4} xs={12} className={classes.profilePicture}>
            <Image src={state.profilePicture} alt='Profile Picture' imageStyle={{'objectFit':'contain'}}/>
          </Grid>
          <Grid item md={8} xs={12} className={classes.title}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.linkText}
              onClick={_edit}
            >
              Editar
            </Button>
            <Typography component='h1' variant='h4'>
              {state.name}
            </Typography>
            <Typography component='h2' variant='subtitle2'>
              {state.studentId}
            </Typography>
            <form className={classes.textFieldAlign}>

              <Grid container>
                <Grid item xs={2}>
                  <Typography component='h2' variant='h6'>
                    Carrera
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField 
                      name='careerProgram'
                      value={state.careerProgram}
                      onChange={onChange}
                      required
                  />
                </Grid>
                <Grid item xs={2} >
                  <Typography component='h2' variant='h6'>
                    Género
                  </Typography>
                </Grid>
                <Grid item xs={10} >
                  <FormControl required className={classes.formCtl}>
                    <Select
                      name='gender'
                      value={state.gender}
                      onChange={onChange}
                      autoWidth
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='Masculino'>Masculino</MenuItem>
                      <MenuItem value='Femenino'>Femenino</MenuItem>
                      <MenuItem value='Otro'>Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2} >
                  <Typography component='h2' variant='h6'>
                    Semestre
                  </Typography>
                </Grid>
                <Grid item xs={10} >
                  <TextField type='number' name='semester' value={state.semester} onChange={onChange}/>
                </Grid>
                <Grid item xs={2} >
                  <Typography component='h2' variant='h6'>
                    Plan
                  </Typography>
                </Grid>
                <Grid item xs={10} >
                  <TextField name='schoolProgram' value={state.schoolProgram} onChange={onChange}/>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default UserDashboard;