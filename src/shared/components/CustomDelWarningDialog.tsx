import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { FC } from 'react'
import { ErrorDiv } from './ErrorDiv'

interface ICustomDelWarningDialog {
  open: boolean,
  handleClose: () => void,
  dialogText: string,
  handleConfirm: () => void,
  deleteError?: null | any,
}
export const CustomDelWarningDialog: FC<ICustomDelWarningDialog> = ({open, handleClose, dialogText, handleConfirm, deleteError}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Предупреждение
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        {
          deleteError
          &&          
          <ErrorDiv
            error={deleteError}
          />
        }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Подтвердить
          </Button>
          <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

