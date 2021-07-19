import { makeStyles } from "@material-ui/core";

export const commonStyles = makeStyles((theme) => ({
  CardsContainer: {
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 'auto',
    flexDirection: 'column',
    rowGap: 20,
    marginBottom: 40,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  requests_header: {
    fontSize: 30
  },
}));