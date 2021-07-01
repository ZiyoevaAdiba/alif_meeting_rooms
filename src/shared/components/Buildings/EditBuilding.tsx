import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { useStyles } from '../Reservations/Form';
import { ErrorDiv } from '../ErrorDiv';
import { CustomInput } from '../CustomInput';
import { requestEditBuilding, resetBuildingEditing } from '../../../store/actions/buildings';

export const EditBuilding = () => {

  const {
    building,
    editBuildingError
  } = useSelector((state: IRootReducer) => state.buildingsReducer);
  const {
    cities
  } = useSelector((state: IRootReducer) => state.citiesReducer);

  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [building]);

  const handleClose = () => {
    dispatch(resetBuildingEditing());
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Изменение данных офиса</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы изменить данные офиса отредактируйте нужные поля.
        </DialogContentText>
        <Formik
          initialValues={building}
          // validationSchema={UserSchema}
          onSubmit={(values) => {
            delete values.city;
            dispatch(requestEditBuilding(values));
          }}
        >
          {props => (
            <Form
              onSubmit={props.handleSubmit}
              className={classes.signUpForm}
            >
              <CustomInput
                fieldData={
                  {
                    name: 'name',
                    label: "Имя / адрес офиса",
                    type: 'text',
                  }
                }
                formikProps={props}
              />

              <InputLabel
                className={classes.inputGap}
                style={{ marginTop: '10px' }}
                id="select-city"
              >Город
              </InputLabel>
              <Select
                id="select-city"
                value={props.values?.city_id}
                onChange={props.handleChange}
                name='city_id'
                fullWidth
              >
                {
                  cities.map(item => {
                    return <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  }
                  )
                }
              </Select>

              {
                (editBuildingError)
                &&
                <ErrorDiv
                  error={editBuildingError}
                />
              }
              <DialogActions>
                <Button
                  type='submit'
                  variant='contained'
                  className={classes.btnReserve}
                >
                  Сохранить изменения
                </Button>
                <Button
                  onClick={handleClose}
                  color="primary"
                  className={classes.btnCancel}
                >
                  Отмена
                </Button>
              </DialogActions>

            </Form>
          )}
        </Formik>
      </DialogContent>

    </Dialog>
  );
}
