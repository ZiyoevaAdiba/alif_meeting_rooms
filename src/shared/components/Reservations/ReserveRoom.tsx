import { Box, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { showOverflow } from '../../handlerStyle/bodyOverflow';
import { Form } from './Form';
import { ReservationTable } from './ReservationTable';


const useStyles = makeStyles((theme) => ({
  content: {
    // paddingTop: 20,
    display: "flex",
    columnGap: 70,
  },

  inputGap: {
    margin: 5,
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
  form: {
    background: "green"
  }
}));

export const ReserveRoom = ({ open, setOpen }: any) => {
  const classes = useStyles();
  const {
    booking,
    addError
  } = useSelector((state: IRootReducer) => state.reservationsReducer)

  const handleClose = () => {
    showOverflow();
    setOpen(false);
  }
  
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
            className={classes.form}
            setOpen={setOpen}
            booking={booking}
            addError={addError}
          />

          <ReservationTable
            booking={booking}
          />
        </DialogContent>

      </Dialog>
    </Box>
  );
}
