import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ErrorDiv } from '../ErrorDiv';
import { addEditRoomFields } from './roomFields';
import { CssTextField, CustomInput, CustomSelect } from '../CustomInput';
import { roomMenuItems } from '../../consts/selectConsts';
import { buttonStyles } from '../styles/buttonStyles';


export const EditRoom = () => {
  const { room } = useSelector((state: IRootReducer) => state.roomsReducer)
  const [open, setOpen] = useState(true);
  const buttonClasses = buttonStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!open);
  }, [room]);

  const handleClose = () => {
    dispatch(resetRoomEditing());
    dispatch(cancelImgUpload());
  };

  const {
    imgSrc,
    editError,
    uploadError
  } = useSelector((state: IRootReducer) => state.roomsReducer);
  const { buildings } = useSelector((state: IRootReducer) => state.buildingsReducer);

  const handleImageUpload = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = evt.target as HTMLInputElement;
    const photo: File = (target.files as FileList)[0];
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
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={values => {
            values.photo = imgSrc;

            dispatch(requestEditRoom(values));
          }
          }
        >
          {props => (
            <Form
              onSubmit={props.handleSubmit}
            >
              {
                addEditRoomFields.map(
                  item => <CustomInput
                    key={item.name}
                    fieldData={item}
                    formikProps={props}
                  />
                )
              }
              <CustomSelect
                itemList={buildings}
                formikProps={props}
                fieldName='building_id'
                text="Офис"
              />

              <CustomSelect
                itemList={roomMenuItems}
                formikProps={props}
                fieldName={fieldRoom.status}
                text="Состояние meeting room-a"
              />

              <CssTextField
                name={fieldRoom.photo}
                onChange={(evt) => handleImageUpload(evt)}
                type='file'
                id="contained-button-file"
                style={{ display: 'none', margin: 5 }}
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

              {
                editError
                &&
                <ErrorDiv
                  error={editError}
                />
              }
              {
                uploadError
                &&
                <ErrorDiv
                  error={uploadError}
                />
              }
              <DialogActions>
                <Button
                  type='submit'
                  variant='contained'
                  className={buttonClasses.btnReserve}
                >
                  Сохранить изменения
                </Button>
                <Button
                  onClick={handleClose}
                  className={buttonClasses.btnCancel}
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
