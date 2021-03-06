import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fieldRoom, room } from "./MeetingRooms";
import {
  addMRPhoto,
  resetRoomErrors,
  cancelImgUpload,
  requestAddRoom,
} from "../../../store/actions/rooms";
import { RoomSchema } from "../../validations/RoomValidation";
import { IRootReducer } from "../../../store/reducers";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ErrorDiv } from "../Errors/ErrorDiv";
import { CssTextField, CustomInput } from "../CustomInput";
import { addEditRoomFields } from "./roomFields";
import { getAllBuildings } from "../../../store/actions/buildings";
import { ChangeEvent } from "react";
import { roomMenuItems } from "../../consts/selectConsts";
import { buttonStyles } from "../styles/buttonStyles";
import { If } from "../If";
import { CustomSelect } from "../CustomSelect";

export const AddRoom = () => {
  const [open, setOpen] = React.useState(false);
  const buttonClasses = buttonStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(cancelImgUpload());
    dispatch(resetRoomErrors());
  };

  const { imgSrc, addError, loading } = useSelector(
    (state: IRootReducer) => state.roomsReducer
  );
  const { buildings } = useSelector(
    (state: IRootReducer) => state.buildingsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBuildings());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = evt.target as HTMLInputElement;
    const photo: File = (target.files as FileList)[0];
    const fd = new FormData();
    fd.append("image", photo);
    dispatch(addMRPhoto(fd));
  };

  return (
    <Box>
      <Button
        variant="contained"
        className={buttonClasses.btnReserve}
        onClick={handleClickOpen}
      >
        ???????????????? meeting room
      </Button>

      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          ???????????????????? meeting room-??
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ?????????? ???????????????? meeting room ?????????????????? ??????????.
          </DialogContentText>
          <Formik
            initialValues={room}
            validationSchema={RoomSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => {
              values.photo = imgSrc;
              values.status = values.status === "true" ? true : false;
              dispatch(requestAddRoom(values, setOpen));
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                {addEditRoomFields.map((item) => (
                  <CustomInput
                    key={item.name}
                    fieldData={item}
                    formikProps={props}
                  />
                ))}
                <CustomSelect
                  itemList={buildings}
                  formikProps={props}
                  fieldName="building_id"
                  text="?????????????? ????????"
                />

                <CustomSelect
                  itemList={roomMenuItems}
                  formikProps={props}
                  fieldName={fieldRoom.status}
                  text="?????????????????? meeting room-a"
                />

                <CssTextField
                  name={fieldRoom.photo}
                  onChange={(evt) => handleImageUpload(evt)}
                  type="file"
                  id="contained-button-file"
                  style={{ display: "none" }}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginTop: "30px", marginBottom: "20px" }}
                  >
                    ??????????????????
                  </Button>
                </label>
                <img
                  src={imgSrc}
                  alt={imgSrc ? "photo" : ""}
                  width="250px"
                  height="auto"
                />
                <If condition={Boolean(addError)}>
                  <ErrorDiv error={addError} />
                </If>

                <DialogActions>
                  <Button
                    type="submit"
                    variant="contained"
                    className={buttonClasses.btnReserve}
                    disabled={loading}
                  >
                    ????????????????
                  </Button>
                  <Button
                    onClick={handleClose}
                    disabled={loading}
                    className={buttonClasses.btnCancel}
                  >
                    ????????????
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
