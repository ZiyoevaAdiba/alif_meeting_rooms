import { Grid, makeStyles } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { FC } from "react";
import { useDispatch } from "react-redux";
import { getMRReservations } from "../../../store/actions/reservations/";

const useStyles = makeStyles({
  mrRoot: {
    height: 200,
    width: 300,
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
  cardText: {
    fontSize: 18,
  },
});
interface IMeetinfRoomCard {
  name: string | undefined,
  number: string | undefined,
  mrID: string | undefined,
  isBusy: boolean | undefined,
  setOpen: (state: boolean) => void,
  photo: string | undefined
}
export const MeetingRoomCard: FC<IMeetinfRoomCard> = ({ name, number, mrID, isBusy, setOpen, photo }) => {
  const classes = useStyles();
  const titleText = `${name} № ${number}`;
  const dispatch = useDispatch();

  const getMRReservationData = () => {
    setOpen(true);
    dispatch(getMRReservations(mrID));
  }

  return (
    <Grid item title={titleText}>
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
            // title={titleText}
          />
          <CardContent
          >
            <Typography
              noWrap
              className={classes.cardText}
            >
              {name} № {number}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
