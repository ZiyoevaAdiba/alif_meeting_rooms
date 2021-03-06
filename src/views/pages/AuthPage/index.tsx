import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Page } from '../../../layouts/Page';
import logo from '../../../assets/images/alif_logo.png';
import { removeToken } from '../../../store/actions/login';

const useStyles = makeStyles((theme) => ({
  '@global': {
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      width: '100%',
      height: '100%'
    },
    body: {
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
  },
  authFormContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    margin: '20px auto',
    display: 'flex',
    maxWidth: '500px',
    width: 'inherit',
    position: 'relative',
    boxShadow: '0px 0px 15px 1px rgba(0,0,0,0.2)',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(6, 4)
  },
  authHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
      borderRadius: '50%',
      width: '90px',
      height: '90px'
    }
  }
}));

export const LoginView = ({children}: any) => {
  const classes = useStyles();
  
  removeToken();

  return (
    <Page title="Войти">
      <Container maxWidth="md" className={classes.authFormContainer}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>

            <Typography variant="h3"
              className={classes.authHeader}
            >
              <img src={logo} alt="no Logo" />
            </Typography>

            <Box mt={3}>
              {children}
            </Box>

          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}