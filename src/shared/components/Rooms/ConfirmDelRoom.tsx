import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { cancelRoomDelete, requestDeleteRoom } from '../../../store/actions/rooms';
import { CustomDelWarningDialog } from '../CustomDelWarningDialog';

export const ConfirmDelRoom = () => {
  const { showAlert } = useSelector((state: IRootReducer) => state.usersReducer)
  const { deleteError } = useSelector((state: IRootReducer) => state.roomsReducer)

  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [showAlert])

  const handleClose = () => {
    dispatch(cancelRoomDelete())
  };

  const handleConfirm = () => {
    dispatch(requestDeleteRoom(showAlert))
  };

  return (
    <>
      <CustomDelWarningDialog
        open={open}
        handleClose={handleClose}
        dialogText='Вы уверены, что хотите удалить meeting room?'
        handleConfirm={handleConfirm}
        deleteError={deleteError}
      />
    </>
  );
}
