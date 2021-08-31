import { FC, useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../store/reducers";
import { ErrorDiv } from "./Errors/ErrorDiv";
import {
  fieldInput,
  passwordFields,
  userDataFields,
} from "../consts/userConsts";
import { CustomInput } from "./CustomInput";
import { buttonStyles } from "./styles/buttonStyles";
import { getDepartments } from "../../store/actions/departments";
import { LoadingScreen } from "./LoadingScreen";
import { UserProfileValidation } from "../validations/ProfileValidation";
import { requestEditProfile } from "../../store/actions/reservations/userData";
import { useHistory } from "react-router-dom";
import { urls } from "../../routes/urls";
import { getToken } from "../../store/actions/login";
import { CustomSelect } from "./CustomSelect";
import { If } from "./If";

export const UserProfile: FC = () => {
  const { userData, editError } = useSelector(
    (state: IRootReducer) => state.getUserDataReducer
  );

  const { departments, loading } = useSelector(
    (state: IRootReducer) => state.departmentsReducer
  );
  const history = useHistory();
  const token: string = getToken();

  const buttonClasses = buttonStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [userData]);

  const handleClose = () => {
    history.push(urls.reservations);
  };

  const profileData = {
    ...userData,
    department_id: userData.department?.id,
    password: "",
    new_password: "",
    repeat_new_password: "",
  };

  return (
    <Formik
      initialValues={profileData}
      enableReinitialize
      validationSchema={UserProfileValidation}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values) => {
        dispatch(requestEditProfile(values, history, token));
      }}
    >
      {(props) => (
        <Form
          onSubmit={props.handleSubmit}
          style={{ margin: "30px auto", width: "max-content" }}
        >
          {userDataFields.map((item) => (
            <CustomInput key={item.name} fieldData={item} formikProps={props} />
          ))}
          <CustomSelect
            itemList={departments}
            formikProps={props}
            fieldName={fieldInput.department_id}
            text="Отдел"
          />
          {passwordFields.map((item) => (
            <CustomInput key={item.name} fieldData={item} formikProps={props} />
          ))}
          <If condition={Boolean(editError)}>
            <ErrorDiv error={editError} />
          </If>

          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              className={buttonClasses.btnReserve}
            >
              Сохранить изменения
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              className={buttonClasses.btnCancel}
            >
              Отмена
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};
