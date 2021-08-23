import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  requestRegistration,
  signUpResetError,
} from "../../../store/actions/signUp";
import { IRootReducer } from "../../../store/reducers";
import loaderGif from "../../../assets/images/loading-icon.jpeg";
import { useHistory } from "react-router";
import { urls } from "../../../routes/urls";
import { SignupSchema } from "../../validations/SignUpValidation";
import { getDepartments } from "../../../store/actions/departments";
import { useEffect } from "react";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { Page } from "../../../layouts/Page";
import { CustomInput } from "../CustomInput";
import { fieldInput, user, userDataFields } from "../../consts/userConsts";
import { authStyles } from "./authStyles";
import { If } from "../If";
import { CustomSelect } from "../CustomSelect";

export const SignUpForm = () => {
  const authClasses = authStyles();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state: IRootReducer) => state.signUpReducer
  );

  useEffect(() => {
    dispatch(getDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { departments } = useSelector(
    (state: IRootReducer) => state.departmentsReducer
  );

  const history = useHistory();

  const loginClick = () => {
    history.push(urls.login);
    dispatch(signUpResetError());
  };

  return (
    <Page title="Регистрация">
      <h1 style={{ textAlign: "center" }}>Регистрация</h1>
      <Formik
        initialValues={user}
        validationSchema={SignupSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(requestRegistration(values, history, setSubmitting));
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            {userDataFields.map((item) => (
              <CustomInput
                key={item.name}
                fieldData={item}
                formikProps={props}
              />
            ))}
            <CustomSelect
              itemList={departments}
              formikProps={props}
              fieldName={fieldInput.department_id}
              text="Выбрать отдел"
            />
            <CustomInput
              fieldData={{
                name: fieldInput.password,
                label: "Пароль",
                type: "password",
              }}
              formikProps={props}
            />

            <Button
              className={authClasses.authBtn}
              disabled={props.isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Зарегистрироваться
              <If condition={loading}>
                <img src={loaderGif} alt="" />{" "}
              </If>
            </Button>
            <If condition={error}>
              <ErrorDiv error={error} />
            </If>
            <Button
              className={authClasses.btnsText}
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
    </Page>
  );
};
