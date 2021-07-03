import { Dispatch } from 'react';
import {
  Button,
  Link,
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
import { departmentsWarningDelete, showDepartmentData } from '../../store/actions/departments'
import { reservationWarningDelete } from '../../store/actions/reservations';
import { IRootReducer } from '../../store/reducers';
import Popup from 'reactjs-popup';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { citiesWarningDelete, showCityData } from '../../store/actions/cities';
import { buildingWarningDelete, showBuildingData } from '../../store/actions/buildings';

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

  if (btnLocation === 'users') {
    dispatch(userWarningDelete(rowId));
    return;
  }
  if (btnLocation === 'meeting-rooms') {
    dispatch(roomWarningDelete(rowId));
    return;
  }
  if (btnLocation === 'departments') {
    dispatch(departmentsWarningDelete(rowId));
    return;
  }
  if (btnLocation === 'cities') {
    dispatch(citiesWarningDelete(rowId));
    return;
  }
  if (btnLocation === 'reservations') {
    dispatch(reservationWarningDelete(rowId))
    return;
  }
  if (btnLocation === 'buildings'){
    dispatch(buildingWarningDelete(rowId));
    return;
  }
}

const handleEdit = (row: any, btnLocation: string, dispatch: Dispatch<any>) => {
  if (btnLocation === 'users'){
    dispatch(showUserData(row));
    return;
  }
  if (btnLocation === 'meeting-rooms'){
    dispatch(showRoomData(row));
    return;
  }
  if (btnLocation === 'departments'){
    dispatch(showDepartmentData(row));
    return;
  }
  if (btnLocation === 'cities'){
    dispatch(showCityData(row));
    return;
  }  
  if (btnLocation === 'buildings'){
    dispatch(showBuildingData(row));
    return;
  }
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


export const ButtonPoppup = ({ params, btnLocation }: any) => {

  const { userData } = useSelector((state: IRootReducer) => state.getUserDataReducer)

  if (params.user.id === userData.id && btnLocation === 'reservations') {
    return <></>;
  }

  const telegramLink = `https://t.me/${params.user.tg_account}`

  return (
    <Popup
      trigger={<AccountCircleIcon />}
      on='hover'
      position='bottom center'
      nested
    >
      {
        `${params.user.last_name} 
          ${params.user.name} `
      }
      <Link href={telegramLink} target="_blank">
        @{params.user.tg_account}
      </Link>

    </Popup >
  )
}