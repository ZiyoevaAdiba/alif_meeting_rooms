import { format } from 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Box, makeStyles } from '@material-ui/core';
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
import { IRootReducer } from '../../../store/reducers';
import { requestAddReservation } from '../../../store/actions/reservations';
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

  CardsContainer: {
    marginTop: 30,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 700,
    flexDirection: 'column',
    // rowGap: 20,
    width: '100%',
  },
  requests_header: {
    fontSize: 40
  },
  buttonRes: {
    // justifyContent: 'flex-end'
  }
}));


export const ReserveRoom = ({pageNumber, history} : any ) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    userData
  } = useSelector((state: IRootReducer) => state.getUserDataReducer);
  const {
    meetingRoomInfo
  } = useSelector((state: IRootReducer) => state.getMRsDataReducer);
  const booking: IReservation = {
    start_time: "",
    end_time: "",
    date: "",
    meeting_room_id: "",
    purpose: "",
    user_id: "",
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(),
  );
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    new Date(),
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
    new Date(),
  );

  // let mlseconds = date?.getTime();
  //   mlseconds =
  //     mlseconds
  //     &&
  //     mlseconds + 18000000;

  //   const dat = new Date(mlseconds || 0).toISOString()
  //   console.log(dat);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Box>
      <Button
        className={classes.buttonRes}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Забронировать Meeting Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.CardsContainer}

      >
        <DialogTitle id="form-dialog-title">Чтобы забронировать Meeting Room заполните форму.</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={booking}
            // validationSchema={RoomSchema}
            onSubmit={(values, { setSubmitting }) => {
              values.date = format(selectedDate || 0, "yyyy-MM-dd'T'HH:mm:ss'Z'");
              values.start_time = format(selectedStartTime || 0, "yyyy-MM-dd'T'HH:mm:ss'Z'");
              values.end_time = format(selectedEndTime || 0, "yyyy-MM-dd'T'HH:mm:ss'Z'");
              console.log(userData.id);
              handleClose();
              delete values.date;
              dispatch(requestAddReservation(pageNumber, history, values, userData.id))
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
                    <InputLabel
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

                    </Select>
                
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      name='date'
                      label="Выберите дату"
                      value={selectedDate}
                      fullWidth
                      onChange={(date) => setSelectedDate(date)}
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
                  <Button onClick={handleClose} color="primary">
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
