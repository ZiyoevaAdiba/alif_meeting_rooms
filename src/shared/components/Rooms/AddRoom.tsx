import React from 'react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { fieldRoom, room } from './MeetingRooms';
import { requestAddRoom } from '../../../store/actions/getRooms';
import { RoomSchema } from '../../validations/RoomValidation';
import { useStyles } from '../Reservations/Form';



export const AddRoom = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <Box>
      <Button
        variant="outlined"
        className={classes.btnReserve}
        onClick={handleClickOpen}
      >
        Добавить Meeting Room
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление Meeting Room-а</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы добавить Meeting Room заполните форму.
          </DialogContentText>
          <Formik
            initialValues={room}
            validationSchema={RoomSchema}
            onSubmit={(values, { setSubmitting }) => {

              values.status = (values.status === 'true')
                ? true
                : false;
              delete values.status;
              dispatch(requestAddRoom(values, setSubmitting));
              handleClose();
            }
            }
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }: any) => (
              <Form
                onSubmit={handleSubmit}
                className={classes.signUpForm}
              >
                <TextField
                  className={classes.inputGap}
                  name={fieldRoom.number}
                  label="Номер"
                  fullWidth
                  error={Boolean(touched.number && errors.number)}
                  helperText={touched.number && errors.number}
                  onChange={handleChange}
                  value={values.number}
                  onBlur={handleBlur}
                  type='number'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldRoom.name}
                  label="Название"
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  type='text'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldRoom.city}
                  label="Город"
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                  fullWidth
                  onChange={handleChange}
                  value={values.city}
                  onBlur={handleBlur}
                  type='text'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldRoom.color}
                  label="Цвет"
                  fullWidth
                  error={Boolean(touched.color && errors.color)}
                  helperText={touched.color && errors.color}
                  onChange={handleChange}
                  value={values.color}
                  onBlur={handleBlur}
                  type='text'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldRoom.place}
                  label="Расположение"
                  fullWidth
                  error={Boolean(touched.place && errors.place)}
                  helperText={touched.place && errors.place}
                  onChange={handleChange}
                  value={values.place}
                  onBlur={handleBlur}
                  type='text'
                />


                <InputLabel
                  className={classes.inputGap}
                  style={{ marginTop: '30px' }}
                  id="demo-simple-select-label"
                >Состояние meeting room-a
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={values.status}
                  onChange={handleChange}
                  name={fieldRoom.status}
                  fullWidth
                >
                  <MenuItem value={'true'}>Доступен</MenuItem>
                  <MenuItem value={'false'}>Недоступен</MenuItem>
                </Select>
                <DialogActions>
                  <Button
                    type='submit'
                    // onClick={handleClose} 
                    variant='outlined'
                    className={classes.btnReserve}
                  >
                    Добавить
                  </Button>
                  <Button
                    onClick={handleClose}
                    className={classes.btnReserve}
                  >
                    отмена
                  </Button>
                </DialogActions>

              </Form>
            )}
          </Formik>
        </DialogContent>

      </Dialog>
    </Box>
  );
}
