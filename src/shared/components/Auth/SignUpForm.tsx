import { createStyles, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { requestRegistration } from '../../../store/actions/signUp';
import { IUserData } from '../../../store/actions/signUp/interfaces';
import { IRootReducer } from '../../../store/reducers';
import loaderGif from '../../../assets/images/loading-icon.jpeg';
import { useHistory } from 'react-router';
import { urls } from '../../../routes/urls';
import { SignupSchema } from '../../validations/SignUpValidation';
import { removeToken } from '../../../store/actions/login';
import { getAllDepartments, getDepartments } from '../../../store/actions/departments';
import { useEffect } from 'react';


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
  },

}));

export const fieldInput: IUserData = {
  name: 'name',
  lastname: 'lastname',
  email: 'email',
  phone: 'phone',
  department: 'department',
  tg_account: 'tg_account',
  password: 'password',
  role: 'role',
}

export const user: IUserData = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
  department: '',
  tg_account: '',
  password: '',
  role: '',
};

export const SignUpForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: IRootReducer) => state.signUpReducer);
  removeToken();

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const {
    departments
  } = useSelector((state: IRootReducer) => state.getDepartmentsReducer);


  const history = useHistory();

  const loginClick = () => {
    history.push(urls.login);
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Регистрация</h1>
      <Formik
        initialValues={user}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          // same shape as initial values
          dispatch(requestRegistration(values, setSubmitting));

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
            className={classes.signUpForm}
            onSubmit={handleSubmit}>

            <TextField
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
            >Выбрать отдел
            </InputLabel>
            <Select
              id="demo-simple-select"
              value={values.meeting_room_id}
              onChange={handleChange}
              name={fieldInput.department}
              fullWidth
            >
              {
                departments.map(
                  (item) => {
                    // console.log(item);
                    return <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                  }
                )
              }

            </Select>

            <TextField
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

            <Button
              className={classes.authBtn}
              disabled={isSubmitting}
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
            <Button
              className={classes.btnsText}
              disabled={isSubmitting}
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
    </div>

  );
}