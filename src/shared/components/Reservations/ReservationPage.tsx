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
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const { buildings } = useSelector((state: IRootReducer) => state.buildingsReducer);
  const { cities } = useSelector((state: IRootReducer) => state.citiesReducer);

  useEffect(() => {
    dispatch(getAllCities());
    dispatch(getAllBuildings());
    dispatch(getMRsInfo());
  }, []);

  if (loading && !error) {
    return <LoadingScreen />;
  }

  const handleCitySelect = (e: any) => {
    setSelectedCity(e.target.value);
    // console.log(e.target.value);
    dispatch(getMRsByCityId(e.target.value));
    dispatch(getBuildingsByCityId(e.target.value));
  };

  const handleBuildingSelect = (e: any) => {
    setSelectedBuilding(e.target.value);
    dispatch(getMRsByBuildingId(e.target.value))
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
                  <InputLabel
                    // className={classes.signUpForm}
                    style={{ marginTop: '10px', width: '200px' }}
                    id="demo-simple-select"
                  >Выбрать город
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={selectedCity}
                    onChange={(e) => handleCitySelect(e)}
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

                  <InputLabel
                    // className={classes.signUpForm}
                    style={{ marginTop: '10px', width: '200px' }}
                    id="demo-simple-select"

                  >Выбрать офис
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={selectedBuilding}
                    onChange={(e) => handleBuildingSelect(e)}
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
                page={page}
                history={history}
                open={open}
                setOpen={setOpen}
              />
            </>
        }
      </Container >
    </Page >
  )
}
