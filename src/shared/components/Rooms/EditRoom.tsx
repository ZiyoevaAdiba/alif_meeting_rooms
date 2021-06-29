import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fieldRoom } from './MeetingRooms';
import { addMRPhoto, cancelImgUpload, requestEditRoom, resetRoomEditing } from '../../../store/actions/rooms';
import { IRootReducer } from '../../../store/reducers';
import { RoomSchema } from '../../validations/RoomValidation';
import { useStyles } from '../Reservations/Form';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ErrorDiv } from '../ErrorDiv';
import { addEditRoomFields } from './roomFields';
import { CustomInput } from '../CustomInput';


export const EditRoom = () => {
  const { room } = useSelector((state: IRootReducer) => state.roomsReducer)
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [room]);

  const handleClose = () => {
    dispatch(resetRoomEditing());
    dispatch(cancelImgUpload());
  };

  const { imgSrc, editError } = useSelector((state: IRootReducer) => state.roomsReducer)

  const handleImageUpload = (evt: any) => {
    const photo = evt.target.files[0];
    const fd = new FormData();
    fd.append('image', photo);
    dispatch(addMRPhoto(fd));
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Изменение Meeting Room-а</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы изменить Meeting Room отредактируйте нужные поля.
        </DialogContentText>
        <Formik
          initialValues={room}
          validationSchema={RoomSchema}
          onSubmit={(values) => {
            values.photo = imgSrc;
            dispatch(requestEditRoom(values));
          }
          }
        >
          {props => (
            <Form
              onSubmit={props.handleSubmit}
              className={classes.signUpForm}
            >
              {
                addEditRoomFields.map(
                  item => <CustomInput
                    className={classes.inputGap}
                    key={item.name}
                    fieldData={item}
                    formikProps={props}
                  />
                )
              }
              <TextField
                className={classes.inputGap}
                name={fieldRoom.photo}
                onChange={(evt) => handleImageUpload(evt)}
                type='file'
                id="contained-button-file"
                style={{ display: 'none' }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  style={{ marginTop: '30px', marginBottom: '20px' }}
                >
                  Загрузить
                </Button>
              </label>
              <img
                src={
                  imgSrc
                    ? imgSrc
                    : props.values?.photo
                }
                alt={
                  fieldRoom.photo
                    ? "photo"
                    : ""
                }
                width='250px'
                height='auto'
              />
              <InputLabel
                className={classes.inputGap}
                style={{ marginTop: '20px' }}
                id="demo-simple-select-label"
              >
                Состояние meeting room-a
              </InputLabel>
              <Select
                id="demo-simple-select"
                value={props.values?.status}
                onChange={props.handleChange}
                name={fieldRoom.status}
                fullWidth
              >
                <MenuItem value={'true'}>Доступен</MenuItem>
                <MenuItem value={'false'}>Недоступен</MenuItem>
              </Select>
              {
                editError
                &&
                <ErrorDiv
                  error={editError}
                />
              }
              <DialogActions>
                <Button
                  type='submit'
                  variant='contained'
                  className={classes.btnReserve}
                >
                  Сохранить изменения
                </Button>
                <Button
                  onClick={handleClose}
                  className={classes.btnCancel}
                >
                  отмена
                </Button>
              </DialogActions>

            </Form>
          )}
        </Formik>
      </DialogContent>

    </Dialog>
  );
}
