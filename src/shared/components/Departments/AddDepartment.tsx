import React, { ChangeEvent, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { requestAddDepartment } from '../../../store/actions/departments';
import { useStyles } from '../Reservations/Form';

export const AddDepartment = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [depInput, setDepInput] = React.useState('');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepInput(e.target.value);
    // setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestAddDepartment(depInput));
    handleClose();
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
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
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
