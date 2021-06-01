import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  linkText: {
    textDecoration: `none`,
    color: `white`
  }
})

const EventList = ({events}) => {
  const classes = useStyles();

  const _get_buttons = (event) => {
    if (window.location.href.includes("/dashboard")) {
      return (
       <Button
         variant="contained"
         color="primary"
         component={Link}
         to={`/edit-event?eventId=${event._id}`}
         disableElevation
         className={`${classes.linkText} ${classes.buttonMargin}`}
       >
       Editar Evento
       </Button>
      )
    }
  }

  return (
    <div>

      <div className="columnHeaders" >
          <h2 className="EventDate">Fecha</h2>
          <h2 className="EventTitleOrg">Evento</h2>
          <h2 className="EventLocation">Lugar</h2>
      </div>
      <div className="EventsContainer">

        {
          events.map((event) => {
            event.startDate = new Date(event.startDate)
            return (
              <div key={event._id}>
                <div className="EventCard">
                  <div className="EventDate">
                    <div className="EventDateDay">
                      {new Intl.DateTimeFormat("es-MX", {
                        day: "numeric",
                      }).format(event.startDate)}
                    </div>
                    <div>
                      {new Intl.DateTimeFormat("es-MX", {
                        month: "long",
                      }).format(event.startDate).toLocaleUpperCase()}
                    </div>
                  </div>
                  <div className="EventTitleOrg">
                    <div className="EventTitle"> {event.title} </div>
                    <div className="EventDetails"> {event.studentGroup} </div>
                  </div>
                  <div className="EventLocation">
                    <div className="EventDetails"> {event.location} </div>
                  </div>
                  <div className="EventDetails">
                    {_get_buttons(event)}
                    <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/event?eventId=${event._id}`}
                    disableElevation
                    className={classes.linkText}
                    >
                    Ver más
                    </Button>
                  </div>
                </div>
                <hr></hr>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default EventList;
