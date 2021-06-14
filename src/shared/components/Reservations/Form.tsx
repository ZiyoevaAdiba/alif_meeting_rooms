import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  DialogActions,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { format } from 'date-fns';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAddReservation } from '../../../store/actions/reservations';
import { IRootReducer } from '../../../store/reducers';
import { IReservation } from '../../../store/reducers/reservations/interfaces';

const useStyles = makeStyles((theme) => ({
  signUpForm: {
    '& input': {
      marginTop: 5,
    }
  },

  inputGap: {
    margin: 5,
  },

}));


export const Form = ({ setOpen }: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const initBooking: IReservation = {
    start_time: "",
    end_time: "",
    date: "",
    purpose: "",
    user_id: "",
  }
  const {
    userData
  } = useSelector((state: IRootReducer) => state.getUserDataReducer);

  const {
    booking
  } = useSelector((state: IRootReducer) => state.getMRReservationsReducer);

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(),
  );
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    new Date(),
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
    new Date(),
  );

  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedStartTime(date);
    setSelectedEndTime(date);
  };

  return (
    <Formik
      initialValues={initBooking}
      // validationSchema={RoomSchema}
      onSubmit={(values) => {
        values.start_time = format(selectedStartTime || 0, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        values.end_time = format(selectedEndTime || 0, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        console.log(userData.id);
        setOpen(false);
        delete values.date;
        values.meeting_room_id = booking[0]?.meeting_room.id;
        dispatch(requestAddReservation(values, userData.id, booking[0]?.meeting_room.id));
      }
      }
    >
      {({
        values, 
        handleChange,
        handleSubmit,
      }: any) => (

        <form
          onSubmit={handleSubmit}
          className={classes.signUpForm}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              container
              justify="space-around"
            // className={classes.CardsContainer}
            >
              <TextField
                className={classes.inputGap}
                name='purpose'
                label="Цель брони"
                fullWidth
                onChange={handleChange}
                value={values.purpose}
                type='text'
              />
              {/* <InputLabel
                className={classes.inputGap}
                style={{ marginTop: '30px' }}
                id="demo-simple-select-label"
              >Выбрать meeting room
              </InputLabel>
              <Select
                id="demo-simple-select"
                value={values.meeting_room_id}
                onChange={handleChange}
                name='meeting_room_id'
                fullWidth
              >
                {
                  meetingRoomInfo.map(
                    (item) => {
                      // console.log(item);
                      return <MenuItem key={item.id} value={item.id}>{item.number}</MenuItem>
                    }
                  )
                }

              </Select> */}

              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                name='date'
                label="Выберите дату"
                value={selectedDate}
                fullWidth
                onChange={(date) => handleDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                name="start_time"
                fullWidth
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
              // onClick={handleClose} 
              color="secondary"
            >
              Забронировать
            </Button>
            <Button
              onClick={() => setOpen(false)}
              color="primary"
            >
              отмена
            </Button>
          </DialogActions>
        </form>

      )}
    </Formik>
  )
}
