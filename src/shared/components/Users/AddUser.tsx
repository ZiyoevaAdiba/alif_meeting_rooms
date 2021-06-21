import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fieldInput, user } from '../Auth/SignUpForm';
import { Form, Formik } from 'formik';
import { requestAddUser } from '../../../store/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { SignupSchema } from '../../validations/SignUpValidation';
import { ErrorDiv } from '../ErrorDiv';
import { IRootReducer } from '../../../store/reducers';
import { getDepartments } from '../../../store/actions/departments';
import { useStyles } from '../Reservations/Form';

export const AddUser = ({ page, history }: any) => {
  const [open, setOpen] = React.useState(false);
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
              dispatch(requestAddUser(page, history, values, setSubmitting, setOpen));

            }
            }
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,

            }: any) => (
              <Form
                onSubmit={handleSubmit}
                className={classes.signUpForm}
              >
                <TextField
                  className={classes.inputGap}
                  name={fieldInput.name}
                  label="имя"
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  type='text'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldInput.lastname}
                  label="фамилия"
                  error={Boolean(touched.lastname && errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                  fullWidth
                  onChange={handleChange}
                  value={values.lastname}
                  onBlur={handleBlur}
                  type='text'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldInput.email}
                  label="e-mail"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  type='email'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldInput.phone}
                  label="Телефон"
                  fullWidth
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleBlur}
                  type='text'
                />

                <InputLabel
                  className={classes.signUpForm}
                  style={{ marginTop: '30px' }}
                  id="demo-simple-select-label"
                  error={Boolean(touched.department && errors.department)}
                  onBlur={handleBlur}
                >Выбрать отдел
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={values.department}
                  onChange={handleChange}
                  name={fieldInput.department}
                  fullWidth
                >
                  {
                    departments.map(
                      (item) => {
                        return (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        )
                      }
                    )
                  }

                </Select>

                <TextField
                  className={classes.inputGap}
                  name={fieldInput.tg_account}
                  label="аккаунт telegram"
                  fullWidth
                  error={Boolean(touched.tg_account && errors.tg_account)}
                  helperText={touched.tg_account && errors.tg_account}
                  onChange={handleChange}
                  value={values.tg_account}
                  onBlur={handleBlur}
                  type='text'
                />

                <TextField
                  className={classes.inputGap}
                  name={fieldInput.password}
                  label="введите пароль"
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                  type='password'
                />

                <InputLabel
                  className={classes.inputGap}
                  style={{ marginTop: '30px' }}
                  id="demo-simple-select-label"
                >Назначить роль
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={values.role}
                  onChange={handleChange}
                  name={fieldInput.role}
                  fullWidth
                >
                  <MenuItem value={'admin'}>Админ</MenuItem>
                  <MenuItem value={'user'}>Пользователь</MenuItem>
                </Select>
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
                    variant='outlined'
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
