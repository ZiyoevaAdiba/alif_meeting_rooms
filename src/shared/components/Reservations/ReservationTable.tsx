import { Grid, makeStyles } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColumns, GridValueGetterParams } from "@material-ui/data-grid";
import { addHours } from "date-fns";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonPoppup } from "../ButtonIcons";
import { ConfirmDelReservation } from "./ConfirmDelReservation";
import 'reactjs-popup/dist/index.css';

const useStyles = makeStyles((theme) => ({
  table_users: {
    width: 511,
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgb(57 185 127)',
      color: "white",
      fontSize: '16px'
    },
  },
  cardsRoot: {
    marginTop: 30,
    gap: 30,
  },
  CardsContainer: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'column',
    rowGap: 20,
    margin: 0,
    width: 'fit-content'
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
    width: 120,
    renderCell: (params: GridCellParams) => {
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
          <ButtonPoppup
            // id={params.row.id}
            params={params.row}
            // columnUserId={params.row.user.id}
            btnLocation={'reservations'}
          />
          {/* <Popup
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
          </Popup> */}
        </>
      )
    }
  }
];

export const ReservationTable = () => {
  const classes = useStyles();
  const { booking } = useSelector((state: IRootReducer) => state.getMRReservationsReducer)
  // const mrID = (typeof booking === 'string')
  const mrID = (booking === null)
    ?
    '' // set just booking
    :
    booking[0]?.meeting_room.id;

  return (
    <>
      <Grid className={classes.CardsContainer}
        container spacing={6}
      >
        <ConfirmDelReservation
          mrID={mrID}
        />
        <DataGrid
          className={classes.table_users}
          rows={booking || []}
          columns={columns}
          disableExtendRowFullWidth
          autoPageSize
          autoHeight
          hideFooter
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
