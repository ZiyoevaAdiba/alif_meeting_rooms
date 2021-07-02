import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  DialogActions,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { addHours, format } from 'date-fns';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservationSuccess, requestAddReservation } from '../../../store/actions/reservations';
import { IRootReducer } from '../../../store/reducers';
import { IReservation } from '../../../store/reducers/reservations/interfaces';
import { ReserveSchema } from '../../validations/Reservation';
import { ErrorDiv } from '../ErrorDiv';
import { getFilteredMRs } from './getFilteredMRs';

export const useStyles = makeStyles((theme) => ({
  signUpForm: {
    '& input': {
      marginTop: 5,
    }
  },
  inputGap: {
    margin: 5,
  },
  btnReserve: {
    color: 'white',
    backgroundColor: 'rgb(57 185 127)',
  },

  btnCancel: {
    color: 'rgb(57 185 127)',
  }
}));


export const Form = ({selectedCity, history, selectedBuilding, setOpen, booking, addError }: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    userData,
  } = useSelector((state: IRootReducer) => state.getUserDataReducer);

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(),
  );
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    new Date(),
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
    addHours(new Date() || 0, 1),
  );

  const initBooking: IReservation = {
    start_time: selectedStartTime,
    end_time: selectedEndTime,
    date: selectedDate,
    purpose: '',
    user_id: '',
    meeting_room_id: ''
  }
  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedStartTime(date);
    setSelectedEndTime(date);
  };

  const handleClose = () => {
    dispatch(addReservationSuccess());
    getFilteredMRs(selectedCity, history, selectedBuilding, dispatch)
    setOpen(false)
  }
  
  return (
    <Formik
      initialValues={initBooking}
      validationSchema={ReserveSchema}
      onSubmit={(values) => {

        delete values.date;

        values.start_time = format(selectedStartTime || 0, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        values.end_time = format(selectedEndTime || 0, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        values.user_id = userData.id;
        values.meeting_room_id =
          (typeof booking === 'string')
            ? booking
            : booking[0]?.meeting_room.id;

        dispatch(requestAddReservation(values, setOpen, selectedCity, history, selectedBuilding));
      }
      }
    >
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        errors,
      }: any) => (

        <form
          onSubmit={handleSubmit}
          className={classes.signUpForm}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              container
              justify="space-around"
            >
              <TextField
                className={classes.inputGap}
                name='purpose'
                label="Цель брони"
                fullWidth
                onChange={handleChange}
                value={values.purpose}
                type='text'
                error={Boolean(touched.purpose && errors.purpose)}
              />

              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                name='date'
                label="Выберите дату"
                value={selectedDate}
                fullWidth
                error={Boolean(touched.date && errors.date)}
                onChange={(date) => handleDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                name="start_time"
                fullWidth
                ampm={false}
                error={Boolean(touched.start_time && errors.start_time)}
                label="Выберите время начала"
                value={selectedStartTime}
                onChange={(date) => setSelectedStartTime(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                name="end_time"
                label="Выберите время завершения"
                value={selectedEndTime}
                fullWidth
                ampm={false}
                error={Boolean(touched.end_time && errors.end_time)}
                onChange={(date) => setSelectedEndTime(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <DialogActions>
            <Button
              type='submit'
              variant='contained'
              className={classes.btnReserve}
            >
              Забронировать
            </Button>
            <Button
              onClick={handleClose}
              className={classes.btnCancel}
            >
              отмена
            </Button>
          </DialogActions>
          {
            addError
            &&
            <ErrorDiv error={addError} />
          }
        </form>

      )}
    </Formik>
  )
}
