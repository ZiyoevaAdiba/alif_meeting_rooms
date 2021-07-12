import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router';
import { urls } from '../../../routes/urls';
import { useDispatch, useSelector } from 'react-redux';
import { requestPassword } from '../../../store/actions/forget';
import { IRootReducer } from '../../../store/reducers';
import loaderGif from '../../../assets/images/loading-icon.jpeg';
import { IForgetData } from '../../../store/actions/forget/interfaces';
import { ErrorDiv } from '../ErrorDiv';
import { CustomInput } from '../CustomInput';
import { authStyles } from './authStyles';

const ForgetSchema = Yup.object().shape({
  email: Yup.string().email('Почта недействительна').required('Заполните поле'),
});

const fieldInput: IForgetData = {
  email: 'email',
}

export const ForgetPasswordForm = () => {
  const authClasses = authStyles();
  const dispatch = useDispatch();
  const {
    loading,
    error
  } = useSelector((state: IRootReducer) => state.forgetReducer);
  const history = useHistory();


  const user: IForgetData = {
    email: '',
  };

  const cancelPasswordBtn = () => {
    history.push(urls.login);
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Отправка пароля</h1>
      <Formik
        initialValues={user}
        validationSchema={ForgetSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(requestPassword(values, setSubmitting, history));
        }
        }
      >
        {props => (
          <Form
            onSubmit={props.handleSubmit}>
            <CustomInput
              fieldData={
                {
                  name: fieldInput.email,
                  label: "E-mail",
                  type: 'email'
                }
              }
              formikProps={props}
            />
            <Button
              className={authClasses.authBtn}
              disabled={props.isSubmitting}
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
              className={authClasses.btnsText}
              disabled={props.isSubmitting}
              fullWidth
              type="button"
              variant="text"
              onClick={cancelPasswordBtn}
            >
              отмена
            </Button>
          </Form>
        )}
      </Formik>
    </div>

  );
}