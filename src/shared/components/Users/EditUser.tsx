import { FC, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
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
import { CustomInput, CustomSelect } from '../CustomInput';
import { IUserPageProps } from './AddUser';


export const EditUser: FC<IUserPageProps> = ({ page, history, searchInput }: any) => {

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

              <CustomSelect
              itemList={departments}
              formikProps={props}
              fieldName={fieldInput.department_id}
              text="Отдел"
              />

              <CustomSelect
              formikProps={props}
              fieldName={fieldInput.role}
              text="Назначить роль"
              />

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
