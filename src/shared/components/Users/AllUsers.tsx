import {
  Box,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
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
import { ErrorDiv } from "../ErrorDiv";

const useStyles = makeStyles((theme) => ({
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
    field: 'name',
    headerName: 'Имя',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: 'lastname',
    headerName: 'Фамилия',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: 'department',
    headerName: 'Департамент',
    type: 'string',
    align: 'left',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: 'phone',
    headerName: 'Тел.',
    description: 'This column has prices.',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: 'tg_account',
    headerName: 'Телеграмм',
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: 'email',
    headerName: 'Почта',
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: 'role',
    headerName: 'Роль',
    type: 'string',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: '',
    headerName: 'Действие',
    type: 'button',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
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
    error,
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
        <Grid
          className={classes.CardsContainer}
          container
          spacing={6}
        >
          <Box
            className={classes.topRow}
          >
            <Box className={classes.requests_header}>
              Пользователи
            </Box>
            <AddUser
              page={page}
              history={history}
            />
          </Box>
          <EditUser
            page={page}
            history={history}
          />
          <ConfirmDelUser
            page={page}
            history={history}
          />
          <DataGrid
            rows={users || []}
            columns={columns}
            rowsPerPageOptions={[]}
            hideFooter
          />
          <PaginationLink
            pageNumber={pageCount}
            history={history}
            page={page}
            pagLocation={'users'}
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