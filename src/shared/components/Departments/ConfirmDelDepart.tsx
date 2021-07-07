import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { cancelDepartmentsDelete, requestDeleteDepartment } from '../../../store/actions/departments';
import { CustomDelWarningDialog } from '../CustomDelWarningDialog';

export const ConfirmDelDepart = () => {
  const { showAlert } = useSelector((state: IRootReducer) => state.departmentsReducer)
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert])

  const handleClose = () => {
    dispatch(cancelDepartmentsDelete())
  };

  const handleConfirm = () => {
    dispatch(requestDeleteDepartment(showAlert))
    handleClose();
    // handleClose();
  };

  return (
    <>
      <CustomDelWarningDialog
        open={open}
        handleClose={handleClose}
        dialogText='Вы уверены, что вы хотите удалить Отдел? Этот отдел может иметь сотрудников'
        handleConfirm={handleConfirm}
      />
    </>
  );
}
