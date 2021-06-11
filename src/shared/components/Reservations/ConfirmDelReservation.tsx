import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { cancelReservationDelete, requestDeleteReservation } from '../../../store/actions/reservations';

export const ConfirmDelReservation = ({page, history} : any ) => {
  const { showAlert } = useSelector((state: IRootReducer) => state.getReservationsReducer)
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [showAlert])

  const handleClose = () => {
    dispatch(cancelReservationDelete())
  };

  const handleConfirm = () => {
    dispatch(requestDeleteReservation(page, history, showAlert))
    handleClose();
    // handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Предупреждение"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что вы хотите удалить бронь?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Подтвердить
          </Button>
          <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
        
        </DialogActions>
      </Dialog>
    </>
  );
}
