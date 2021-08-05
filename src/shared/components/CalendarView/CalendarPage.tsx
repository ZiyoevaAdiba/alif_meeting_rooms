import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { useHistory, useLocation } from 'react-router';
import { getAllBuildings, getBuildingsByCityId } from '../../../store/actions/buildings';
import { getAllCities } from '../../../store/actions/cities';
import { getFilteredMRs } from './getFilteredMRs';
import { LoadingScreen } from '../LoadingScreen';
import { MRCheckBox } from './MRCheckBox';
import { Filters } from './Filters';
import { ReserveRoom } from './ReserveRoom';
import { EventsCalendar } from './EventsCalendar';
import { colorList } from './colorGenerator';
import { format } from 'date-fns';
import { ActionsDialogs } from './ActionsDialogs';
import { ConfirmDelReservation } from './ConfirmDelReservation';
import { EditReservationForm } from './EditReservationForm';

const useStyles = makeStyles(() => ({
  mainPageStyle: {
    marginTop: 0,
    // gap: 40,
    marginBottom: 0,
  },
  firstColumn: {
    '& .react-calendar': {
      border: 'none',
      backgroundColor: '#fafafa',
    }
  },
  calendarContainer: {
    '& .fc .fc-toolbar.fc-header-toolbar':{
      marginBottom:'.8em',
    },
    '& .fc-scrollgrid': {
      border: 'none !important',
    },
    '& .fc-toolbar-title':{
      fontWeight: '500'
    },
  }
}));


export const CalendarPage = () => {
  const [choosenDate, setChoosenDate] = useState(new Date());
  const classes = useStyles();

  const {
    error,
    loading,
    meetingRoomsInfo,
    checkedRooms,
  } = useSelector((state: IRootReducer) => state.getMRsDataReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();

  const cityQuery = new URLSearchParams(location.search);
  const cityParam = (cityQuery.get('city') || '');

  const buildingQuery = new URLSearchParams(location.search);
  const buildingParam = (buildingQuery.get('building') || '');

  const roomsQuery = new URLSearchParams(location.search);
  const roomsParam = (roomsQuery.get('rooms') || '');

  const [open, setOpen] = useState(false);
  const [openActions, setOpenActions] = useState(false)
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedBuilding, setSelectedBuilding] = useState(buildingParam);

  const [startTime, setSelectedStartTime] = useState<Date | null>(null);
  const [endTime, setSelectedEndTime] = useState<Date | null>(null);


  const getBuildingsForDropdown = (cityId: string) => {
    if (cityId) {
      dispatch(getBuildingsByCityId(cityId));
      return;
    }
    dispatch(getAllBuildings());
  }

  useEffect(() => {
    dispatch(getAllCities());
    getBuildingsForDropdown(selectedCity);

    getFilteredMRs(selectedCity, history, selectedBuilding, roomsParam, dispatch)
  }, [selectedCity, selectedBuilding, roomsParam, dispatch]);

  const [colors, setColors] = useState(colorList(meetingRoomsInfo));

  useEffect(() => {
    setColors(colorList(meetingRoomsInfo));
  }, [meetingRoomsInfo]);

  const calendarComponentRef: RefObject<any> = useRef();

  if (loading && !error) {
    return <LoadingScreen />;
  }

  const gotoWeek = (value: Date) => {
    setChoosenDate(value);
    let calendarApi = calendarComponentRef.current.getApi();
    calendarApi.gotoDate(format(value, "yyyy-MM-dd")); // call a method on the Calendar object
  };

  return (
    <Grid container 
    spacing={5}
      className={classes.mainPageStyle}
    >
      <Grid item xs={2}
        className={classes.firstColumn}
      >
        <Calendar
          value={choosenDate}
          locale='ru'
          onClickDay={(value: Date) => gotoWeek(value)}
        />
        <Filters
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
          colors={colors}
          selectedCity={selectedCity}
          selectedBuilding={selectedBuilding}
          urlRooms={roomsParam}
        />
      </Grid>

      <Grid item xs={10}
        className={classes.calendarContainer}
      >
        <EventsCalendar
          setOpen={setOpen}
          setOpenActions={setOpenActions}
          colors={colors}
          choosenDate={choosenDate}
          calendarComponentRef={calendarComponentRef}
          setSelectedStartTime={setSelectedStartTime}
          setSelectedEndTime={setSelectedEndTime}
        />
      </Grid>
      <ReserveRoom
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
        selectedCity={selectedCity}
        history={history}
        selectedBuilding={selectedBuilding}
        selectedRooms={checkedRooms.join()}
        setOpenActions={setOpenActions}
      />
      <EditReservationForm
        selectedCity={selectedCity}
        history={history}
        selectedBuilding={selectedBuilding}
        selectedRooms={checkedRooms.join()}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />
    </Grid>
  )
}
