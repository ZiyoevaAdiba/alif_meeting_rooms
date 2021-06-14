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
    boxShadow: `0px 2px 10px 3px rgb(0 0 0 / 20%), 
                0px 1px 1px 0px rgb(0 0 0 / 14%), 
                0px 1px 3px 0px rgb(0 0 0 / 12%)`
  },

  media: {
    height: 140,
  },
});

export const MeetingRoomCard = ({name, number, mrID, setOpen}: any, ) => {
  const classes = useStyles();
  const titleText: string = name;
  const dispatch = useDispatch();

  const getMRReservationData = () => {
    setOpen(true);
    dispatch(getMRReservations(mrID));
  }

  return (
    <Card 
      className={classes.mrRoot}
      onClick={getMRReservationData}
      >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={logo}
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
