import { ReserveRoom } from "./ReserveRoom"
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
import { IRootReducer } from "../../../store/reducers";
import { getMRsInfo } from "../../../store/actions/reservations/meetingRoomsData";
import { getAllReservations } from "../../../store/actions/reservations";
import { ButtonDelete } from "../ButtonIcons";
import { ConfirmDelReservation } from "./ConfirmDelReservation";
import { useHistory, useLocation } from "react-router";
import { PaginationLink } from "../PaginationLink";
import { addHours } from "date-fns";

const useStyles = makeStyles((theme) => ({
  table_users: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },

  CardsContainer: {
    marginTop: 30,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 700,
    flexDirection: 'column',
    rowGap: 20,
  },
  requests_header: {
    fontSize: 40
  },
}));


const columns: GridColumns = [
  {
    field: 'date',
    headerName: 'Дата брони',
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.start_time);
      const tjDate = addHours(date, -5);
      const reservedDate = `${tjDate.getFullYear()}/${tjDate.getMonth() + 1}/${tjDate.getDate()}`;
      return reservedDate;
    }
  },
  {
    field: 'start_time',
    headerName: 'Начало',
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.start_time);
      const tjDate = addHours(date, -5);
      const tjTime = `${tjDate.getHours()}:${tjDate.getMinutes()}`;
      return tjTime;
    }
  },
  {
    field: 'end_time',
    headerName: 'Конец',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.end_time);
      const tjDate = addHours(date, -5);
      const tjTime = `${tjDate.getHours()}:${tjDate.getMinutes()}`;
      return tjTime;
    }
  },
  {
    field: 'meeting_room.number',
    headerName: 'Meeting Room',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 230,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.meeting_room.number} ${params.row.meeting_room.name} ${params.row.meeting_room.color}`
  },
  {
    field: 'user.name',
    headerName: 'Кем забронирован',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.user.name}  ${params.row.user.lastname}`
  },
  {
    field: 'purpose',
    headerName: 'Цель',
    type: 'text',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 200,
  },
  {
    field: 'action',
    headerName: 'Действия',
    type: 'button',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 100,
    renderCell: (params: GridCellParams) => (
      <>
        {/* <ButtonEdit
          row={params.row}
          btnLocation={'meeting-rooms'}
        /> */}
        <ButtonDelete
          id={params.row.id}
          columnUserId={params.row.user.id}
          btnLocation={'reservations'}
        />
      </>
    )
  }
];

export const ReservationTable = () => {
  const classes = useStyles();
  const {
    booking,
    pageCount
  } = useSelector((state: IRootReducer) => state.getReservationsReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    dispatch(getMRsInfo());
    dispatch(getAllReservations(page, history));
  }, [dispatch]);

  // if (!requests?.length) {
  //     return <LoadingScreen />;
  // }

  return (
    <Page title="Reservations">
      <Container maxWidth="xl" >
        <Grid className={classes.CardsContainer}
          container spacing={6}
        >
          <Box className={classes.requests_header}>
            Reservations
          </Box>
          <ReserveRoom
            page={page}
            history={history}
          />
          {/* user */}
          <ConfirmDelReservation
            page={page}
            history={history}
          />
          <DataGrid
            className={classes.table_users}
            rows={booking || []}
            columns={columns}
            hideFooterSelectedRowCount
            hideFooterPagination
          />
        </Grid>
        <PaginationLink
          pageNumber={pageCount}
          history={history}
          page={page}
          pagLocation={'users'}
        />
      </Container>
    </Page>
  )
}







// export const room: IRoom = {
//   city: '',
//   color: '',
//   name: '',
//   number: 0,
//   place: '',
//   status: true,
// };

// export const fieldRoom = {
//   city: 'city',
//   color: 'color',
//   created: 'created',
//   id: 'id',
//   name: 'name',
//   number: 'number',
//   place: 'place',
//   status: 'status',
// }

// const useStyles = makeStyles((theme) => ({
//   table_users: {
//     '& .MuiDataGrid-columnsContainer': {
//       backgroundColor: 'rgba(255, 7, 0, 0.55)',
//     },
//   },

//   CardsContainer: {
//     marginTop: 30,
//     justifyContent: 'space-evenly',
//     flexWrap: 'wrap',
//     height: 700,
//     flexDirection: 'column',
//     rowGap: 20,
//   },
//   requests_header: {
//     fontSize: 40
//   },
// }));


// const columns: GridColumns = [
//   {
//     field: 'number',
//     headerName: 'Номер',
//     type: 'number',
//     align: 'center',
//     headerAlign: 'center',
//     disableColumnMenu: true,
//     width: 130,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //     ${params.row.price || ''} ${params.row.currency || ''}
//   },
//   {
//     field: 'name',
//     headerName: 'Название',
//     align: 'left',
//     headerAlign: 'center',
//     disableColumnMenu: true,
//     width: 130,
//     // renderCell: (params: GridCellParams) =>
//     // <Dropdown data={params.row} />
//   },
//   {
//     field: 'city',
//     headerName: 'Город',
//     type: 'string',
//     align: 'left',
//     headerAlign: 'center',
//     disableColumnMenu: true,
//     width: 130
//   },
//   {
//     field: 'color',
//     headerName: 'Цвет',
//     type: 'string',
//     align: 'left',
//     headerAlign: 'center',
//     disableColumnMenu: true,
//     width: 120,
//     editable: true,
//     // valueGetter: (params: GridValueGetterParams) => 
//     //   params.row.color.ToKno
//   },

//   {
//     field: 'place',
//     headerName: 'Расположение',
//     type: 'string',
//     align: 'left',
//     headerAlign: 'center',
//     disableColumnMenu: true,
//     width: 160,
//   },
//   {
//     field: 'status',
//     headerName: 'Статус',
//     type: 'string',
//     align: 'center',
//     headerAlign: 'center',
//     disableColumnMenu: true,
//     width: 130,
//     valueGetter: (params: GridValueGetterParams) => {
//       return params.row.status
//         ? 'Доступен'
//         : 'Недоступен';
//     },
//   },

//   {
//     field: 'actions',
//     headerName: 'Действие',
//     type: 'button',
//     align: 'center',
//     headerAlign: 'center',
//     disableColumnMenu: true,
//     width: 130,
//     renderCell: (params: GridCellParams) => (
//       <>
//         <ButtonEdit
//           row={params.row}
//           isUser={false}
//         />
//         <ButtonDelete
//           id={params.row.id}
//           isUser={false}
//         />
//       </>
//     )
//   }
// ];

// export const MeetingRooms = () => {
