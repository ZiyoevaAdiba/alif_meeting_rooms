import { createStyles, makeStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router';
import { urls } from '../../../routes/urls';
import { useDispatch, useSelector } from 'react-redux';
import { requestPassword } from '../../../store/actions/login';
import { IRootReducer } from '../../../store/reducers';
import loaderGif from '../../../assets/images/loading-icon.jpeg';
import { IForgetData } from '../../../store/actions/forget/interfaces';
import { ErrorDiv } from '../ErrorDiv';

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
      width: '100%'
    },
  },
  signUpForm: {
    '& input': {
      marginTop: 5,
    }
  },
  authBtn: {
    marginTop: 20,
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#39b97f',
    '& img': {
      width: '30px',
      height: 'auto',
    }
  },
  
  btnsText: {
    marginTop: '10px',      
    fontSize: 12,
    fontWeight: 550,
    color: '#39b97f',
  },

}));

const ForgetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Заполните поле'),
});

const fieldInput: IForgetData = {
  email: 'email',
}


export const ForgetPasswordForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: IRootReducer) => state.loginReducer);


  const user: IForgetData = {
    email: '',
  };

  const history = useHistory();
  // const { loading } = useSelector((state: IRootReducer) => state.signUpReducer);


  const sendPasswordClick = () => {
    history.push(urls.login);
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Отправка пароля</h1>
      <Formik
        initialValues={user}
        validationSchema={ForgetSchema}
        onSubmit={(values, { setSubmitting }) => {
          // same shape as initial values
          dispatch(requestPassword(values, setSubmitting));
          sendPasswordClick();
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
            onSubmit={handleSubmit}>
            <TextField
              name={fieldInput.email}
              label="e-mail"
              fullWidth
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              type='text'
            />
            
            <Button
              className={classes.authBtn}
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Подтвердить
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
              disabled={isSubmitting}
              fullWidth
              type="button"
              variant="text"
              onClick={sendPasswordClick}
            >
              отмена
            </Button>
          </Form>
        )}
      </Formik>
    </div>

  );
}