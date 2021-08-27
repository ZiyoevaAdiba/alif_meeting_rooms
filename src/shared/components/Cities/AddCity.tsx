import React, { ChangeEvent, FormEvent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { addCitySuccess, requestAddCity } from "../../../store/actions/cities";
import { CssTextField } from "../CustomInput";
import { buttonStyles } from "../styles/buttonStyles";
import { If } from "../If";

export const AddCity = () => {
  const buttonClasses = buttonStyles();
  const [open, setOpen] = React.useState(false);
  const [cityInput, setCityInput] = React.useState("");
  const dispatch = useDispatch();
  const { addError } = useSelector(
    (state: IRootReducer) => state.citiesReducer
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(addCitySuccess());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestAddCity(cityInput, setOpen));
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={buttonClasses.btnReserve}
      >
        Добавить город
      </Button>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавление Города</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <CssTextField
              name="name"
              fullWidth
              label="Наименование"
              type="text"
              onChange={handleChange}
              required
            />
            <If condition={Boolean(addError)}>
              <ErrorDiv error={addError} />
            </If>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              type="submit"
              className={buttonClasses.btnReserve}
            >
              Добавить
            </Button>
            <Button onClick={handleClose} className={buttonClasses.btnCancel}>
              Отмена
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
