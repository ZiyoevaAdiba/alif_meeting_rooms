import React, { FC, useEffect } from 'react';
import { cancelUserDelete, requestDeleteUser } from '../../../store/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { IUserPageProps } from './AddUser';
import { CustomDelWarningDialog } from '../CustomDelWarningDialog';


export const ConfirmDelUser: FC<IUserPageProps> = ({ page, searchInput, history }) => {
  const { showAlert } = useSelector((state: IRootReducer) => state.usersReducer)
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert])

  const handleClose = () => {
    dispatch(cancelUserDelete());
  };

  const handleConfirm = () => {
    handleClose();
    dispatch(requestDeleteUser(page, searchInput, history, showAlert));
  };
  return (
    <>
      <CustomDelWarningDialog
        open={open}
        handleClose={handleClose}
        dialogText='Вы уверены, что хотите удалить пользователя?'
        handleConfirm={handleConfirm}
      />
    </>
  );
}
