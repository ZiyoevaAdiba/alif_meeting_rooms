import { createStyles, makeStyles } from '@material-ui/core';
import { Routes } from './routes';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
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
      height: '100%',
      width: '100%'
    }
  }
}));

export const App = () => {
  useStyles();

  return (
    <Routes />
  );
}