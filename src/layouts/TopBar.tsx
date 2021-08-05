import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useDispatch } from "react-redux";
import { Account } from "../shared/components/Account";
import { Box } from "@material-ui/core";
import logo from "../assets/images/alif_logo.png";
import { getCurrentUserInfo } from "../store/actions/reservations/userData";
import { getToken } from "../store/actions/login";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  toolbar: {
    minHeight: 64,
    justifyContent: "space-between",
  },

  logo: {
    margin: "5px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
}));

export const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token: string = getToken();

  useEffect(() => {
    dispatch(getCurrentUserInfo(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar color="default" position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <img className={classes.logo} src={logo} alt="LOGO" />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
