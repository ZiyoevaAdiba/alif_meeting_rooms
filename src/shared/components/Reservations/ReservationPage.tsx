import { ReserveRoom } from "./ReserveRoom"
import {
  Box,
  Container,
  Grid,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page"
import { IRootReducer } from "../../../store/reducers";
import { useHistory, useLocation } from "react-router";
import { ErrorDiv } from "../ErrorDiv";
import { MeetingRoomCard } from "./MeetingRoomCard";
import { useState } from "react";
import { LoadingScreen } from "../LoadingScreen";
import { getAllBuildings, getBuildingsByCityId } from "../../../store/actions/buildings";
import { getAllCities } from "../../../store/actions/cities";
import { History } from "history";
import { getFilteredMRs } from "./getFilteredMRs";
import { ChangeEvent } from "react";

const useStyles = makeStyles((theme) => ({
  table_users: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
  cardsRoot: {
    marginTop: 30,
    gap: 30,
    marginBottom: 20,
  },
  CardsContainer: {
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'column',
    rowGap: 20,
    ['@media (min-width: 600px)']: {
      // '& .MuiContainer-root': {
      paddingLeft: 0,
      paddingRight: 0,
      // }
    }
  },

  requests_header: {
    fontSize: 30,
    display: 'flex',
    // textAlign: 'center',
    color: '#444444',
    justifyContent: 'space-between'
  },

  filters: {
    display: 'flex',
    columnGap: '20px',
    width: '400px',
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(57 185 127)",
    },
  },
}));

export const ReservationPage = () => {
  const classes = useStyles();

  const {
    meetingRoomsInfo,
    error,
    loading
  } = useSelector((state: IRootReducer) => state.getMRsDataReducer);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { buildings } = useSelector((state: IRootReducer) => state.buildingsReducer);
  const { cities } = useSelector((state: IRootReducer) => state.citiesReducer);

  const location = useLocation();

  const cityQuery = new URLSearchParams(location.search);
  const cityParam = (cityQuery.get('city') || '');

  const buildingQuery = new URLSearchParams(location.search);
  const buildingParam = (buildingQuery.get('building') || '');

  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedBuilding, setSelectedBuilding] = useState(buildingParam);

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

    getFilteredMRs(selectedCity, history, selectedBuilding, dispatch)
  }, []);

  if (loading && !error) {
    return <LoadingScreen />;
  }

  const handleCitySelect = (e: ChangeEvent<{ value: unknown }>, history: History) => {
    setSelectedCity(e.target.value as string);
    setSelectedBuilding('');

    getFilteredMRs(e.target.value as string, history, '', dispatch);
    getBuildingsForDropdown(e.target.value as string);

  };

  const handleBuildingSelect = (
    evt: ChangeEvent<{ value: unknown }>,
    history: History,
    selectedCity: string
  ) => {
    setSelectedBuilding(evt.target.value as string);
    getFilteredMRs(selectedCity, history, evt.target.value as string, dispatch);
  };

  return (
    <Page title="Бронирования">
      <Container
        maxWidth="xl"
        className={classes.CardsContainer}
      >
        {
          (error)
            ?
            <ErrorDiv
              error={error}
            />
            :
            <>
              <Box className={classes.requests_header}>
                Забронировать Meeting Room
                <Box className={classes.filters}>

                  <Select
                    id="demo-simple-select"
                    value={selectedCity}
                    onChange={(e) => handleCitySelect(e, history)}
                    name='city_id'
                    fullWidth
                    displayEmpty
                  >

                    {
                      cities.map(
                        (item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          )
                        }
                      )
                    }
                    <MenuItem value={''}>
                      Все города
                    </MenuItem>
                  </Select>

                  <Select
                    id="demo-simple-select"
                    value={selectedBuilding}
                    onChange={(evt) => handleBuildingSelect(evt, history, selectedCity)}
                    name='building_id'
                    fullWidth
                    displayEmpty
                  >
                    {
                      buildings.map(
                        (item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          )
                        }
                      )
                    }
                    <MenuItem value={''}>
                      Все здания
                    </MenuItem>
                  </Select>
                </Box>
              </Box>

              <Grid
                container
                spacing={4}
                className={classes.cardsRoot}
                justify='center'
              >

                {
                  (!meetingRoomsInfo)
                  &&
                  'На данный момент нет доступных миттинг румов.'
                }
                {
                  meetingRoomsInfo?.map(item =>
                    <MeetingRoomCard
                      key={item.id}
                      name={item.name}
                      number={item.number}
                      mrID={item.id}
                      isBusy={item.is_busy}
                      photo={item.photo}
                      setOpen={setOpen}
                    />
                  )
                }
              </Grid>

              <ReserveRoom
                selectedCity={selectedCity}
                history={history}
                selectedBuilding={selectedBuilding}
                open={open}
                setOpen={setOpen}
              />
            </>
        }
      </Container >
    </Page >
  )
}
