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
import { getAllDepartments } from "../../../store/actions/departments/index";
import { IRootReducer } from "../../../store/reducers";
import { ButtonDelete } from "../ButtonIcons";
import { ErrorDiv } from "../ErrorDiv";
import { LoadingScreen } from "../LoadingScreen";
import { AddDepartment } from "./AddDepartment";
import { ConfirmDelDepart } from "./ConfirmDelDepart";

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
    rowGap: 20,
    marginBottom: 20,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  requests_header: {
    fontSize: 35
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
        <ButtonDelete
          id={params.row.id}
          btnLocation={'departments'}
        />
      </>
    )
  }
];

export const Departments = () => {
  const {
    departments,
    error
  } = useSelector((state: IRootReducer) => state.departmentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const classes = useStyles();

  if (!departments.length && !error) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Отделы">
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
              <Box className={classes.topRow}>
                <Box className={classes.requests_header}>
                  Отделы
                </Box>

                <AddDepartment />
              </Box>
              <ConfirmDelDepart />
              <DataGrid
                className={classes.table_users}
                rows={departments || []}
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