import { createStyles, makeStyles } from '@material-ui/core';
import { Routes } from './routes';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    body: {
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0,
      '& .popup-content': {
        zIndex: '9999 !important'
      }
    },
    '#root': {
      '& .MuiDataGrid-columnsContainer': {
        backgroundColor: 'rgb(57 185 127)',
        color: "white",
        fontSize: '16px'
      },
      height: '100%',
      width: '100%',
    }
  }
}));

export const App = () => {
  useStyles();

  return (
    <Routes />
  );
}