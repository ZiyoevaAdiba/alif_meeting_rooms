import { Box, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { History } from "history";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reservationSuccess } from "../../../store/actions/reservations";
import { IRootReducer } from "../../../store/reducers";
import { AddReservationForm } from "./AddReservationForm";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    columnGap: 70,
  },

  CardsContainer: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: 500,
      minHeight: 500,
      padding: 20,
    },
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "100%",
  },
}));

interface IReserveRoom {
  date: string;
  selectedCity: string;
  history: History;
  selectedBuilding: string;
  open: boolean;
  setOpen: (state: boolean) => void;
  startTime: Date | null;
  endTime: Date | null;
  selectedRooms: string;
}

export const ReserveRoom: FC<IReserveRoom> = ({
  date,
  selectedCity,
  history,
  selectedBuilding,
  open,
  setOpen,
  startTime,
  endTime,
  selectedRooms,
}) => {
  const classes = useStyles();
  const { addError } = useSelector(
    (state: IRootReducer) => state.reservationsReducer
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(reservationSuccess());
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.CardsContainer}
      >
        <DialogTitle id="form-dialog-title">
          Для бронирования заполните форму.
        </DialogTitle>

        <DialogContent className={classes.content}>
          <AddReservationForm
            date={date}
            setOpen={setOpen}
            addError={addError}
            selectedCity={selectedCity}
            history={history}
            selectedBuilding={selectedBuilding}
            startTime={startTime}
            endTime={endTime}
            selectedRooms={selectedRooms}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
