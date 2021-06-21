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
} from '../../store/actions/rooms';
import { useDispatch, useSelector } from 'react-redux';
import { showUserData, userWarningDelete } from '../../store/actions/users';
import { departmentsWarningDelete } from '../../store/actions/departments'
import { reservationWarningDelete } from '../../store/actions/reservations';
import { IRootReducer } from '../../store/reducers';
import Popup from 'reactjs-popup';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  iconSize: {
    width: '30px',
    height: 'auto',
  },

  iconEdit: {
    color: '#39B980',
  },

  iconDelete: {
    color: '#EC7272',
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


export const ButtonPoppup = ({params, btnLocation }: any) => {
  // id, columnUserId = '',

  const { userData } = useSelector((state: IRootReducer) => state.getUserDataReducer)

  if (params.user.id === userData.id && btnLocation === 'reservations') {
    return <></>;
  }
  return (
    <Popup
      trigger={<AccountCircleIcon />}
      on='hover'
      position='bottom center'
      nested
    >
      {
        `${params.user.lastname} 
          ${params.user.name}
          @${params.user.tg_account}`
      }
    </Popup>
  )
}