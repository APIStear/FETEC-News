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
        console.log(response.data.events)
        return response.data.events
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // _events();

  let events = _events()


  const nums = [1,2,3] 
  const eventList = nums.map((event) =>
    <h2>{event}</h2>
  )

  return (
    eventList

    // <h1>Hello</h1>

    // <tbody>
    //   {events.map(function(events, i){
    //     return <Typography obj={events} key={i} >Hello</Typography>;
    //   })}
    // </tbody>
  );
}