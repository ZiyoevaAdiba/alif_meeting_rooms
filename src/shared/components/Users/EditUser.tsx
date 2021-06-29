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
import { requestEditUser, resetUserEditing } from '../../../store/actions/users';
import { UserSchema } from '../../validations/UserValidation';
import { useStyles } from '../Reservations/Form';
import { ErrorDiv } from '../ErrorDiv';
import { fieldInput, userDataFields } from '../../consts/userConsts';
import { CustomInput } from '../CustomInput';


export const EditUser = ({ page, history, searchInput }: any) => {

  const {
    user,
    userError
  } = useSelector((state: IRootReducer) => state.usersReducer);
  const {
    departments
  } = useSelector((state: IRootReducer) => state.departmentsReducer);

  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [user]);

  const handleClose = () => {
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
            delete values.department;
            dispatch(requestEditUser(page, searchInput, history, values));
          }}
        >
          {props => (
            <Form
              onSubmit={props.handleSubmit}
              className={classes.signUpForm}
            >
              {
                userDataFields.map(
                  item => <CustomInput
                    key={item.name}
                    fieldData={item}
                    formikProps={props}
                  />
                )
              }

              <InputLabel
                className={classes.inputGap}
                style={{ marginTop: '10px' }}
                id="select-department"
              >Отдел
              </InputLabel>
              <Select
                id="select-department"
                value={props.values?.department_id}
                onChange={props.handleChange}
                name={fieldInput.department_id}
                fullWidth
              >
                {
                  departments.map(item => {
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

              <InputLabel
                className={classes.inputGap}
                style={{ marginTop: '20px' }}
                id="select-role"
              >Назначить роль
              </InputLabel>
              <Select
                id="select-role"
                value={props.values?.role || ''}
                onChange={props.handleChange}
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
