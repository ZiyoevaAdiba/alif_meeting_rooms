import {
  useRef,
  useState
} from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import { IRootReducer } from '../../store/reducers';
import { removeToken } from '../../store/actions/login';
import { urls } from '../../routes/urls';
import { userDataDelete } from '../../store/actions/reservations/userData';

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 200
  }
}));

export const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    userData
  } = useSelector((state: IRootReducer) => state.getUserDataReducer);
  const ref = useRef<HTMLElement>();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    removeToken();
    history.push(urls.login);
    dispatch(userDataDelete())
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        {...{ ref: ref } as any}
      >
        <Hidden smDown>
          <Typography
            variant="h6"
            color="textPrimary"
          >
            {`${userData.lastname || ''} ${userData.name || ''}`}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem onClick={handleLogout}>
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};