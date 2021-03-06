import React, { FC, useEffect, useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { ButtonDelete, ButtonEdit } from "../ButtonIcons";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { If } from "../If";
import {
  resetChoosenMode,
  setChoosenMode,
} from "../../../store/actions/reservations/setEditOption";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface IActionsDialogs {
  openActions: boolean;
  setOpenActions: (state: boolean) => void;
  setOpenEdit: (state: boolean) => void;
}

export const ActionsDialogs: FC<IActionsDialogs> = ({
  openActions,
  setOpenActions,
  setOpenEdit,
}) => {
  const { booking } = useSelector(
    (state: IRootReducer) => state.reservationsReducer
  );
  const { userData } = useSelector(
    (state: IRootReducer) => state.getUserDataReducer
  );

  const handleClose = () => {
    setOpenActions(false);
    dispatch(resetChoosenMode());
  };
  
  const dispatch = useDispatch();
  const { all } = useSelector((state: IRootReducer) => state.optionReducer);

  const DialogMessage = (
    <DialogContent dividers>
      <Typography gutterBottom>
        Вы можете редактировать либо удалять только свои брони. Чтобы получить
        информацию о владельце брони, наведите курсор на бронь.
      </Typography>
    </DialogContent>
  );

  useEffect(() => {
    dispatch(resetChoosenMode());
  }, []);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openActions}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Бронь миттинг рума
        </DialogTitle>

        <If
          condition={userData.id === booking.user_id}
          anotherChildren={DialogMessage}
        >
          <>
            <DialogContent dividers>
              <Typography gutterBottom>
                Вы можете отредактировать либо удалить свою бронь. Если
                выбранная бронь имеет повторящиеся дни и вы хотите
                отредактировать либо удалить все, выберите опцию "Для всех
                броней с повторениями", иначе изменения будут применены только
                для текущей брони.
              </Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="Для всех броней с повторениями"
                onClick={() => [
                  all
                    ? dispatch(resetChoosenMode())
                    : dispatch(setChoosenMode()),
                ]}
                checked={all}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => [handleClose(), setOpenEdit(true)]}>
                <ButtonEdit row={booking} btnLocation={"reservations"} />
              </Button>
              <ButtonDelete
                id={booking.id as string}
                btnLocation={"reservations"}
              />
            </DialogActions>
          </>
        </If>
      </Dialog>
    </div>
  );
};
