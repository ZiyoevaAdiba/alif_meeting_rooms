import { createStyles, makeStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Button, ButtonGroup } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router';
import { urls } from '../../../routes/urls';
import { ILoginData } from '../../../store/actions/login/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import loaderGif from '../../../assets/images/loading-icon.jpeg';
import { LoginSchema } from '../../validations/LoginValidation';
import { ErrorDiv } from '../ErrorDiv';
import { requestLogin } from '../../../store/actions/login';
import { CustomInput } from '../CustomInput';
import { useEffect } from 'react';
import { requestEmailConfirm } from '../../../store/actions/emailConfirm';
import { store } from "react-notifications-component";


const useStyles = makeStyles(() => createStyles({
  '@global': {
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0
    },
    '#root': {
      height: '100%',
      width: '100%',
      '& .MuiFormControl-fullWidth': {
        marginBottom: 20,
      }
    },
  },
  signUpForm: {
    marginBottom: 20,
  },

  authBtn: {
    marginTop: 20,
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#39b97f',
    '& img': {
      width: '30px',
      height: 'auto',
    },
  },

  btns: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px'
  },

  btnsText: {
    fontSize: 12,
    fontWeight: 550,
    color: '#39b97f'
  },

}));

const fieldInput: ILoginData = {
  email: 'email',
  password: 'password',
}

const loginFields = [
  {
    name: fieldInput.email,
    label: "E-mail",
    type: 'text'
  },
  {
    name: fieldInput.password,
    label: "Пароль",
    type: 'password',
  },
]

export const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    loading,
    error
  } = useSelector((state: IRootReducer) => state.loginReducer);
  const {
    exist
  } = useSelector((state: IRootReducer) => state.emailConfirmReducer);
  const location = useLocation();
  const activationQuery = new URLSearchParams(location.search);
  const activationParam = (activationQuery.get('p') || '');

  useEffect(() => {
    if (activationParam){
      dispatch(requestEmailConfirm(activationParam)); 
    }
  }, []);

  const user: ILoginData = {
    email: '',
    password: '',
  };

  const history = useHistory();

  const signUpClick = () => {
    history.push(urls.signUp);
  }

  const forgetPasswordClick = () => {
    history.push(urls.forget);
  }

  const showSuccessMessage = () => {
    store.addNotification({
      title: "Выполнено!",
      message: "Регистрации прошла успешно.",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 7000,
        onScreen: true
      }
    })
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Meeting Rooms</h1>
      {
        (exist === false)
        &&
        showSuccessMessage()
      }
      <Formik
        initialValues={user}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(requestLogin(values, setSubmitting, history));
        }}
      >
        {props => (
          <Form
            onSubmit={props.handleSubmit}
            className={classes.signUpForm}
          >
            {
              loginFields.map(
                item => <CustomInput
                  key={item.name}
                  fieldData={item}
                  formikProps={props}
                />
              )
            }

            <Button
              className={classes.authBtn}
              disabled={props.isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Вход
              {
                loading
                &&
                <img src={loaderGif} alt="" />
              }
            </Button>
            {
              error
              &&
              <ErrorDiv
                error={error}
              />
            }
            <ButtonGroup className={classes.btns}>
              <Button
                className={classes.btnsText}
                disabled={props.isSubmitting}
                fullWidth
                type="button"
                variant="text"
                onClick={signUpClick}
              >
                Зарегистрироваться
              </Button>
              <Button
                className={classes.btnsText}
                disabled={props.isSubmitting}
                fullWidth
                type="button"
                variant="text"
                onClick={forgetPasswordClick}
              >
                Забыл(а) пароль
              </Button>
            </ButtonGroup>

          </Form>
        )}
      </Formik>
    </div>
  );
}