import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {getToken} from './TokenUtilities';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const RSVPtable = ({ eventId, toast }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/events/${eventId}/users`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then(response => {
      setUsers(response.data.users);
    })
    .catch(error => {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Hubo un error");
      }
    })
  }, [])
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Matricula</TableCell>
            <TableCell align="right">Carrera</TableCell>
            <TableCell align="right">Semestre</TableCell>
            <TableCell align="right">Plan</TableCell>
            <TableCell align="right">Género</TableCell>
            <TableCell align="right">Correo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.studentId}</TableCell>
              <TableCell align="right">{user.careerProgram}</TableCell>
              <TableCell align="right">{user.semester}</TableCell>
              <TableCell align="right">{user.schoolProgram}</TableCell>
              <TableCell align="right">{user.gender}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RSVPtable;