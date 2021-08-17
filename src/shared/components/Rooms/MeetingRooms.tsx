import {
  Box,
  CardMedia,
  Container,
  Grid,
} from "@material-ui/core"
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  GridValueGetterParams
} from '@material-ui/data-grid';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page"
import { getAllRooms } from "../../../store/actions/rooms";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { IRoom } from "../../../store/reducers/rooms/interfaces";
import { AddRoom } from "./AddRoom";
import { EditRoom } from "./EditRoom";
import { ConfirmDelRoom } from "./ConfirmDelRoom";
import { ErrorDiv } from "../ErrorDiv";
import { LoadingScreen } from "../LoadingScreen";
import { commonStyles } from "../styles/mainPagesStyles";

export const room: IRoom = {
  building: {},
  building_id: '',
  name: '',
  number: 0,
  photo: '',
  place: '',
  color: '',
  status: true,
};

export const fieldRoom = {
  city: 'city',
  created: 'created',
  id: 'id',
  name: 'name',
  number: 'number',
  status: 'status',
  photo: 'image',
}


const columns: GridColumns = [
  {
    field: 'number',
    headerName: 'Номер',
    type: 'number',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Название',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 2,
  },

  {
    field: 'building',
    headerName: 'Название здания',
    type: 'string',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 2,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.building.name
    },
  },
  {
    field: 'city',
    headerName: 'Город',
    type: 'string',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 2,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.building.city.name
    },
  },

  {
    field: 'photo',
    headerName: 'Фото',
    type: 'image',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 1.5,
    renderCell: (params: GridValueGetterParams) => {
      return <CardMedia
        style={{ width: 'auto', height: '52px' }}
        component={"img"}
        src={params.row.photo}
        alt="photo"
      />
    }
  },
  {
    field: 'status',
    headerName: 'Статус',
    type: 'string',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 2,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.status
        ? 'Доступен'
        : 'Недоступен';
    },
  },

  {
    field: 'actions',
    headerName: 'Действие',
    type: 'button',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    renderCell: (params: GridCellParams) => (
      <>
        <ButtonEdit
          row={params.row}
          btnLocation={'meeting-rooms'}
        />
        <ButtonDelete
          id={params.row.id}
          btnLocation={'meeting-rooms'}
        />
      </>
    )
  }
];

export const MeetingRooms = () => {
  const {
    rooms,
    roomsError,
    loading
  } = useSelector((state: IRootReducer) => state.roomsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  const commonClasses = commonStyles();

  if (loading && !roomsError) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Meeting-Rooms">
      <Container maxWidth="xl" >
        {
          (roomsError)
            ?
            <ErrorDiv
              error={roomsError}
            />
            :
            <Grid className={commonClasses.CardsContainer}
              container spacing={6}
            >
              <Box
                className={commonClasses.topRow}
              >
                <Box className={commonClasses.requests_header}>
                  Meeting Rooms
                </Box>
                <AddRoom />
              </Box>
              <EditRoom />
              <ConfirmDelRoom />
              <DataGrid
                rows={rooms || []}
                columns={columns}
                hideFooter 
                autoHeight
              />
            </Grid>
        }
      </Container>
    </Page>
  )
}