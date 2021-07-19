import { createStyles, makeStyles } from '@material-ui/core'

export const authStyles = makeStyles(() => createStyles({
  authBtn: {
    marginTop: 30,
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#39b97f',
    '& img': {
      width: '30px',
      height: 'auto',
    }
  },

  btnsText: {
    marginTop: '20px',
    fontSize: 12,
    fontWeight: 550,
    color: '#39b97f',
  }

}));
