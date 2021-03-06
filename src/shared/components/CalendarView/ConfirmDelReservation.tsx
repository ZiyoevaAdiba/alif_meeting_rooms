import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import {
  cancelReservationDelete,
  requestDeleteReservation,
} from "../../../store/actions/reservations";
import { useState } from "react";
import { History } from "history";
import { CustomDelWarningDialog } from "../CustomDelWarningDialog";
import { resetChoosenMode } from "../../../store/actions/reservations/setEditOption";

interface IConfirmDelReservation {
  date: string;
  selectedCity: string;
  history: History;
  selectedBuilding: string;
  selectedRooms: string;
  setOpenActions: (state: boolean) => void;
}

export const ConfirmDelReservation: FC<IConfirmDelReservation> = ({
  date,
  selectedCity,
  history,
  selectedBuilding,
  selectedRooms,
  setOpenActions,
}) => {
  const { showAlert, booking } = useSelector(
    (state: IRootReducer) => state.reservationsReducer
  );
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  const handleClose = () => {
    dispatch(cancelReservationDelete());
    setOpenActions(false);
    dispatch(resetChoosenMode());
  };
  const { all } = useSelector((state: IRootReducer) => state.optionReducer);

  const handleConfirm = () => {
    dispatch(
      requestDeleteReservation(
        showAlert,
        booking.repeat_id as string,
        selectedCity,
        history,
        selectedBuilding,
        selectedRooms,
        date,
        all
      )
    );
    handleClose();
    setOpenActions(false);
  };

  return (
    <>
      <CustomDelWarningDialog
        open={open}
        handleClose={handleClose}
        dialogText="Вы уверены, что хотите удалить?"
        handleConfirm={handleConfirm}
      />
    </>
  );
};
