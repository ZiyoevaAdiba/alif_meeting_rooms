import {
  AppBar,
  Box,
  makeStyles,
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
import { Account } from "./Account";


const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 64,
    justifyContent: 'space-evenly',
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
    width: '80%',

    '& .active': {
      color: 'rgb(57 185 127)'
    },
    '& a': {
      color: 'black',
      textDecoration: 'none',
      padding: '5px 20px',
      transition: '0.3s',
      '&:hover': {
        backgroundColor: '#d3d3d37a',
        borderRadius: '7px',
      },
    },
  }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar color="default" position="fixed" {...rest} >
      <Toolbar className={classes.toolbar}>

        <Link to="/">
          <img className={classes.logo} src={logo} alt="LOGO" />
        </Link>

        <Box className={classes.navContent} >
          {
            (userData.role === 'admin')
            &&
            <>
              <NavLink
                to={`${urls.users}?page=${1}`}
              >
                Пользователи
              </NavLink>

              <NavLink
                to={urls.meetingRooms}
              >
                Meeting rooms
              </NavLink>

              <NavLink
                to={urls.departments}
              >
                Отделы
              </NavLink>

              <NavLink
                to={urls.reservations}
              >
                Бронирования
              </NavLink>
            </>
          }
        </Box>
        <Box
          ml={2}
        >
          <Account />
        </Box>

      </Toolbar>
    </AppBar>
  )
}
