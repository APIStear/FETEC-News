import React from 'react';
import axios from "axios";
import { Button, Container, Grid, TextField, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacingBottom: {
    marginBottom: theme.spacing(4),
  },

  spacingTop: {
    marginTop: theme.spacing(4),
  }
}));

export default function EventNew() {
  const classes = useStyles();

  const _createEvent = _ => {
    let title = document.getElementById("title").value;
    let studentGroup = document.getElementById("studentGroup").value;
    let description = document.getElementById("description").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let imgKeys = document.getElementById("imgKeys").value;
    let location = document.getElementById("location").value;

    console.log(title);
    console.log(studentGroup);
    console.log(description);
    console.log(startDate);
    console.log(endDate);
    console.log(imgKeys);
    console.log(location);

    // Y aquí es donde se hace el post...
  }
  
  return(
    <Container component="main" maxWidth="lg">
      <div className={classes.spacing}>
        <h1>Nuevo Evento</h1>
        <Grid container>
          <TextField id="title" fullWidth label="Titulo"/>
          <TextField id="studentGroup" fullWidth label="Grupo que lo organiza"/>
          <TextField id="description" fullWidth label="Descripción"/>
          <TextField id="startDate" fullWidth label="Fecha de Inicio"/>
          <TextField id="endDate" fullWidth label="Fecha fin"/>
          <TextField id="imgKeys" fullWidth label="URL de fotos"/>
          <TextField id="location" fullWidth label="Lugar"/>
          <Checkbox
            name="RSVP"
            color="primary"
            id="isRSVP"
            label="Employed"
          />
          <p>Hacer RSVP</p>
        </Grid>
        <Button variant="contained" color="primary" className={classes.spacingTop} onClick={_createEvent}>
          Crear evento
        </Button>
      </div>
    </Container>
  );
}
