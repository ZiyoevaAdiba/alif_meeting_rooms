import { useEffect, useState } from 'react';
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
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { fieldInput } from '../Auth/SignUpForm';
import { requestEditUser, resetUserEditing } from '../../../store/actions/users';
import { UserSchema } from '../../validations/UserValidation';
import { useStyles } from '../Reservations/Form';
import { ErrorDiv } from '../ErrorDiv';
import { hideOverflow, showOverflow } from '../../handlerStyle/bodyOverflow';


export const EditUser = ({ page, history }: any) => {

  const {
    user,
    userError
  } = useSelector((state: IRootReducer) => state.usersReducer)
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  const handleClose = () => {
    showOverflow();
    dispatch(resetUserEditing());
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Изменение данных о пользователе</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы изменить данные о пользователе отредактируйте нужные поля.
        </DialogContentText>
        <Formik
          initialValues={user}
          validationSchema={UserSchema}
          onSubmit={(values) => {
            dispatch(requestEditUser(page, history, values));
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
                value={values?.name}
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
                value={values?.lastname}
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
                value={values?.email}
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
                value={values?.phone}
                onBlur={handleBlur}
                type='text'
              />

              <TextField
                className={classes.inputGap}
                name={fieldInput.department}
                label="департамент"
                fullWidth
                error={Boolean(touched.department && errors.department)}
                helperText={touched.department && errors.department}
                onChange={handleChange}
                value={values?.department}
                onBlur={handleBlur}
                type='text'
              />

              <TextField
                className={classes.inputGap}
                name={fieldInput.tg_account}
                label="аккаунт telegram"
                fullWidth
                error={Boolean(touched.tg_account && errors.tg_account)}
                helperText={touched.tg_account && errors.tg_account}
                onChange={handleChange}
                value={values?.tg_account}
                onBlur={handleBlur}
                type='text'
              />

              <InputLabel
                className={classes.inputGap}
                style={{ marginTop: '30px' }}
                id="select-label"
              >Назначить роль
              </InputLabel>
              <Select
                id="simple-select"
                value={values?.role}
                onChange={handleChange}
                name={fieldInput.role}
                fullWidth
              >
                <MenuItem value={'admin'}>Админ</MenuItem>
                <MenuItem value={'user'}>Пользователь</MenuItem>
              </Select>
              {
                (userError)
                &&
                <ErrorDiv
                  error={userError}
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
