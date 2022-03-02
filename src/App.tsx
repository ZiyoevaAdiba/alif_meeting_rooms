import { createStyles, makeStyles } from "@material-ui/core";
import { Routes } from "./routes";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { ErrorModal } from "./shared/components/Errors/ErrorModal";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      html: {
        overflowX: "hidden",
        overflowY: "auto",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      body: {
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
        "& .popup-content": {
          zIndex: "9999 !important",
        },
      },
      "#root": {
        "& .MuiDataGrid-columnsContainer": {
          backgroundColor: "rgba(167, 167, 167, 0.6)",
          color: "#474747",
          fontSize: "16px",
        },
        height: "100%",
        width: "100%",
      },
    },
  })
);

export const App = () => {
  useStyles();

  return (
    <>
      <ReactNotification />
      <Routes />
      <ErrorModal />
    </>
  );
};
