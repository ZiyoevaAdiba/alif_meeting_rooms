import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Toolbar
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../../assets/images/alif_logo.png';
import { urls } from "../../routes/urls";
import { getToken, removeToken } from "../../store/actions/login";
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
    width: '80%',
    '& a': {
      color: 'black',
      textDecoration: 'none',
      padding: '5px 10px',
      transition: '0.3s',
      '&:hover': {
        backgroundColor: '#d3d3d37a',
        color: '#423c3c',
        borderRadius: '7px',
      },
    },
  },

  btnExit: {
    marginLeft: '10px',
    fontWeight: 550,  
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
  }, []);

  const history = useHistory();

  const handleExit = () => {
    removeToken();
    history.push(urls.login);
  }

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
            </>
          }
        </Box>
        <Box 
          ml={2} 
        >
          {
            `${userData.name || ''} ${userData.lastname || ''}`
          }
        </Box>
        <Button
          onClick={handleExit}
          className={classes.btnExit}
        >
          выход
        </Button>

      </Toolbar>
    </AppBar>
  )
}
