import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';


export default function AllEvents() {
  let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
  const [eventList, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/events/`)
      .then(response => {
        let events = response.data.events
        let allEvents = events.map((event) =>
          <div key={event.title}>
            <Typography component='h5' variant='h5'>
              Titulo: {event.title}
                <Typography component='body2' variant='body2'>
                  <div> Descripción: {event.description} </div>
                  <div> startDate: {event.startDate} </div>
                  <div> endDate: {event.endDate} </div>
                  <div> location: {event.location} </div>
                  <div> studentGroup: {event.studentGroup} </div>
                </Typography>
            </Typography>
            <div>⠀</div>
          </div>
        )
        setEvents(allEvents)
      }).catch(error => {
        console.log(error);
      });
  });

  return (
    eventList
  );
}