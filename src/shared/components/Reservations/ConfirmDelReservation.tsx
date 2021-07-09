import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { cancelReservationDelete, requestDeleteReservation } from '../../../store/actions/reservations';
import { useState } from 'react';
import { CustomDelWarningDialog } from '../CustomDelWarningDialog';

export const ConfirmDelReservation: FC<{mrID?: string}> = ({mrID}) => {
  const { showAlert } = useSelector((state: IRootReducer) => state.reservationsReducer)
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  const handleClose = () => {
    dispatch(cancelReservationDelete());
  };

  const handleConfirm = () => {
    dispatch(requestDeleteReservation(showAlert, mrID));
    handleClose();
  };

  return (
    <>
    <CustomDelWarningDialog
        open={open}
        handleClose={handleClose}
        dialogText='Вы уверены, что хотите удалить бронь?'
        handleConfirm={handleConfirm}
      />
    </>
  );
}
