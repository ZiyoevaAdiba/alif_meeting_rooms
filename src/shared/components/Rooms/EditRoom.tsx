import { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
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
import { useDispatch, useSelector } from 'react-redux';
import { fieldRoom } from './MeetingRooms';
import { requestEditRoom, resetEditing } from '../../../store/actions/getRooms';
import { IRootReducer } from '../../../store/reducers';
import { RoomSchema } from '../../validations/RoomValidation';


const useStyles = makeStyles(() => createStyles({

  signUpForm: {
    '& input': {
      marginTop: 5,
    }
  },

  inputGap: {
    margin: 5,
  },

}));

export const EditRoom = () => {
  const { room } = useSelector((state: IRootReducer) => state.getRoomsReducer)
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [room])

  const handleClose = () => {
    dispatch(resetEditing());
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Изменение Meeting Room-а</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы изменить Meeting Room отредактируйте нужные поля.
          </DialogContentText>
        <Formik
          initialValues={room}
          validationSchema={RoomSchema}
          onSubmit={(values) => {
            
            dispatch(requestEditRoom(values));
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
            isSubmitting,

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
                value={values?.number}
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
                value={values?.name}
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
                value={values?.city}
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
                value={values?.color}
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
                value={values?.place}
                onBlur={handleBlur}
                type='text'
              />


              <InputLabel
                className={classes.inputGap}
                style={{ marginTop: '30px' }}
                id="demo-simple-select-label"
              >
                Состояние meeting room-a
                </InputLabel>
              <Select
                id="demo-simple-select"
                value={values?.status}
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
                  variant='contained'
                  color="secondary"
                  >
                  Сохранить изменения
                </Button>
                <Button onClick={handleClose} color="primary">
                  отмена
                </Button>
              </DialogActions>
              
            </Form>
          )}
        </Formik>
      </DialogContent>

    </Dialog>
  );
}
