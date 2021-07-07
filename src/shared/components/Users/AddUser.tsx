import { FC, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
import { CustomInput, CustomSelect } from '../CustomInput';
import { History } from 'history';

export interface IUserPageProps {
  page: number,
  searchInput: string,
  history: History
}

export const AddUser: FC<IUserPageProps> = ({ page, searchInput, history }) => {
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

                <CustomInput
                  // style={{ marginTop: '10px' }}
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
