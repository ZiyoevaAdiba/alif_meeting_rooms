import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { urls } from '../routes/urls';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../store/reducers';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 180,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 65,
      background: '#fafafa',
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const sections = [
  {
    url: `${urls.users}?page=${1}`,
    title: 'Пользователи',
    icon: <GroupOutlinedIcon />
  },
  {
    url: urls.meetingRooms,
    title: 'Meeting rooms',
    icon: <MeetingRoomOutlinedIcon />
  },
  {
    url: urls.departments,
    title: 'Отделы',
    icon: <GroupOutlinedIcon />
  },
  {
    url: urls.reservations,
    title: 'Бронирования',
    icon: <EventAvailableIcon />
  },
  {
    url: urls.cities,
    title: 'Города',
    icon: <HomeWorkOutlinedIcon />
  },
  {
    url: urls.buildings,
    title: 'Офисы Алифа',
    icon: <HomeWorkOutlinedIcon />
  },
]
export const SideBar = () => {
  const classes = useStyles();
  const {
    userData
  } = useSelector((state: IRootReducer) => state.getUserDataReducer);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {
        sections.map(item =>
          <ListItem
            button
            key={item.url}
            component={Link}
            to={item.url}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        )

      }
    </Drawer>
  );
}
