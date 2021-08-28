import { createStyles, makeStyles } from "@material-ui/core";
import { Formik, Form } from "formik";
import { Button, ButtonGroup } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { urls } from "../../../routes/urls";
import { ILoginData } from "../../../store/actions/login/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import loaderGif from "../../../assets/images/loading-icon.jpeg";
import { LoginSchema } from "../../validations/LoginValidation";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { loginResetError, requestLogin } from "../../../store/actions/login";
import { CustomInput } from "../CustomInput";
import { useEffect } from "react";
import { requestEmailConfirm } from "../../../store/actions/emailConfirm";
import { authStyles } from "./authStyles";
import { If } from "../If";

const useStyles = makeStyles(() =>
  createStyles({
    loginForm: {
      marginBottom: 20,
    },

    btns: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
  })
);

const fieldInput: ILoginData = {
  email: "email",
  password: "password",
};

const loginFields = [
  {
    name: fieldInput.email,
    label: "E-mail",
    type: "text",
  },
  {
    name: fieldInput.password,
    label: "Пароль",
    type: "password",
  },
];

export const LoginForm = () => {
  const classes = useStyles();
  const authClasses = authStyles();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state: IRootReducer) => state.loginReducer
  );
  const location = useLocation();
  const activationQuery = new URLSearchParams(location.search);
  const activationParam = activationQuery.get("p") || "";

  useEffect(() => {
    if (activationParam) {
      dispatch(requestEmailConfirm(activationParam));
    }
  }, []);

  const user: ILoginData = {
    email: "",
    password: "",
  };

  const history = useHistory();

  const signUpClick = () => {
    history.push(urls.signUp);
    dispatch(loginResetError());
  };

  const forgetPasswordClick = () => {
    history.push(urls.forget);
    dispatch(loginResetError());
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Meeting Rooms</h1>
      <Formik
        initialValues={user}
        validationSchema={LoginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(requestLogin(values, setSubmitting, history));
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit} className={classes.loginForm}>
            {loginFields.map((item) => (
              <CustomInput
                key={item.name}
                fieldData={item}
                formikProps={props}
              />
            ))}

            <Button
              className={authClasses.authBtn}
              disabled={props.isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Вход
              <If condition={loading}>
                <img src={loaderGif} alt="img" />
              </If>
            </Button>
            <If condition={Boolean(error)}>
              <ErrorDiv error={error} />
            </If>
            <ButtonGroup className={classes.btns}>
              <Button
                className={authClasses.btnsText}
                disabled={props.isSubmitting}
                fullWidth
                type="button"
                variant="text"
                onClick={signUpClick}
              >
                Зарегистрироваться
              </Button>
              <Button
                className={authClasses.btnsText}
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
};
