import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Papa, { parse } from "papaparse";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import EventModal from "./components/EventModal";
import eventColours from "./eventColours";
import Filters from "./components/Filters";
import TheCalendar from "./components/TheCalendar";

const localizer = momentLocalizer(moment);

function App() {
  /* -------------------------------------------------------------------------
  Transform .csv data
  ------------------------------------------------------------------------- */
  const transformCSV = (url) => {
    return fetch(url)
      .then((res) => res.text())
      .then((data) => {
        const parsedData = Papa.parse(data);
        const header = parsedData.data[0];
        const transformedData = [];
        parsedData.data.slice(1, parsedData.data.length - 1).forEach((row) => {
          const newObj = {};
          for (let i = 0; i < row.length; i++) {
            newObj[header[i]] = row[i];
          }
          transformedData.push(newObj);
        });
        return transformedData;
      });
  };

  /* -------------------------------------------------------------------------
  State to store .csv data
  ------------------------------------------------------------------------- */
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    Promise.all([
      transformCSV("./xitcd.csv"),
      transformCSV("./itcd.csv"),
      transformCSV("./xcolab.csv"),
      transformCSV("./colab.csv"),
    ]).then((results) => {
      setAllData(results.flat());
    });
  }, []);

  /* -------------------------------------------------------------------------
  Setting up the FILTERS
  ------------------------------------------------------------------------- */
  //* 11 different room NAMES
  let roomNames = [];
  allData.forEach((event) => roomNames.push(event.name));
  roomNames = [...new Set(roomNames)];

  //* 3 different room TYPES
  let roomTypes = [];
  allData.forEach((event) => roomTypes.push(event.type));
  roomTypes = [...new Set(roomTypes)];

  //* 2 different STATUS
  let roomStatus = [];
  allData.forEach((event) => roomStatus.push(event.status));
  roomStatus = [...new Set(roomStatus)];

  let roomRqmts = [...roomNames, ...roomTypes];
  roomRqmts = roomRqmts.map((item) =>
    item
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")
  );

  /* -------------------------------------------------------------------------
  Setting up ROOM / EVENT COLOURS
  ------------------------------------------------------------------------- */
  const roomColours = {};
  roomNames.forEach((room, index) => {
    roomColours[room] = {};
    roomColours[room].backgroundColor = eventColours[index];
    roomColours[room].fontColor = "#ffffff";
  });

  /* -------------------------------------------------------------------------
  Setting up EVENT DISPLAY on calendar
  ------------------------------------------------------------------------- */
  const testEvents = [];
  allData?.forEach((event) => {
    const eventObj = {};
    eventObj.id = event.uuid;
    eventObj.title =
      `[${event.status
        .toLowerCase()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))}] ` + event.name;
    eventObj.name = event.name;
    eventObj.tags = [
      event.status[0] + event.status.slice(1).toLowerCase(),
      event.name
        .toLowerCase()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(""),
      event.type
        .toLowerCase()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(""),
    ];
    eventObj.start = new Date(
      moment(event.date + " " + event.start_time).format()
    );
    eventObj.end = new Date(moment(event.date + " " + event.end_time).format());
    eventObj.status = event.status;
    eventObj.type = event.type;
    testEvents.push(eventObj);
  });

  /* -------------------------------------------------------------------------
  Setting up EVENT DISPLAY on calendar
  ------------------------------------------------------------------------- */
  const [filtersSelected, setFiltersSelected] = useState({
    bookingStatus: "AllStatus",
    roomRequirements: [],
  });

  const [store, setStore] = useState([]);
  useEffect(() => {
    const toBeDisplayed = [];
    let remaining = [...testEvents];
    if (filtersSelected.bookingStatus !== "AllStatus") {
      remaining = remaining.filter(
        (event) => event.status === filtersSelected.bookingStatus.toUpperCase()
      );
    }

    for (const event of remaining) {
      if (
        filtersSelected.roomRequirements.some((filter) =>
          event.tags.includes(filter)
        )
      )
        toBeDisplayed.push(event);
    }
    setStore(toBeDisplayed);
  }, [filtersSelected]);
  // console.log("store:", store);

  /* -------------------------------------------------------------------------
  SELECTION of individual event 
  ------------------------------------------------------------------------- */
  const [eventDetails, setEventDetails] = useState({});
  const [open, setOpen] = useState(false);

  return (
    <div className="App" style={{ height: "500pt", display: "flex" }}>
      <EventModal open={open} setOpen={setOpen} eventDetails={eventDetails} />
      <Filters
        roomStatus={roomStatus}
        roomTypes={roomTypes}
        roomNames={roomNames}
        filtersSelected={filtersSelected}
        setFiltersSelected={setFiltersSelected}
        roomColours={roomColours}
      />
      <TheCalendar
          store={store}
          localizer={localizer}
          roomColours={roomColours}
          setOpen={setOpen}
          setEventDetails={setEventDetails}
        />
    </div>
  );
}

export default App;
