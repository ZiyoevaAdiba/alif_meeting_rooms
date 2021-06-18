import { Box, Grid, makeStyles } from "@material-ui/core"
import logo from '../../../assets/images/nature1.jpeg'
import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../../store/actions/getRooms";
import { IRootReducer } from "../../../store/reducers";
import { getMRReservations } from "../../../store/actions/reservations/";

const useStyles = makeStyles({
  mrRoot: {
    maxWidth: 345,
    minWidth: 280,
    color: 'white',
    boxShadow: `0px 2px 10px 3px rgb(0 0 0 / 20%), 
                0px 1px 1px 0px rgb(0 0 0 / 14%), 
                0px 1px 3px 0px rgb(0 0 0 / 12%)`
  },
  freeMR: {
    background: 'rgb(57 185 127)',
  },
  busyMR: {
    background: 'rgb(237 255 0 / 83%)',
    color: 'black'
  },
  media: {
    height: 140,
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
});

export const MeetingRoomCard = ({ name, number, mrID, isBusy, setOpen, photo }: any,) => {
  const classes = useStyles();
  const titleText: string = name;
  const dispatch = useDispatch();

  const getMRReservationData = () => {
    setOpen(true);
    dispatch(getMRReservations(mrID));
  }

  return (
    <Card
      className={
        isBusy 
        ? 
        `${classes.mrRoot} ${classes.busyMR}`
        : 
        `${classes.mrRoot} ${classes.freeMR}`
      }
      onClick={getMRReservationData}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={photo}
          title={titleText}

        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name} № {number}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}