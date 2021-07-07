import { Grid, makeStyles } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColumns, GridValueGetterParams } from "@material-ui/data-grid";
import { addHours } from "date-fns";
import { ButtonDelete, ButtonPoppup } from "../ButtonIcons";
import { ConfirmDelReservation } from "./ConfirmDelReservation";
import 'reactjs-popup/dist/index.css';
import { IReservation } from "../../../store/reducers/reservations/interfaces";
import { FC } from "react";
import { ErrorDiv } from "../ErrorDiv";

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
      const reservedDate = `${tjDate.getDate()}/${tjDate.getMonth() + 1}/${tjDate.getFullYear()}`;
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
      const zero = (tjDate.getMinutes() < 10 ? '0' : '')
      const tjTime = `${tjDate.getHours()}:${zero}${tjDate.getMinutes()}`;
      return tjTime;
    }
  },
  {
    field: 'end_time',
    headerName: 'Конец',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 120,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.end_time);
      const tjDate = addHours(date, -5);
      const zero = (tjDate.getMinutes() < 10 ? '0' : '')
      const tjTime = `${tjDate.getHours()}:${zero}${tjDate.getMinutes()}`;
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
          <ButtonDelete
            id={params.row.id}
            columnUserId={params.row.user.id}
            btnLocation={'reservations'}
          />
          <ButtonPoppup
            params={params.row}
            btnLocation={'reservations'}
          />
        </>
      )
    }
  }
];

export const ReservationTable: FC<{ booking: IReservation[] | string, error: null | any }> = ({ booking, error }) => {
  const classes = useStyles();

  const mrID = (typeof booking === 'string')
    ?
    booking
    :
    booking[0]?.meeting_room.id;

  return (
    <Grid className={classes.CardsContainer}
      container spacing={6}
    >
      <ConfirmDelReservation
        mrID={mrID}
      />
      {
        error
        &&
        <ErrorDiv error={error} />
      }
      <DataGrid
        className={classes.table_users}
        rows={
          (typeof booking === 'string')
            ? []
            : booking
        }
        columns={columns}
        disableExtendRowFullWidth
        autoPageSize
        autoHeight
        hideFooter
      />
    </Grid>
  )
}
