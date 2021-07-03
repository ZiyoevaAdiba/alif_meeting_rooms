import React, { ChangeEvent, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../Reservations/Form';
import { IRootReducer } from '../../../store/reducers';
import { ErrorDiv } from '../ErrorDiv';
import { addCitySuccess, requestAddCity } from '../../../store/actions/cities';

export const AddCity = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cityInput, setCityInput] = React.useState('');
  const dispatch = useDispatch();
  const { addError } = useSelector((state: IRootReducer) => state.citiesReducer)
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(addCitySuccess());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestAddCity(cityInput, setOpen));
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={classes.btnReserve}
      >
        Добавить Город
      </Button>
      <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление Города</DialogTitle>
        <form
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <TextField
              // autoFocus
              name="name"
              fullWidth
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
