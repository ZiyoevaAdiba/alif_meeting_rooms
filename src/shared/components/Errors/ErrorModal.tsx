import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IRootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";

export const ErrorModal = () => {
  const { openErrorModal } = useSelector(
    (state: IRootReducer) => state.axiosErrorReducer
  );
  return (
    <div>
      <Dialog
        fullWidth
        open={openErrorModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ошибка сервера"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Упс... Что-то пошло не так.
            Обновите страницу.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
