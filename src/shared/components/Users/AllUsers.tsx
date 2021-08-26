import { Box, Container, Grid } from "@material-ui/core";
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page";
import { getAllUsers } from "../../../store/actions/users";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { ConfirmDelUser } from "./ConfirmDelUser";
import { PaginationLink } from "../PaginationLink";
import { useHistory, useLocation } from "react-router-dom";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { LoadingScreen } from "../LoadingScreen";
import { SearchForm } from "./SearchForm";
import { commonStyles } from "../styles/mainPagesStyles";
import { If } from "../If";

const columns: GridColumns = [
  {
    field: "name",
    headerName: "Имя",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: "last_name",
    headerName: "Фамилия",
    type: "string",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: "department",
    headerName: "Департамент",
    type: "string",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.department.name;
    },
  },
  {
    field: "phone",
    headerName: "Тел.",
    description: "This column has prices.",
    type: "number",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: "tg_account",
    headerName: "Телеграмм",
    type: "string",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: "email",
    headerName: "Почта",
    type: "string",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: "role",
    headerName: "Роль",
    type: "string",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  {
    field: "",
    headerName: "Действие",
    type: "button",
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <>
        <ButtonEdit row={params.row} btnLocation={"users"} />
        <ButtonDelete id={params.row.id} btnLocation={"users"} />
      </>
    ),
  },
];

export const AllUsers = () => {
  const commonClasses = commonStyles();
  const { users, pageCount, usersError, loading } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const searchQuery = new URLSearchParams(location.search);
  const searchParam = searchQuery.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchParam);

  useEffect(() => {
    setSearchInput(searchParam);
    dispatch(getAllUsers(page, searchInput, history));
  }, []);

  if (loading && !usersError) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Пользователи">
      <Container maxWidth="xl">
        <If
          condition={!usersError}
          anotherChildren={<ErrorDiv error={usersError} />}
        >
          <Grid className={commonClasses.CardsContainer} container spacing={6}>
            <Box className={commonClasses.topRow}>
              <Box className={commonClasses.requests_header}>Пользователи</Box>

              <SearchForm
                page={page}
                history={history}
                searchInput={searchInput}
                setsearchInput={setSearchInput}
              />
              <AddUser
                page={page}
                searchInput={searchInput}
                history={history}
              />
            </Box>
            <EditUser page={page} searchInput={searchInput} history={history} />
            <ConfirmDelUser
              page={page}
              searchInput={searchInput}
              history={history}
            />
            <DataGrid
              rows={users || []}
              columns={columns}
              rowsPerPageOptions={[]}
              hideFooter
              autoHeight
            />
            <PaginationLink
              pageNumber={pageCount}
              searchInput={searchInput}
              history={history}
              page={page}
            />
          </Grid>
        </If>
      </Container>
    </Page>
  );
};
