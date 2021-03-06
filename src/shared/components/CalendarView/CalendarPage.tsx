import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RefObject, useEffect, useRef, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import { useHistory, useLocation } from "react-router";
import {
  getAllBuildings,
  getBuildingsByCityId,
} from "../../../store/actions/buildings";
import { getAllCities } from "../../../store/actions/cities";
import { getFilteredMRs } from "./getFilteredMRs";
import { MRCheckBox } from "./MRCheckBox";
import { Filters } from "./Filters";
import { ReserveRoom } from "./ReserveRoom";
import { EventsCalendar } from "./EventsCalendar";
import { colorList } from "./colorGenerator";
import { format } from "date-fns";
import { ActionsDialogs } from "./ActionsDialogs";
import { ConfirmDelReservation } from "./ConfirmDelReservation";
import { EditReservationForm } from "./EditReservationForm";
import { urls } from "../../../routes/urls";

const useStyles = makeStyles(() => ({
  mainPageStyle: {
    marginTop: 0,
    marginBottom: 0,
  },
  firstColumn: {
    "& .react-calendar": {
      border: "none",
      backgroundColor: "#fafafa",
    },
    "& .disableEvents": {
      pointerEvents: "none",
    },
  },
  calendarContainer: {
    "& .fc .fc-toolbar.fc-header-toolbar": {
      marginBottom: ".6em",
      fontSize: ".75em",
    },
    "& .fc-scrollgrid": {
      border: "none !important",
    },
    "& .fc-toolbar-title": {
      fontWeight: "500",
    },
  },
}));

export const CalendarPage = () => {
  const classes = useStyles();

  const { loading, meetingRoomsInfo, checkedRooms } = useSelector(
    (state: IRootReducer) => state.getMRsDataReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();

  const dateQuery = new URLSearchParams(location.search);
  const dateParam =
    dateQuery.get("date") || format(new Date(), "yyyy-MM-dd").toString();
  const [choosenDate, setChoosenDate] = useState(new Date(dateParam));

  const cityQuery = new URLSearchParams(location.search);
  const cityParam = cityQuery.get("city") || "";

  const buildingQuery = new URLSearchParams(location.search);
  const buildingParam = buildingQuery.get("building") || "";

  const roomsQuery = new URLSearchParams(location.search);
  const roomsParam = roomsQuery.get("rooms") || "";

  const [open, setOpen] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedBuilding, setSelectedBuilding] = useState(buildingParam);

  const [startTime, setSelectedStartTime] = useState<Date | null>(null);
  const [endTime, setSelectedEndTime] = useState<Date | null>(null);
  const [calendarApiRef, setCalendarApiRef] = useState<any>(null);

  const calendarComponentRef: RefObject<any> = useRef(
    format(choosenDate, "yyyy-MM-dd")
  );

  const gotoWeek = (value: Date) => {
    setChoosenDate(value);
    history.push(
      `${urls.reservations}?date=${format(
        value,
        "yyyy-MM-dd"
      )}&city=${selectedCity}&building=${selectedBuilding}&rooms=${roomsParam}`
    );
    calendarApiRef && calendarApiRef?.gotoDate(format(value, "yyyy-MM-dd")); // call a method on the Calendar object
  };

  const getBuildingsForDropdown = (cityId: string) => {
    if (cityId) {
      dispatch(getBuildingsByCityId(cityId));
      return;
    }
    dispatch(getAllBuildings());
  };

  useEffect(() => {
    dispatch(getAllCities());
    getBuildingsForDropdown(selectedCity);

    getFilteredMRs(
      dateParam,
      selectedCity,
      history,
      selectedBuilding,
      roomsParam,
      dispatch
    );
    if (calendarComponentRef.current) {
      setCalendarApiRef(calendarComponentRef.current.getApi());
    }
  }, [selectedCity, selectedBuilding, dateParam, dispatch]);

  const [colors, setColors] = useState({});

  useEffect(() => {
    if (!meetingRoomsInfo) {
      setColors({});
    } else {
      setColors(colorList(meetingRoomsInfo));
    }
  }, [meetingRoomsInfo]);

  return (
    <Grid container spacing={5} className={classes.mainPageStyle}>
      <Grid item xs={3} className={classes.firstColumn}>
        <Calendar
          value={choosenDate}
          locale="ru"
          onClickDay={(value: Date) => gotoWeek(value)}
          className={loading ? "disableEvents" : ""}
        />
        <Filters
          date={dateParam}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          history={history}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
          selectedRooms={roomsParam}
          dispatch={dispatch}
          getBuildingsForDropdown={getBuildingsForDropdown}
        />

        <MRCheckBox
          history={history}
          colors={colors}
          selectedCity={selectedCity}
          selectedBuilding={selectedBuilding}
          urlRooms={roomsParam}
          date={dateParam}
        />
      </Grid>

      <Grid item xs={9} className={classes.calendarContainer}>
        <EventsCalendar
          setOpen={setOpen}
          setOpenActions={setOpenActions}
          colors={colors}
          choosenDate={choosenDate}
          calendarComponentRef={calendarComponentRef}
          setSelectedStartTime={setSelectedStartTime}
          setSelectedEndTime={setSelectedEndTime}
          dateParam={dateParam}
          selectedCity={selectedCity}
          selectedBuilding={selectedBuilding}
          roomsParam={checkedRooms.join()}
          gotoWeek={gotoWeek}
        />
      </Grid>
      <ReserveRoom
        date={dateParam}
        selectedCity={selectedCity}
        history={history}
        selectedBuilding={selectedBuilding}
        open={open}
        setOpen={setOpen}
        startTime={startTime}
        endTime={endTime}
        selectedRooms={checkedRooms.join()}
      />
      <ActionsDialogs
        openActions={openActions}
        setOpenActions={setOpenActions}
        setOpenEdit={setOpenEdit}
      />
      <ConfirmDelReservation
        date={dateParam}
        selectedCity={selectedCity}
        history={history}
        selectedBuilding={selectedBuilding}
        selectedRooms={checkedRooms.join()}
        setOpenActions={setOpenActions}
      />
      <EditReservationForm
        date={dateParam}
        selectedCity={selectedCity}
        history={history}
        selectedBuilding={selectedBuilding}
        selectedRooms={checkedRooms.join()}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />
    </Grid>
  );
};
