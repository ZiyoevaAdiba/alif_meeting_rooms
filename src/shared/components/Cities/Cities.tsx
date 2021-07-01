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
} from '@material-ui/data-grid';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../layouts/Page"
import { getAllCities } from "../../../store/actions/cities";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { ErrorDiv } from "../ErrorDiv";
import { LoadingScreen } from "../LoadingScreen";
import { AddCity } from "./AddCity";
import { ConfirmDelCity } from "./ConfirmDelCity";
import { EditCity } from "./EditCity";

const useStyles = makeStyles((theme) => ({
  table_users: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },

  CardsContainer: {
    marginTop: 15,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    height: 'auto',
    width: 900,
    flexDirection: 'column',
    rowGap: 10,
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
    headerName: 'Название',
    align: 'left',
    headerAlign: 'left',
    disableColumnMenu: true,
    flex: 6,
  },

  {
    field: 'actions',
    headerName: 'Действие',
    type: 'button',
    align: 'center',
    headerAlign: 'center',
    disableColumnMenu: true,
    flex: 2,
    renderCell: (params: GridCellParams) => (
      <>
        <ButtonEdit
          row={params.row}
          btnLocation={'cities'}
        />
        <ButtonDelete
          id={params.row.id}
          btnLocation={'cities'}
        />
      </>
    )
  }
];

export const Cities = () => {
  const {
    cities,
    error,
    loading
  } = useSelector((state: IRootReducer) => state.citiesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  const classes = useStyles();

  if (loading && !error) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Города">
      <Container maxWidth="xl" >
        {
          (error)
            ?
            <ErrorDiv
              error={error}
            />
            :
            <Grid className={classes.CardsContainer}
              container spacing={6}
            >
              <Box
                className={classes.topRow}
              >
                <Box className={classes.requests_header}>
                  Города
                </Box>
                <AddCity />
              </Box>
              <EditCity />
              <ConfirmDelCity />
              <DataGrid
                className={classes.table_users}
                rows={cities || []}
                columns={columns}
                rowsPerPageOptions={[]}
                hideFooter
                autoHeight
              />
            </Grid>
        }

      </Container>
    </Page >
  )
}