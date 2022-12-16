import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Papa, { parse } from "papaparse";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";

function TheCalendar({
  store,
  localizer,
  roomColours,
  setOpen,
  setEventDetails,
}) {
  const handleSelectedEvent = (event) => {
    setOpen(true);
    setEventDetails(event);
  };

  const messages = {
    agenda: "List",
    noEventsInRange: `There is no room booking during this period.`,
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Calendar
        events={store}
        startAccessor="start"
        endAccessor="end"
        // step={30}
        // timeslots={2}
        defaultDate={moment().toDate()}
        localizer={localizer}
        onSelectEvent={(event) => handleSelectedEvent(event)}
        eventPropGetter={(event) => {
          return event.status === "CANCELLED"
            ? {
                style: {
                  color: roomColours[event.name].backgroundColor,
                  backgroundColor: roomColours[event.name].fontColor,
                  fontSize: "0.8rem",
                  // opacity: 0.4,
                },
              }
            : {
                style: {
                  backgroundColor: roomColours[event.name].backgroundColor,
                  fontSize: "0.8rem",
                  color: roomColours[event.name].fontColor,
                },
              };
        }}
      />
    </div>
  );
}

export default TheCalendar;
