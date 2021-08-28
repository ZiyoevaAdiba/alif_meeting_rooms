import { FC, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik } from "formik";
import { requestAddUser } from "../../../store/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { IRootReducer } from "../../../store/reducers";
import { getDepartments } from "../../../store/actions/departments";
import { fieldInput, user, userDataFields } from "../../consts/userConsts";
import { CustomInput } from "../CustomInput";
import { History } from "history";
import { AddUserValidation } from "../../validations/UsersValidation";
import { userMenuItems } from "../../consts/selectConsts";
import { buttonStyles } from "../styles/buttonStyles";
import { If } from "../If";
import { CustomSelect } from "../CustomSelect";

export interface IUserPageProps {
  page: number;
  searchInput: string;
  history: History;
}

export const AddUser: FC<IUserPageProps> = ({ page, searchInput, history }) => {
  const [open, setOpen] = useState(false);
  const buttonClasses = buttonStyles();

  const { error } = useSelector((state: IRootReducer) => state.signUpReducer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { departments } = useSelector(
    (state: IRootReducer) => state.departmentsReducer
  );

  const dispatch = useDispatch();

  return (
    <Box>
      <Button
        variant="contained"
        className={buttonClasses.btnReserve}
        onClick={handleClickOpen}
      >
        Добавить пользователя
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="form-dialog-title">
          Добавление пользователя
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы добавить пользователя заполните форму.
          </DialogContentText>
          <Formik
            initialValues={user}
            validationSchema={AddUserValidation}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting }) => {
              // same shape as initial values
              dispatch(
                requestAddUser(
                  page,
                  searchInput,
                  history,
                  values,
                  setSubmitting,
                  setOpen
                )
              );
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

                <CustomInput
                  fieldData={{
                    name: fieldInput.password,
                    label: "Пароль",
                    type: "password",
                  }}
                  formikProps={props}
                />

                <If condition={Boolean(error)}>
                  <ErrorDiv error={error} />
                </If>
                <DialogActions>
                  <Button
                    type="submit"
                    variant="contained"
                    className={buttonClasses.btnReserve}
                  >
                    Добавить
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
    </Box>
  );
};
