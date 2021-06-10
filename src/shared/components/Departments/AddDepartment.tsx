import React, { ChangeEvent, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { requestAddDepartment } from '../../../store/actions/departments';

export const AddDepartment = () => {
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
    // console.log('value', e.target.value);
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
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
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
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              type='submit'
            >
              Добавить
            </Button>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
