import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
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
import { requestAddUser } from '../../../store/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { SignupSchema } from '../../validations/SignUpValidation';
import { ErrorDiv } from '../ErrorDiv';
import { IRootReducer } from '../../../store/reducers';
import { getDepartments } from '../../../store/actions/departments';
import { useStyles } from '../Reservations/Form';
import { fieldInput, user, userDataFields } from '../../consts/userConsts';
import { CustomInput } from '../CustomInput';

export const AddUser = ({ page, searchInput, history }: any) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { error } = useSelector((state: IRootReducer) => state.signUpReducer)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    departments
  } = useSelector((state: IRootReducer) => state.departmentsReducer);


  const dispatch = useDispatch();

  return (
    <Box>
      <Button
        variant="contained"
        className={classes.btnReserve}
        onClick={handleClickOpen}
      >
        Добавить Пользователя
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление пользователя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы добавить пользователя заполните форму.
          </DialogContentText>
          <Formik
            initialValues={user}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              // same shape as initial values
              dispatch(requestAddUser(page, searchInput, history, values, setSubmitting, setOpen));
            }}
          >
            {props => (
              <Form
                onSubmit={props.handleSubmit}
                className={classes.signUpForm}
              >
                {
                  userDataFields.map(
                    item => {
                      return <CustomInput
                        key={item.name}
                        fieldData={item}
                        formikProps={props}
                      />
                    }
                  )
                }

                <InputLabel
                  className={classes.signUpForm}
                  style={{ marginTop: '10px' }}
                  id="demo-simple-select"
                  error={Boolean(props.touched.department && props.errors.department)}
                  onBlur={props.handleBlur}
                >Выбрать отдел
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={props.values.department_id}
                  onChange={props.handleChange}
                  name={fieldInput.department_id}
                  fullWidth
                >
                  {
                    departments.map(
                      (item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        )
                      }
                    )
                  }
                </Select>

                <InputLabel
                  className={classes.inputGap}
                  style={{ marginTop: '20px' }}
                  id="demo-simple-select"
                >Назначить роль
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={props.values.role}
                  onChange={props.handleChange}
                  name={fieldInput.role}
                  fullWidth
                >
                  <MenuItem value={'admin'}>Админ</MenuItem>
                  <MenuItem value={'user'}>Пользователь</MenuItem>
                </Select>
                <CustomInput
                  style={{ marginTop: '10px' }}
                  fieldData={
                    {
                      name: fieldInput.password,
                      label: "Пароль",
                      type: 'password'
                    }
                  }
                  formikProps={props}
                />
                {
                  (error)
                  &&
                  <ErrorDiv
                    error={error}
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
