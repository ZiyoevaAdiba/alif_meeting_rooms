import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
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
import { fieldRoom, room } from './MeetingRooms';
import { addMRPhoto, resetRoomErrors, cancelImgUpload, requestAddRoom } from '../../../store/actions/rooms';
import { RoomSchema } from '../../validations/RoomValidation';
import { useStyles } from '../Reservations/Form';
import { IRootReducer } from '../../../store/reducers';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ErrorDiv } from '../ErrorDiv';
import { CustomInput } from '../CustomInput';
import { addEditRoomFields } from './roomFields';
import { getAllBuildings } from '../../../store/actions/buildings';


export const AddRoom = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(cancelImgUpload());
    dispatch(resetRoomErrors());
  };

  const {
    imgSrc,
    addError
  } = useSelector((state: IRootReducer) => state.roomsReducer);
  const { buildings } = useSelector((state: IRootReducer) => state.buildingsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBuildings());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = (evt: any) => {
    const photo = evt.target.files[0];
    const fd = new FormData();
    fd.append('image', photo);
    dispatch(addMRPhoto(fd));
  }

  return (
    <Box>
      <Button
        variant="contained"
        className={classes.btnReserve}
        onClick={handleClickOpen}
      >
        Добавить Meeting Room
      </Button>

      <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление Meeting Room-а</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы добавить Meeting Room заполните форму.
          </DialogContentText>
          <Formik
            initialValues={room}
            validationSchema={RoomSchema}
            onSubmit={(values, { setSubmitting }) => {
              values.photo = imgSrc
              values.status = (values.status === 'true')
                ? true
                : false;
              delete values.status;
              dispatch(requestAddRoom(values, setSubmitting, setOpen));
            }}
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
                <InputLabel
                  className={classes.signUpForm}
                  style={{ marginTop: '10px' }}
                  id="demo-simple-select"
                  error={Boolean(props.touched.building_id && props.errors.building_id)}
                  onBlur={props.handleBlur}
                >Выбрать офис
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={props.values.building_id}
                  onChange={props.handleChange}
                  name='building_id'
                  fullWidth
                >
                  {
                    buildings.map(
                      (item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        )
                      }
                    )
                  }
                </Select>

                <InputLabel
                  className={classes.inputGap}
                  style={{ marginTop: '20px' }}
                  id="demo-simple-select-label"
                >Состояние meeting room-a
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={props.values.status}
                  onChange={props.handleChange}
                  name={fieldRoom.status}
                  fullWidth
                >
                  <MenuItem value={'true'}>Доступен</MenuItem>
                  <MenuItem value={'false'}>Недоступен</MenuItem>
                </Select>
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
                  src={imgSrc}
                  alt={
                    imgSrc
                      ? "photo"
                      : ""
                  }
                  width='250px'
                  height='auto'
                />
                {
                  addError
                  &&
                  <ErrorDiv
                    error={addError}
                  />
                }
                <DialogActions>
                  <Button
                    type='submit'
                    variant='contained'
                    className={classes.btnReserve}
                  >
                    Добавить
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
    </Box>
  );
}