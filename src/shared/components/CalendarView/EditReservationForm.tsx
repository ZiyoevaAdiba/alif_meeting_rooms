import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import { addHours, format } from "date-fns";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestEditReservation,
  reservationSuccess,
} from "../../../store/actions/reservations";
import { IRootReducer } from "../../../store/reducers";
import { ReserveSchema } from "../../validations/Reservation";
import { CssTextField } from "../CustomInput";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { History } from "history";
import { buttonStyles } from "../styles/buttonStyles";
import { ReservationRepeat } from "./ReservationRepeat";
import { CustomSelect } from "../CustomSelect";
import { If } from "../If";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    columnGap: 70,
  },

  CardsContainer: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: 500,
      minHeight: 500,
      padding: 20,
    },
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "100%",
  },
  select: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(57 185 127)",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid rgb(57 185 127)",
    },
  },
}));

interface IForm {
  selectedCity: string;
  history: History;
  selectedBuilding: string;
  selectedRooms: string;
  openEdit: boolean;
  setOpenEdit: (state: boolean) => void;
  date: string;
}

export const EditReservationForm: FC<IForm> = ({
  selectedCity,
  history,
  selectedBuilding,
  selectedRooms,
  openEdit,
  setOpenEdit,
  date,
}) => {
  const dispatch = useDispatch();
  const buttonClasses = buttonStyles();
  const classes = useStyles();

  const { userData } = useSelector(
    (state: IRootReducer) => state.getUserDataReducer
  );
  const { meetingRoomsInfo } = useSelector(
    (state: IRootReducer) => state.getMRsDataReducer
  );
  const { booking, editError } = useSelector(
    (state: IRootReducer) => state.reservationsReducer
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    new Date()
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
    new Date()
  );
  const [checkedDays, setCheckedDays] = useState<number[] | null>([]);

  useEffect(() => {
    setSelectedDate(addHours(new Date(booking.start_time || 0), -5));
    setSelectedStartTime(addHours(new Date(booking.start_time || 0), -5));
    setSelectedEndTime(addHours(new Date(booking.end_time || 0), -5));
    setCheckedDays(booking.repeat_days as number[]);
  }, [booking]);

  const initBooking = {
    start_time: selectedStartTime,
    end_time: selectedEndTime,
    date: selectedDate,
    purpose: booking.purpose,
    user_id: booking.user_id,
    meeting_room_id: booking.meeting_room_id,
    repeat_days: checkedDays,
  };

  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    dispatch(reservationSuccess());
    setOpenEdit(false);
  };

  return (
    <Dialog
      open={openEdit}
      onClose={handleClose}
      className={classes.CardsContainer}
    >
      <DialogTitle id="form-dialog-title">
        Отредактируйте нужные вам поля.
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Formik
          initialValues={initBooking}
          validationSchema={ReserveSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => {
            const dateSelected = format(selectedDate || 0, "yyyy-MM-dd");
            const startTimeSelected = format(
              selectedStartTime || 0,
              "HH:mm:ss"
            );
            const endTimeSelected = format(selectedEndTime || 0, "HH:mm:ss");

            const editData = {
              start_time: dateSelected + "T" + startTimeSelected + "Z",
              end_time: dateSelected + "T" + endTimeSelected + "Z",
              user_id: userData.id,
              purpose: values.purpose,
              meeting_room_id: values.meeting_room_id,
              repeat_days: checkedDays,
              repeat_id: booking.repeat_id || " ",
            };

            dispatch(
              requestEditReservation(
                editData,
                booking.id as string,
                setOpenEdit,
                selectedCity,
                history,
                selectedBuilding,
                selectedRooms,
                date
              )
            );
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <CssTextField
                    name="purpose"
                    label="Цель брони"
                    fullWidth
                    onChange={props.handleChange}
                    value={props.values.purpose}
                    type="text"
                    error={Boolean(
                      props.touched.purpose && props.errors.purpose
                    )}
                  />
                  <CustomSelect
                    itemList={meetingRoomsInfo}
                    formikProps={props}
                    fieldName={"meeting_room_id"}
                    text="Миттинг рум"
                  />
                  <DatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    name="date"
                    label="Выберите дату"
                    value={selectedDate}
                    fullWidth
                    error={Boolean(props.touched.date && props.errors.date)}
                    onChange={(date) => handleDate(date)}
                    autoOk
                    disablePast
                    className={classes.select}
                  />

                  <TimePicker
                    margin="normal"
                    name="start_time"
                    fullWidth
                    ampm={false}
                    error={Boolean(
                      props.touched.start_time && props.errors.start_time
                    )}
                    label="Выберите время начала"
                    value={selectedStartTime}
                    onChange={(date) => setSelectedStartTime(date)}
                    autoOk
                    className={classes.select}
                  />

                  <TimePicker
                    margin="normal"
                    name="end_time"
                    label="Выберите время завершения"
                    value={selectedEndTime}
                    fullWidth
                    ampm={false}
                    error={Boolean(
                      props.touched.end_time && props.errors.end_time
                    )}
                    onChange={(date) => setSelectedEndTime(date)}
                    autoOk
                    className={classes.select}
                  />
                  <ReservationRepeat
                    checkedDays={checkedDays || []}
                    setCheckedDays={setCheckedDays}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  className={buttonClasses.btnReserve}
                >
                  Забронировать
                </Button>
                <Button
                  onClick={handleClose}
                  className={buttonClasses.btnCancel}
                >
                  Отмена
                </Button>
              </DialogActions>
              <If condition={Boolean(editError)}>
                <ErrorDiv error={editError} />
              </If>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
