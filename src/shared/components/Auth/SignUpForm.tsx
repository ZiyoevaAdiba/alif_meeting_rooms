import {
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { requestRegistration } from '../../../store/actions/signUp';
import { IRootReducer } from '../../../store/reducers';
import loaderGif from '../../../assets/images/loading-icon.jpeg';
import { useHistory } from 'react-router';
import { urls } from '../../../routes/urls';
import { SignupSchema } from '../../validations/SignUpValidation';
import { getDepartments } from '../../../store/actions/departments';
import { useEffect } from 'react';
import { ErrorDiv } from '../ErrorDiv';
import { Page } from '../../../layouts/Page';
import { CustomInput, CustomSelect, greenStyle } from '../CustomInput';
import { fieldInput, user, userDataFields } from '../../consts/userConsts';

const useStyles = makeStyles(() => createStyles({
  authBtn: {
    marginTop: 30,
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#39b97f',
    '& img': {
      width: '30px',
      height: 'auto',
    }
  },

  btnsText: {
    marginTop: '20px',
    fontSize: 12,
    fontWeight: 550,
    color: '#39b97f',
  }

}));

export const SignUpForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: IRootReducer) => state.signUpReducer);

  useEffect(() => {
    dispatch(getDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    departments
  } = useSelector((state: IRootReducer) => state.departmentsReducer);

  const history = useHistory();

  const loginClick = () => {
    history.push(urls.login);
  }

  return (
    <Page title="Регистрация">
      <h1 style={{ textAlign: 'center' }}>Регистрация</h1>
      <Formik
        initialValues={user}
        validationSchema={SignupSchema}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(requestRegistration(values, history, setSubmitting));
        }
        }
      >
        {props => (
          <Form
            onSubmit={props.handleSubmit}
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
              text="Выбрать отдел"
            />            
            <CustomInput
              fieldData={
                {
                  name: fieldInput.password,
                  label: "Пароль",
                  type: 'password'
                }
              }
              formikProps={props}
            />

            <Button
              className={classes.authBtn}
              disabled={props.isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Зарегистрироваться
              {
                loading
                &&
                <img src={loaderGif} alt="" />
              }
            </Button>
            {
              (error)
              &&
              <ErrorDiv
                error={error}
              />
            }
            <Button
              className={classes.btnsText}
              disabled={props.isSubmitting}
              fullWidth
              type="button"
              variant="text"
              onClick={loginClick}
            >
              Есть аккаунт? Войти
            </Button>

          </Form>
        )}
      </Formik>
    </Page >
  );
}