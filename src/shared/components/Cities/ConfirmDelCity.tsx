import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { cancelCitiesDelete, requestDeleteCity } from '../../../store/actions/cities';
import { CustomDelWarningDialog } from '../CustomDelWarningDialog';

export const ConfirmDelCity = () => {
  const { showAlert } = useSelector((state: IRootReducer) => state.citiesReducer)
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert])

  const handleClose = () => {
    dispatch(cancelCitiesDelete())
  };

  const handleConfirm = () => {
    dispatch(requestDeleteCity(showAlert))
    handleClose();
  };

  return (
    <>
      <CustomDelWarningDialog
        open={open}
        handleClose={handleClose}
        dialogText='Вы уверены, что хотите удалить город?'
        handleConfirm={handleConfirm}
      />
    </>
  );
}
