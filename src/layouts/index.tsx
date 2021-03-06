import PropTypes from "prop-types";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { IRootReducer } from "../store/reducers";
import { useSelector } from "react-redux";
import { Footer } from "./Footer";
import { If } from "../shared/components/If";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    fontSize: 20,
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
      
      borderBottom: "2px solid #EBEBEB",
      height: "55px",
    },
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    paddingTop: 70,
    minHeight: "calc(100vh - 60px)",
    [theme.breakpoints.up("lg")]: {
      padding: "60px 50px 0",
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
  },
}));

export const DashboardLayout = ({ children }: any) => {
  const classes = useStyles();
  const { userData } = useSelector(
    (state: IRootReducer) => state.getUserDataReducer
  );

  return (
    <>
      <Container className={classes.root} maxWidth="xl">
        <CssBaseline />
        <TopBar />
        <If condition={userData.role === "admin"}>
          <SideBar />
        </If>

        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.any,
};
