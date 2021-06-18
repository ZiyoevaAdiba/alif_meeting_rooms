import { ReserveRoom } from "./ReserveRoom"
import {
  Box,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page"
import { IRootReducer } from "../../../store/reducers";
import { getMRsInfo } from "../../../store/actions/reservations/meetingRoomsData";
import { useHistory, useLocation } from "react-router";
import { ErrorDiv } from "../ErrorDiv";
import { MeetingRoomCard } from "./MeetingRoomCard";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table_users: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
  cardsRoot: {
    marginTop: 30,
    gap: 30,
  },
  CardsContainer: {
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 700,
    flexDirection: 'column',
    rowGap: 20,
  },
  requests_header: {
    fontSize: 30,
    textAlign: 'center',
    color: '#444444' 
  },
}));


export const ReservationPage = () => {
  const classes = useStyles();
  const {
    meetingRoomInfo
  } = useSelector((state: IRootReducer) => state.getMRsDataReducer);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    dispatch(getMRsInfo());
  }, [dispatch]);

  // if (!requests?.length) {
  //     return <LoadingScreen />;
  // }

  return (
    <Page title="Бронирования">
      <Container
        maxWidth="xl" 
        className={classes.CardsContainer}
      >
        <Box className={classes.requests_header}>
          Забронировать Meeting Room 
        </Box>
        <Grid
          container
          spacing={4}
          className={classes.cardsRoot}
          justify='center'
        >
          {
            meetingRoomInfo.map(item =>
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
      </Container>
    </Page>
  )
}
