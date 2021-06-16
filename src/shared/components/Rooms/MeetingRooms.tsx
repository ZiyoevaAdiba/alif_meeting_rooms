import {
  Box,
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
import { getAllRooms } from "../../../store/actions/getRooms";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { IRoom } from "../../../store/reducers/getRooms/interfaces";
import { AddRoom } from "./AddRoom";
import { EditRoom } from "./EditRoom";
import { ConfirmDelRoom } from "./ConfirmDelRoom";
import { ErrorDiv } from "../ErrorDiv";


export const room: IRoom = {
  city: '',
  color: '',
  name: '',
  number: 0,
  place: '',
  status: true,
};

export const fieldRoom = {
  city: 'city',
  color: 'color',
  created: 'created',
  id: 'id',
  name: 'name',
  number: 'number',
  place: 'place',
  status: 'status',
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

    // width: 130,
    // valueGetter: (params: GridValueGetterParams) =>
    //     ${params.row.price || ''} ${params.row.currency || ''}
  },
  {
    field: 'name',
    headerName: 'Название',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    // width: 150,
    flex: 2,
    // renderCell: (params: GridCellParams) =>
    // <Dropdown data={params.row} />
  },
  {
    field: 'city',
    headerName: 'Город',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    // width: 130
  },
  {
    field: 'color',
    headerName: 'Цвет',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    // width: 120,
    flex: 2,

  },

  {
    field: 'place',
    headerName: 'Расположение',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    // width: 180,
    flex: 2,

  },
  {
    field: 'status',
    headerName: 'Статус',
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    // width: 130,
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
  const { rooms, error } = useSelector((state: IRootReducer) => state.getRoomsReducer);
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
        {
          (error)
          &&
          <ErrorDiv
            error={error}
          />
        }
      </Container>
    </Page>
  )
}