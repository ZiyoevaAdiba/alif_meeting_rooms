import {
  Box,
  CardMedia,
  Container,
  Grid,
  makeStyles,
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
import { getAllRooms, getRoomsSuccess } from "../../../store/actions/rooms";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { IRoom } from "../../../store/reducers/rooms/interfaces";
import { AddRoom } from "./AddRoom";
import { EditRoom } from "./EditRoom";
import { ConfirmDelRoom } from "./ConfirmDelRoom";
import { ErrorDiv } from "../ErrorDiv";

export const room: IRoom = {
  city: '',
  name: '',
  number: 0,
  photo: '',
  place: '',
  color: '',
  // photo: new File([], ''),
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

const useStyles = makeStyles((theme) => ({
  table_users: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },

  CardsContainer: {
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 800,
    flexDirection: 'column',
    rowGap: 20,
    marginBottom: 20,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  requests_header: {
    fontSize: 40
  },

}));

const columns: GridColumns = [
  {
    field: 'number',
    headerName: 'Номер',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Название',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
  },

  {
    field: 'city',
    headerName: 'Город',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
  },
  {
    field: 'photo',
    headerName: 'Фото',
    type: 'image',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 1.5,
    renderCell: (params: GridValueGetterParams) => {
      // ()
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
    align: 'center',
    headerAlign: 'center',
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
    // width: 130,
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
    roomsError 
  } = useSelector((state: IRootReducer) => state.roomsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  const classes = useStyles();

  // if (!requests?.length) {
  //     return <LoadingScreen />;
  // }

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
            <Grid className={classes.CardsContainer}
              container spacing={6}
            >
              <Box
                className={classes.topRow}
              >
                <Box className={classes.requests_header}>
                  Meeting Rooms
                </Box>
                <AddRoom />
              </Box>
              <EditRoom />
              <ConfirmDelRoom />
              <DataGrid
                className={classes.table_users}
                rows={rooms || []}
                columns={columns}
                rowsPerPageOptions={[]}
                hideFooter
              />
            </Grid>
        }
      </Container>
    </Page>
  )
}