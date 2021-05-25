import React from 'react';
import axios from "axios";

const initialState = {
  title: "",
  description: "",
  startDate: new Date(),
  imgKeys: [],
  endDate: new Date(),
  location: "",
  isRSVP: false,
  RSVPlist: [],
  studentGroup: ""
};

export default function EventNew() {
  let url = process.env.REACT_APP_API_DOMAIN || "http://localhost:4000";

  function _events() {
    return axios.get(`${url}/api/events/`)
      .then((response) => {
        let events = response.data.events
        return events.map((event) =>
          <h2>{event.title}</h2>
        )

        // return eventList;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let events = _events()


  // let nums = [1,2,3] 
  // let eventList = nums.map((event) =>
  //   <h2>{event}</h2>
  // )

  return (
    events

    // <h1>Hello</h1>

    // <tbody>
    //   {events.map(function(events, i){
    //     return <Typography obj={events} key={i} >Hello</Typography>;
    //   })}
    // </tbody>
  );
}