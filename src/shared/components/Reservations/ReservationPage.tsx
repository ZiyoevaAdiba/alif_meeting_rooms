import { ReserveRoom } from "./ReserveRoom"
import {
  Box,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core"
import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page"
import { IRootReducer } from "../../../store/reducers";
import { getMRsByBuildingId, getMRsByCityId, getMRsInfo } from "../../../store/actions/reservations/meetingRoomsData";
import { useHistory, useLocation } from "react-router";
import { ErrorDiv } from "../ErrorDiv";
import { MeetingRoomCard } from "./MeetingRoomCard";
import { useState } from "react";
import { LoadingScreen } from "../LoadingScreen";
import { getAllBuildings, getBuildingsByCityId } from "../../../store/actions/buildings";
import { getAllCities } from "../../../store/actions/cities";
import { History } from "history";
import { getFilteredMRs } from "./getFilteredMRs";

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
    width: '400px'
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

  useEffect(() => {
    dispatch(getAllCities());

    if (selectedCity){
      dispatch(getBuildingsByCityId(selectedCity));
    } else {
      dispatch(getAllBuildings());
    }

    getFilteredMRs(selectedCity, history, selectedBuilding, dispatch)
    // dispatch(getMRsInfo());
  }, []);

  if (loading && !error) {
    return <LoadingScreen />;
  }

  const handleCitySelect = (e: any, history: History, selectedBuilding: string) => {
    setSelectedCity(e.target.value);
    setSelectedBuilding('');
    dispatch(getMRsByCityId(e.target.value, history, ''));
    dispatch(getBuildingsByCityId(e.target.value));
  };

  const handleBuildingSelect = (e: any, history: History, selectedCity: string) => {
    setSelectedBuilding(e.target.value);
    dispatch(getMRsByBuildingId(e.target.value, history, selectedCity))
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
                  {/* <InputLabel
                    // className={classes.signUpForm}
                    style={{ marginTop: '10px', width: '200px' }}
                    id="demo-simple-select"
                  >Выбрать город
                  </InputLabel> */}
                  <Select
                    id="demo-simple-select"
                    value={selectedCity}
                    onChange={(e) => handleCitySelect(e, history, selectedBuilding)}
                    name='city_id'
                    fullWidth
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
                  </Select>

                  {/* <InputLabel
                    // className={classes.signUpForm}
                    style={{ marginTop: '10px', width: '200px' }}
                    id="demo-simple-select"

                  >Выбрать офис
                  </InputLabel> */}
                  <Select
                    id="demo-simple-select"
                    value={selectedBuilding}
                    onChange={(e) => handleBuildingSelect(e, history, selectedCity)}
                    name='building_id'
                    fullWidth
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
