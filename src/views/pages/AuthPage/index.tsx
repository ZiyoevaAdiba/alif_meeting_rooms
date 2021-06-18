import { useHistory } from 'react-router';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Page } from '../../../layouts/Page';
import { SignUpForm } from '../../../shared/components/Auth/SignUpForm';
import logo from '../../../assets/images/alif_logo.png';
import { urls } from '../../../routes/urls';
import { LoginForm } from '../../../shared/components/Auth/LoginForm';
import { ForgetPasswordForm } from '../../../shared/components/Auth/ForgetPassword';

const useStyles = makeStyles((theme) => ({
  authFormContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    margin: '0 auto',
    overflow: 'visible',
    display: 'flex',
    maxWidth: '500px',
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

export const LoginView = () => {
  const classes = useStyles();
  const history = useHistory();
  //   removeToken();
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
                {
                  (history.location.pathname === urls.login)
                  &&
                  <LoginForm />
                }
                {
                  (history.location.pathname === urls.signUp)
                  &&
                  <SignUpForm/>
                }
                 {
                  (history.location.pathname === urls.forget)
                  &&
                  <ForgetPasswordForm />
                }
            </Box>

          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}