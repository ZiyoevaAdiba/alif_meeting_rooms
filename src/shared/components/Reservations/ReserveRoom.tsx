import { Box, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { History } from 'history';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reservationSuccess } from '../../../store/actions/reservations';
import { IRootReducer } from '../../../store/reducers';
import { Form } from './Form';
import { getFilteredMRs } from './getFilteredMRs';
import { ReservationTable } from './ReservationTable';

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    columnGap: 70,
  },

  CardsContainer: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '1000px',
      minHeight: 500,
      padding: 20,
    },
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
  },

  requests_header: {
    fontSize: 40
  },
}));

interface IReserveRoom {
  selectedCity: string, 
  history: History, 
  selectedBuilding: string, 
  open: boolean, 
  setOpen: (state: boolean) => void
}

export const ReserveRoom: FC<IReserveRoom> = ({ selectedCity, history, selectedBuilding, open, setOpen }) => {
  const classes = useStyles();
  const {
    booking,
    addError,
    error
  } = useSelector((state: IRootReducer) => state.reservationsReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    getFilteredMRs(selectedCity, history, selectedBuilding, dispatch);
    dispatch(reservationSuccess())
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

          <Form
            setOpen={setOpen}
            booking={booking} 
            addError={addError}
            selectedCity={selectedCity}
            history={history}
            selectedBuilding={selectedBuilding}
          />
          <ReservationTable
            booking={booking}
            error={error}
          />
        </DialogContent>

      </Dialog>
    </Box>
  );
}
