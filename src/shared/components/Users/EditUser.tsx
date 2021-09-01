import { FC, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import {
  editUserReqSuccess,
  requestEditUser,
  resetUserEditing,
} from "../../../store/actions/users";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { fieldInput, userDataFields } from "../../consts/userConsts";
import { CustomInput } from "../CustomInput";
import { IUserPageProps } from "./AddUser";
import { EditUserValidation } from "../../validations/UsersValidation";
import { userMenuItems } from "../../consts/selectConsts";
import { buttonStyles } from "../styles/buttonStyles";
import { If } from "../If";
import { CustomSelect } from "../CustomSelect";

export const EditUser: FC<IUserPageProps> = ({
  page,
  history,
  searchInput,
}) => {
  const { user, userError } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );
  const { departments } = useSelector(
    (state: IRootReducer) => state.departmentsReducer
  );

  const [open, setOpen] = useState(true);
  const buttonClasses = buttonStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [user]);

  const handleClose = () => {
    dispatch(resetUserEditing());
    dispatch(editUserReqSuccess());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="form-dialog-title">
        Изменение данных пользователя
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы изменить данные пользователя отредактируйте нужные поля.
        </DialogContentText>
        <Formik
          initialValues={user}
          validationSchema={EditUserValidation}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => {
            delete values.department;
            dispatch(requestEditUser(page, searchInput, history, values));
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
                text="Отдел"
              />

              <CustomSelect
                itemList={userMenuItems}
                formikProps={props}
                fieldName={fieldInput.role}
                text="Назначить роль"
              />

              <If condition={Boolean(userError)}>
                <ErrorDiv error={userError} />
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
      </DialogContent>
    </Dialog>
  );
};
