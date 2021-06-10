import {
  AppBar,
  Box,
  // Hidden,
  // IconButton,
  makeStyles,
  // SvgIcon,
  Toolbar
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/alif_logo.png';
import { urls } from "../../routes/urls";
import { getToken } from "../../store/actions/login";
import { getCurrentUserInfo } from "../../store/actions/reservations/userData";
import { IRootReducer } from "../../store/reducers";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 64,

  },
  logo: {
    margin: '5px',
    width: '60px',
    height: '60px',
    borderRadius: '50%'
  },
  navContent: {
    display: 'flex',
    justifyContent: 'center',
    columnGap: 20,
    width: '100%',
    '& a':{
      color: 'black',
      textDecoration: 'none',
      padding: '5px 10px',
      '&:hover':{
        backgroundColor: 'lightGrey',
        color: '#423c3c',
        borderRadius: '50px',
      },
    },
  },

}));

export const TopBar = ({ onMobileNavOpen, className, ...rest }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token: string = getToken();

  const {
    userData
  } = useSelector((state: IRootReducer) => state.getUserDataReducer);
  
  useEffect(() => {
    dispatch(getCurrentUserInfo(token));
  }, []);


  return (
    <AppBar color="default" position="fixed" {...rest} >
      <Toolbar className={classes.toolbar}>

        <Link to="/">
          <img className={classes.logo} src={logo} alt="LOGO" />
        </Link>

        <Box className={classes.navContent} >
          <NavLink to={`${urls.users}?page=${1}`} >
            Пользователи
          </NavLink>
          <NavLink to={urls.meetingRooms} >
            Meeting rooms
          </NavLink>
          <NavLink to={urls.departments} >
            Отделы
          </NavLink>
          <NavLink to={urls.reservations} >
            Бронирования
          </NavLink>
        </Box>

          <Box ml={2} >
            { 
              `${userData.name} ${userData.lastname}`
            }
              
          </Box>

      </Toolbar>
    </AppBar>
  )
}