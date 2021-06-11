import { Dispatch } from 'react';
import {
  Button,
  makeStyles,
} from "@material-ui/core";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {
  roomWarningDelete,
  showRoomData
} from '../../store/actions/getRooms';
import { useDispatch, useSelector } from 'react-redux';
import { showUserData, userWarningDelete } from '../../store/actions/getUsers';
import { departmentsWarningDelete } from '../../store/actions/departments'
import { reservationWarningDelete } from '../../store/actions/reservations';
import { IRootReducer } from '../../store/reducers';

const useStyles = makeStyles((theme) => ({
  iconSize: {
    width: '30px',
    height: 'auto',
  },

  iconEdit: {
    color: 'darkblue',
  },

  iconDelete: {
    color: 'darkred',
  },

}));

const handleDelete = (rowId: string, btnLocation: string, dispatch: Dispatch<any>) => {

  (btnLocation === 'users')
    ?
    dispatch(userWarningDelete(rowId))
    :
    (
      (btnLocation === 'meeting-rooms')
        ?
        dispatch(roomWarningDelete(rowId))
        :
        (
          (btnLocation === 'departments')
            ?
            dispatch(departmentsWarningDelete(rowId))
            :
            dispatch(reservationWarningDelete(rowId))
        )
    )
}

const handleEdit = (row: any, btnLocation: string, dispatch: Dispatch<any>) => {

  (btnLocation === 'users')
    ?
    dispatch(showUserData(row))
    :
    dispatch(showRoomData(row))
}


export const ButtonEdit = ({ row, btnLocation }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => handleEdit(row, btnLocation, dispatch)}
    >
      <EditTwoToneIcon
        className={`${classes.iconSize} ${classes.iconEdit}`}
      />
    </Button>
  )
}

export const ButtonDelete = ({ id, columnUserId = '', btnLocation }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: IRootReducer) => state.getUserDataReducer)

  if (columnUserId !== userData.id && btnLocation === 'reservations') {
    return <></>;
  }

  return (
    <Button
      onClick={() => handleDelete(id, btnLocation, dispatch)}
    >
      <DeleteForeverRoundedIcon
        className={`${classes.iconSize} ${classes.iconDelete}`}
      />
    </Button>
  )
}
