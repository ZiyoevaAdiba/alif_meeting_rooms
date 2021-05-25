import { 
    Container, 
    Grid, 
    makeStyles 
  } from '@material-ui/core';
  import { Page } from '../../layouts/Page';
  
  const useStyles = makeStyles((theme) => ({
    CardsContainer: {
      marginTop: 30,
      justifyContent: 'space-evenly',
      flexWrap: 'wrap'
    },
    item: {
      display: 'flex',
      justifyContent: 'center'
    },
    itemContent: {
      textAlign: 'center',
      lineHeight: '600%',
      width: '80%',
      borderRadius: 10,
      border: '3px solid #6B7CC9',
      fontSize: 25,
      transition: '0.3s',
      cursor: 'pointer',
      color: 'white',
      backgroundColor: '#989FBC',
      '&:hover': {
        border: '3px solid #989FBC',
        boxShadow: '0px 0px 9px 1px gray',
        transform: 'scale(0.96)'
      }
    }
  }));
  
  export const HomeView = () => {
    const classes = useStyles();
  
    return (
      <Page title="Главная страница">
        <Container maxWidth="xl" >
          <Grid className={classes.CardsContainer}
            container spacing={6}
          >
            Main Content
          </Grid>
        </Container>
      </Page>
    );
  }
  