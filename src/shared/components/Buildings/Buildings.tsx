import { Box, Container, Grid } from "@material-ui/core";
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { AddBuilding } from "./AddBuilding";
import { EditBuilding } from "./EditBuilding";
import { ConfirmDelBuilding } from "./ConfirmDelBuilding";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { LoadingScreen } from "../LoadingScreen";
import { getAllBuildings } from "../../../store/actions/buildings";
import { commonStyles } from "../styles/mainPagesStyles";
import { If } from "../If";

const columns: GridColumns = [
  {
    field: "name",
    headerName: "Название/Адрес",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },

  {
    field: "city",
    headerName: "Город",
    type: "string",
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.city.name;
    },
  },

  {
    field: "",
    headerName: "Действие",
    type: "button",
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <>
        <ButtonEdit row={params.row} btnLocation={"buildings"} />
        <ButtonDelete id={params.row.id} btnLocation={"buildings"} />
      </>
    ),
  },
];

export const Buildings = () => {
  const commonClasses = commonStyles();
  const { buildings, buildingsError, loading } = useSelector(
    (state: IRootReducer) => state.buildingsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBuildings());
  }, []);

  if (loading && !buildingsError) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Офисы">
      <Container maxWidth="xl">
        <If
          condition={!buildingsError}
          anotherChildren={<ErrorDiv error={buildingsError} />}
        >
          <Grid className={commonClasses.CardsContainer} container spacing={6}>
            <Box className={commonClasses.topRow}>
              <Box className={commonClasses.requests_header}>Офисы Алифа</Box>

              <AddBuilding />
            </Box>

            <EditBuilding />
            <ConfirmDelBuilding />

            <DataGrid
              rows={buildings || []}
              columns={columns}
              rowsPerPageOptions={[]}
              hideFooter
              autoHeight
            />
          </Grid>
        </If>
      </Container>
    </Page>
  );
};
