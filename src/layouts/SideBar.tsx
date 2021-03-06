import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { urls } from "../routes/urls";
import { NavLink } from "react-router-dom";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { Divider } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 220,
      flexShrink: 0,
      "& .active": {
        color: "rgb(57 185 127)",
      },
      "& a": {
        textDecoration: "none",
        marginTop: 10,
        color: "#505050",
        fontSize: "20px",
      },
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 65,
      background: "#fafafa",
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const sections = [
  {
    url: `${urls.users}?page=${1}`,
    title: "Пользователи",
    icon: <GroupOutlinedIcon />,
  },
  {
    url: urls.meetingRooms,
    title: "Meeting rooms",
    icon: <MeetingRoomOutlinedIcon />,
  },
  {
    url: urls.departments,
    title: "Отделы",
    icon: <WorkOutlineIcon />,
  },
  {
    url: urls.cities,
    title: "Города",
    icon: <HomeWorkOutlinedIcon />,
  },
  {
    url: urls.buildings,
    title: "Офисы Алифа",
    icon: <LocationCityIcon />,
  },
  {
    url: urls.reservations,
    title: "Бронирования",
    icon: <EventAvailableIcon />,
  },
];

export const SideBar = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {sections.map((item) => (
        <NavLink key={item.url} to={item.url}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </NavLink>
      ))}
      <Divider />
    </Drawer>
  );
};
