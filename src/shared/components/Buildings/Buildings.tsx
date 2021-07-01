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
  GridValueGetterParams,
} from '@material-ui/data-grid';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page"
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { AddBuilding } from "./AddBuilding";
import { EditBuilding } from "./EditBuilding";
import { ConfirmDelBuilding } from "./ConfirmDelBuilding";
import { ErrorDiv } from "../ErrorDiv";
import { LoadingScreen } from "../LoadingScreen";
import { getAllBuildings } from "../../../store/actions/buildings";

const useStyles = makeStyles((theme) => ({
  CardsContainer: {
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 'auto',
    flexDirection: 'column',
    rowGap: 20,
    marginBottom: 40,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  requests_header: {
    fontSize: 30
  },

}));

const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'Имя/Адрес',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 2,
    sortable: false,
  },
  
  {
    field: 'city',
    headerName: 'Город',
    type: 'string',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.city.name
    },
  },
  
  {
    field: '',
    headerName: 'Действие',
    type: 'button',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <>
        <ButtonEdit
          row={params.row}
          btnLocation={'buildings'}
        />
        <ButtonDelete
          id={params.row.id}
          btnLocation={'buildings'}
        />
      </>
    )
  },
];

export const Buildings = () => {
  const classes = useStyles();
  const {
    buildings,
    buildingsError,
    loading
  } = useSelector((state: IRootReducer) => state.buildingsReducer);
  const dispatch = useDispatch();  
  
  useEffect(() => {
    dispatch(getAllBuildings());
  }, []);

  if (loading && !buildingsError) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Офисы">
      <Container maxWidth="xl" >
        {
          (buildingsError)
            ?
            <ErrorDiv
              error={buildingsError}
            />
            :
            <Grid
              className={classes.CardsContainer}
              container
              spacing={6}
            >
              <Box
                className={classes.topRow}
              >
                <Box className={classes.requests_header}>
                   Офисы Алифа
                </Box>
            
                <AddBuilding/>
              </Box>
              <EditBuilding/>
              <ConfirmDelBuilding/>
              <DataGrid
                rows={buildings || []}
                columns={columns}
                rowsPerPageOptions={[]}
                hideFooter
                autoHeight
              />
              
            </Grid>
        }
      </Container>
    </Page>
  )
}