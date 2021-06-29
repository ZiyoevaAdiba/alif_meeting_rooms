import { createStyles, makeStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Button, ButtonGroup } from '@material-ui/core'
import { useHistory } from 'react-router';
import { urls } from '../../../routes/urls';
import { ILoginData } from '../../../store/actions/login/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import loaderGif from '../../../assets/images/loading-icon.jpeg';
import { LoginSchema } from '../../validations/LoginValidation';
import { ErrorDiv } from '../ErrorDiv';
import { requestLogin } from '../../../store/actions/login';
import { CustomInput } from '../CustomInput';

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
    name: fieldInput.email ,
    label: "E-mail",
    type: 'text'
  },
  {
    name: fieldInput.password ,
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

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Meeting Rooms</h1>
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