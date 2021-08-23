import { Box, Container, Grid } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColumns } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page";
import { getAllCities } from "../../../store/actions/cities";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { If } from "../If";
import { LoadingScreen } from "../LoadingScreen";
import { commonStyles } from "../styles/mainPagesStyles";
import { AddCity } from "./AddCity";
import { ConfirmDelCity } from "./ConfirmDelCity";
import { EditCity } from "./EditCity";

const columns: GridColumns = [
  {
    field: "name",
    headerName: "Название",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 6,
  },

  {
    field: "actions",
    headerName: "Действие",
    type: "button",
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    flex: 2,
    renderCell: (params: GridCellParams) => (
      <>
        <ButtonEdit row={params.row} btnLocation={"cities"} />
        <ButtonDelete id={params.row.id} btnLocation={"cities"} />
      </>
    ),
  },
];

export const Cities = () => {
  const { cities, error, loading } = useSelector(
    (state: IRootReducer) => state.citiesReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  const commonClasses = commonStyles();

  if (loading && !error) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Города">
      <Container maxWidth="xl">
        <If
          condition={error}
          anotherChildren={
            <Grid
              className={commonClasses.CardsContainer}
              style={{ width: "900px" }}
              container
              spacing={6}
            >
              <Box className={commonClasses.topRow}>
                <Box className={commonClasses.requests_header}>Города</Box>
                <AddCity />
              </Box>

              <EditCity />
              <ConfirmDelCity />

              <DataGrid
                rows={cities || []}
                columns={columns}
                rowsPerPageOptions={[]}
                hideFooter
                autoHeight
              />
            </Grid>
          }
        >
          <ErrorDiv error={error} />
        </If>
      </Container>
    </Page>
  );
};
