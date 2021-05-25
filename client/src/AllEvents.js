import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';

// const initialState = [{
//   title: "",
//   description: "",
//   startDate: new Date(),
//   imgKeys: [],
//   endDate: new Date(),
//   location: "",
//   isRSVP: false,
//   RSVPlist: [],
//   studentGroup: ""
// }];

export default function AllEvents() {
  let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";
  const [eventList, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/events/`)
      .then(response => {
        let events = response.data.events

        let allEventsListed = events.map((event) =>
          <h2>{event.title}</h2>
        )

        setEvents(allEventsListed)
      }).catch(error => {
        console.log(error);
      });
  });

  return (
    eventList
  );
}