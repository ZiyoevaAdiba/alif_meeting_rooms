import {
  Box,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, * as React$1 from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColumns,
} from '@material-ui/data-grid';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page"
import { getAllUsers } from "../../../store/actions/getUsers";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { ConfirmDelUser } from "./ConfirmDelUser";
import { PaginationLink } from "../PaginationLink";
import { useHistory, useLocation } from "react-router-dom";
import { urls } from "../../../routes/urls";


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
    field: 'id',
    headerName: 'id',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    width: 70,
  },
  {
    field: 'name',
    headerName: 'Имя',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 130,
    // renderCell: (params: GridCellParams) =>
    // <Dropdown data={params.row} />
  },
  {
    field: 'lastname',
    headerName: 'фамилия',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 130
  },
  {
    field: 'department',
    headerName: 'Департамент',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 150,
    editable: true
  },
  {
    field: 'phone',
    headerName: 'Тел.',
    description: 'This column has prices.',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 130,
    // valueGetter: (params: GridValueGetterParams) =>
    //     ${params.row.price || ''} ${params.row.currency || ''}
  },
  {
    field: 'tg_account',
    headerName: 'Телеграмм',
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 130,
  },
  {
    field: 'email',
    headerName: 'Почта',
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 130,
    // valueGetter: (params: GridValueGetterParams) =>
    //     ${params.row.sum || ''} ${params.row.currency || ''}
  },
  {
    field: 'role',
    headerName: 'Роль',
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 130,
  },
  {
    field: '',
    headerName: 'Действие',
    type: 'button',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 130,
    renderCell: (params: GridCellParams) => (
      <>
        <ButtonEdit
          row={params.row}
          btnLocation={'users'}
        />
        <ButtonDelete
          id={params.row.id}
          btnLocation={'users'}
        />
      </>
    )
  },
];

export const AllUsers = () => {
  const classes = useStyles();
  const {
    users,
    pageCount,
  } = useSelector((state: IRootReducer) => state.getUsersReducer);
  const dispatch = useDispatch();
  const history = useHistory();


  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  useEffect(() => {
    dispatch(getAllUsers(page, history));
  }, [dispatch]);
  // if (!requests?.length) {
  //     return <LoadingScreen />;
  // }

  return (
    <Page title="Пользователи">
      <Container maxWidth="xl" >
        <Grid className={classes.CardsContainer}
          container spacing={6}
        >
          <Box className={classes.requests_header}>
            Пользователи
          </Box>
          <AddUser
            page={page}
            history={history}
          />
          <EditUser
            page={page}
            history={history}
          />
          <ConfirmDelUser
            page={page}
            history={history}
          />
          <DataGrid className={classes.table_users}
            rows={users || []}
            columns={columns}
            rowsPerPageOptions={[]}
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