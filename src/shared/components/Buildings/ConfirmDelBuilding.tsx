import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { cancelBuildingDelete, requestDeleteBuilding } from '../../../store/actions/buildings';
import { CustomDelWarningDialog } from '../CustomDelWarningDialog';

export const ConfirmDelBuilding = () => {
  const { showAlert } = useSelector((state: IRootReducer) => state.buildingsReducer)
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert])

  const handleClose = () => {
    dispatch(cancelBuildingDelete());
  };

  const handleConfirm = () => {
    handleClose();
    dispatch(requestDeleteBuilding(showAlert));
  };
  return (
    <>
      <CustomDelWarningDialog
        open={open}
        handleClose={handleClose}
        dialogText='Вы уверены, что хотите удалить Офис?'
        handleConfirm={handleConfirm}
      />
    </>
  );
}
