import { useMediaQuery } from "@mui/material";

function Filters({ roomStatus, roomTypes, roomNames, filtersSelected, setFiltersSelected, roomColours}) {

    const handleRoomStatus = (e) => {
        const { name, value } = e.target;
        setFiltersSelected({ ...filtersSelected, [name]: value });
      };
    
      // Room TYPE + Room Indiv
      const handleRmRqmt = (e) => {
        if (!filtersSelected.roomRequirements.includes(e.target.value)) {
          setFiltersSelected({
            ...filtersSelected,
            roomRequirements: [...filtersSelected.roomRequirements, e.target.value],
          });
        } else {
          setFiltersSelected({
            ...filtersSelected,
            roomRequirements: filtersSelected.roomRequirements.filter(
              (tag) => tag !== e.target.value
            ),
          });
        }
      };

  return (
    <div
      className="filter"
      // style={{ width: "20vw", padding: "1rem", fontSize: "1vmax" }}
      style={ useMediaQuery('(max-width: 900px)') ? {width: "20vw", padding: "1rem", fontSize: "1.5vmax"} : {width: "20vw", padding: "1rem", fontSize: "1vmax"}}
    >
      {/* ROOM STATUS FILTER */}
      <div style={{ margin: "1vw", marginBottom:"3vw" }}>
        <h4>Room Status</h4>
        {roomStatus.map((status, index) => {
          const pascalCase = status[0] + status.slice(1).toLowerCase();
          return (
            <div>
              <input
                key={index}
                type="radio"
                id={pascalCase}
                name="bookingStatus"
                value={pascalCase}
                checked={filtersSelected["bookingStatus"] === pascalCase}
                onChange={(e) => {
                  handleRoomStatus(e);
                }}
              />
              {pascalCase}
            </div>
          );
        })}
        <div>
          <input
            type="radio"
            id="AllStatus"
            name="bookingStatus"
            value="AllStatus"
            checked={filtersSelected["bookingStatus"] === "AllStatus"}
            onChange={(e) => {
              handleRoomStatus(e);
            }}
          />
          All status
        </div>
      </div>

      {/* ROOM TYPE FILTER */}
      <div style={{ margin: "1vw", marginBottom:"3vw" }}>
        <h4>Room Type</h4>

        {roomTypes.map((type, index) => {
          const pascalCase = type
            .toLowerCase()
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join("");

          return (
            <div>
              <input
                key={index}
                type="checkbox"
                id={pascalCase}
                name={pascalCase}
                value={pascalCase}
                checked={filtersSelected["roomRequirements"].includes(
                  pascalCase
                )}
                // checked={true}
                onChange={(e) => handleRmRqmt(e)}
              />
              <label for={pascalCase}>
                {type[0] + type.slice(1).toLowerCase()}
              </label>
            </div>
          );
        })}
      </div>

      {/* INDIVIDUAL ROOM FILTER */}
      <div style={{ margin: "1vw" }}>
        <h4>Individual Rooms</h4>
        {roomNames.map((name, index) => {
          const pascalCase = name
            .toLowerCase()
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join("");

          return (
            <div>
              <input
                key={index}
                type="checkbox"
                id={pascalCase}
                name={pascalCase}
                value={pascalCase}
                onChange={(e) => handleRmRqmt(e)}
              />
              <span
                style={{
                  backgroundColor: roomColours[name].backgroundColor,
                  color: roomColours[name].backgroundColor,
                  marginRight: "0.2rem",
                }}
              >
                []
              </span>
              <label for={pascalCase}>
                {name[0] + name.slice(1).toLowerCase()}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
