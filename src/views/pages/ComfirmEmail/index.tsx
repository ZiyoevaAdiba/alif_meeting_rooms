import { Card, CardContent, Container, makeStyles } from '@material-ui/core';
import { Page } from '../../../layouts/Page';
import { EmailAlert } from '../../../shared/components/Auth/EmailAlert';

const useStyles = makeStyles((theme) => ({
  authFormContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    margin: '0 auto',
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
  
}));

export const ConfirmEmail = () => {
  const classes = useStyles();

  return (
    <Page title="Подтверждение">
      <Container maxWidth="md" className={classes.authFormContainer}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <h1>hellooo</h1>
            <EmailAlert />

          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

