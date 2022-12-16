import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";
import { useMediaQuery } from "@mui/material";

function EventModal({ open, setOpen, eventDetails }) {
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" 
          // style={fontSizeToUse}
          style={ useMediaQuery('(max-width: 600px)') ? {fontSize: "1.2rem"} : {fontSize: "2rem"}}
          >
            Booking Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} 
          // style={{ fontSize: "2vw" }}
          style={ useMediaQuery('(max-width: 600px)') ? {fontSize: "0.9rem"} : {fontSize: "1rem"}}
          >
            Room Name: <strong>{eventDetails.name}</strong> <br />
            Room Type:{" "}
            <strong>
              {eventDetails?.type
                ?.toLowerCase()
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </strong>{" "}
            <br />
            Booking Status:{" "}
            <strong>
              {eventDetails?.status
                ?.toLowerCase()
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </strong>{" "}
            <br />
            Start Time:{" "}
            <strong>{moment(eventDetails.start).format("LLLL")}</strong> <br />
            End Time: <strong>{moment(eventDetails.end).format("LLLL")}</strong>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default EventModal;
