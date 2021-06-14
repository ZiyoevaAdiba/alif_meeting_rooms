import { Box, Grid, makeStyles } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColumns, GridValueGetterParams } from "@material-ui/data-grid";
import { addHours } from "date-fns";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete } from "../ButtonIcons";
import { ConfirmDelReservation } from "./ConfirmDelReservation";
import 'reactjs-popup/dist/index.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  table_users: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    }
  },
  cardsRoot: {
    marginTop: 30,
    gap: 30,
  },
  CardsContainer: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 700,
    flexDirection: 'column',
    rowGap: 20,
    margin: 0
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
    field: 'action',
    headerName: 'Действия',
    type: 'button',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 100,
    renderCell: (params: GridCellParams) => {
      console.log(params.row.user)
      return (
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
          <Popup
            trigger={<AccountCircleIcon />}
            on='hover'
            position='bottom center'
            nested
          >
            {
              `${params.row.user.lastname} 
          ${params.row.user.name}
          @${params.row.user.tg_account}`
            }
          </Popup>
        </>
      )
    }
  }
];

export const ReservationTable = () => {
  const classes = useStyles();
  const { booking } = useSelector((state: IRootReducer) => state.getMRReservationsReducer)

  return (
    <>
      <Grid className={classes.CardsContainer}
        container spacing={6}
      >
        <Box className={classes.requests_header}>
          Reservations
        </Box>
        <ConfirmDelReservation
          mrID={booking[0]?.meeting_room.id}
        />
        <DataGrid
          className={classes.table_users}
          rows={booking || []}
          columns={columns}
          hideFooterSelectedRowCount
          hideFooterPagination
          disableExtendRowFullWidth
          autoPageSize
        />
      </Grid>
      {/* // {
        //   (error)
        //   &&
        //   <ErrorDiv
        //     error={error}
        //   /> 
        // } */}

    </>

  )
}
