import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { CustomInput } from "../CustomInput";
import {
  requestEditBuilding,
  resetBuildingEditing,
} from "../../../store/actions/buildings";
import { BuildingSchema } from "../../validations/BuildingValidation";
import { buttonStyles } from "../styles/buttonStyles";
import { If } from "../If";
import { CustomSelect } from "../CustomSelect";

export const EditBuilding = () => {
  const { building, editBuildingError } = useSelector(
    (state: IRootReducer) => state.buildingsReducer
  );
  const { cities } = useSelector((state: IRootReducer) => state.citiesReducer);

  const [open, setOpen] = useState(true);
  const buttonClasses = buttonStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [building]);

  const handleClose = () => {
    dispatch(resetBuildingEditing());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Изменение данных офиса</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы изменить данные офиса отредактируйте нужные поля.
        </DialogContentText>
        <Formik
          initialValues={building}
          validationSchema={BuildingSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => {
            delete values.city;
            dispatch(requestEditBuilding(values));
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <CustomInput
                fieldData={{
                  name: "name",
                  label: "Имя / адрес офиса",
                  type: "text",
                }}
                formikProps={props}
              />

              <CustomSelect
                itemList={cities}
                formikProps={props}
                fieldName="city_id"
                text="Город"
              />
              <If condition={editBuildingError}>
                <ErrorDiv error={editBuildingError} />
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
