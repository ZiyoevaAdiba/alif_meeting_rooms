import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorDiv } from '../ErrorDiv';
import { IRootReducer } from '../../../store/reducers';
import { useStyles } from '../Reservations/Form';
import { CustomInput, CustomSelect } from '../CustomInput';
import { requestAddBuilding } from '../../../store/actions/buildings';
import { IBuilding } from '../../../store/reducers/buildings/interfaces';
import { getAllCities } from '../../../store/actions/cities';

export const AddBuilding = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { addBuildingError } = useSelector((state: IRootReducer) => state.buildingsReducer)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialBuilding: IBuilding = {
    name: '',
    city_id: ''
  }

  const {
    cities
  } = useSelector((state: IRootReducer) => state.citiesReducer);

  const dispatch = useDispatch();

  return (
    <Box>
      <Button
        variant="contained"
        className={classes.btnReserve}
        onClick={handleClickOpen}
      >
        Добавить Офис
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление Офиса</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы добавить Офис заполните форму.
          </DialogContentText>
          <Formik
            initialValues={initialBuilding}
            onSubmit={(values, { setSubmitting }) => {
              // same shape as initial values
              dispatch(requestAddBuilding(values, setSubmitting, setOpen));
            }}
          >
            {props => (
              <Form
                onSubmit={props.handleSubmit}
              >
                <CustomInput
                  fieldData={
                    {
                      name: 'name',
                      label: "Имя либо адрес офиса",
                      type: 'text'
                    }
                  }
                  formikProps={props}
                />

                <CustomSelect
                  itemList={cities}
                  formikProps={props}
                  fieldName='city_id'
                  text="Выбрать город"
                />

                {
                  (addBuildingError)
                  &&
                  <ErrorDiv
                    error={addBuildingError}
                  />
                }
                <DialogActions>
                  <Button
                    type='submit'
                    variant='contained'
                    className={classes.btnReserve}
                  >
                    Добавить
                  </Button>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    className={classes.btnCancel}
                  >
                    отмена
                  </Button>
                </DialogActions>

              </Form>
            )}
          </Formik>
        </DialogContent>

      </Dialog>

    </Box>
  );
}
