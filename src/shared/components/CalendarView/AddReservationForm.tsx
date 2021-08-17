import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import { Button, DialogActions, Grid } from "@material-ui/core";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import { addHours, addMinutes, format } from "date-fns";
import { Formik } from "formik";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reservationSuccess,
  requestAddReservation,
} from "../../../store/actions/reservations";
import { IRootReducer } from "../../../store/reducers";
import { IReservation } from "../../../store/reducers/reservations/interfaces";
import { ReserveSchema } from "../../validations/Reservation";
import { CssTextField, CustomSelect } from "../CustomInput";
import { ErrorDiv } from "../ErrorDiv";
import { History } from "history";
import { buttonStyles } from "../styles/buttonStyles";
import { ReservationRepeat } from "./ReservationRepeat";

interface IForm {
  date: string;
  selectedCity: string;
  history: History;
  selectedBuilding: string;
  setOpen: (state: boolean) => void;
  addError: null | string;
  startTime: Date | null;
  endTime: Date | null;
  selectedRooms: string;
}

export const AddReservationForm: FC<IForm> = ({
  date,
  selectedCity,
  history,
  selectedBuilding,
  setOpen,
  addError,
  startTime,
  endTime,
  selectedRooms,
}) => {
  const dispatch = useDispatch();
  const buttonClasses = buttonStyles();

  const { userData } = useSelector(
    (state: IRootReducer) => state.getUserDataReducer
  );
  const { meetingRoomsInfo } = useSelector(
    (state: IRootReducer) => state.getMRsDataReducer
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(startTime || 0)
  );
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    addMinutes(new Date(startTime || 0) || 0, 1)
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
    addHours(new Date(endTime || 0) || 0, 0)
  );
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const initBooking: IReservation = {
    start_time: selectedStartTime,
    end_time: selectedEndTime,
    date: selectedDate,
    purpose: "",
    user_id: "",
    meeting_room_id: "",
    repeat_days: checkedDays,
  };
  const handleDate = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedStartTime(date);
    setSelectedEndTime(addHours(date || 0, 1));
  };

  const handleClose = () => {
    dispatch(reservationSuccess());
    setOpen(false);
  };

  return (
    <Formik
      initialValues={initBooking}
      validationSchema={ReserveSchema}
      onSubmit={(values) => {
        delete values.date;

        values.start_time = format(
          selectedStartTime || 0,
          "yyyy-MM-dd'T'HH:mm:ss'Z'"
        );
        values.end_time = format(
          selectedEndTime || 0,
          "yyyy-MM-dd'T'HH:mm:ss'Z'"
        );
        values.user_id = userData.id;
        values.repeat_days = checkedDays;
        dispatch(
          requestAddReservation(
            values,
            setOpen,
            selectedCity,
            history,
            selectedBuilding,
            selectedRooms,
            date,
          )
        );
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <Grid container justify="space-around">
              <CssTextField
                name="purpose"
                label="Цель брони"
                fullWidth
                onChange={props.handleChange}
                value={props.values.purpose}
                type="text"
                error={Boolean(props.touched.purpose && props.errors.purpose)}
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
              />

              <TimePicker
                margin="normal"
                name="end_time"
                label="Выберите время завершения"
                value={selectedEndTime}
                fullWidth
                ampm={false}
                error={Boolean(props.touched.end_time && props.errors.end_time)}
                onChange={(date) => setSelectedEndTime(date)}
                autoOk
              />
              <ReservationRepeat
                checkedDays={checkedDays}
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
            <Button onClick={handleClose} className={buttonClasses.btnCancel}>
              отмена
            </Button>
          </DialogActions>
          {addError && <ErrorDiv error={addError} />}
        </form>
      )}
    </Formik>
  );
};
