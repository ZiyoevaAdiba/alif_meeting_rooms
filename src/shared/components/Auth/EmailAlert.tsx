import { 
  makeStyles, 
  Theme, 
  createStyles 
} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Page } from '../../../layouts/Page';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export const EmailAlert = () => {
  const classes = useStyles();
  return (
    <>
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
      
      <Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert>
    </>
  );
}
