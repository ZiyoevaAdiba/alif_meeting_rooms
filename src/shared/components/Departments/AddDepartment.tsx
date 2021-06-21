import React, { ChangeEvent, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addDepSuccess, requestAddDepartment } from '../../../store/actions/departments';
import { useStyles } from '../Reservations/Form';
import { hideOverflow, showOverflow } from '../../handlerStyle/bodyOverflow';
import { IRootReducer } from '../../../store/reducers';
import { ErrorDiv } from '../ErrorDiv';

export const AddDepartment = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [depInput, setDepInput] = React.useState('');
  const dispatch = useDispatch();
  const { addError } = useSelector((state: IRootReducer) => state.departmentsReducer)
  const handleClickOpen = () => {
    hideOverflow();
    setOpen(true);
  };

  const handleClose = () => {
    showOverflow();
    setOpen(false);
    dispatch(addDepSuccess());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepInput(e.target.value);
    // setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestAddDepartment(depInput, setOpen));
    // handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={classes.btnReserve}
      >
        Добавить Отдел
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление отдела</DialogTitle>
        <form
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <TextField
              autoFocus
              name="name"
              label="Наименование"
              type="text"
              onChange={handleChange}
              required
            />
            {
            (addError)
            &&
            <ErrorDiv
              error={addError}
            />
          }
          </DialogContent>
          
          <DialogActions>
            <Button
              variant='contained'
              type='submit'
              className={classes.btnReserve}
            >
              Добавить
            </Button>
            <Button
              onClick={handleClose}
              className={classes.btnCancel}
            >
              Отмена
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
