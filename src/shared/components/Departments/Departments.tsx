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
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { ErrorDiv } from "../ErrorDiv";
import { LoadingScreen } from "../LoadingScreen";
import { commonStyles } from "../styles/mainPagesStyles";
import { AddDepartment } from "./AddDepartment";
import { ConfirmDelDepart } from "./ConfirmDelDepart";
import { EditDepartment } from "./EditDepartment";

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
          btnLocation={'departments'}
        />
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
    error,
    loading
  } = useSelector((state: IRootReducer) => state.departmentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const commonClasses = commonStyles();

  if (loading && !error) {
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
            <Grid
              className={commonClasses.CardsContainer}
              style={{ width: '900px' }}
              container spacing={6}
            >
              <Box
                className={commonClasses.topRow}
              >
                <Box className={commonClasses.requests_header}>
                  Отделы
                </Box>
                <AddDepartment />
              </Box>
              <EditDepartment />
              <ConfirmDelDepart />
              <DataGrid
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