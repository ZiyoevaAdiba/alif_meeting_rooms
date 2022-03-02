import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  withStyles,
} from "@material-ui/core";
import { FormikProps } from "formik";
import { FC, useState } from "react";
import { If } from "./If";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(57 185 127)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(57 185 127)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(57 185 127)",
      },
    },
  },
})(TextField);

interface IFieldData {
  name: string;
  label: string;
  type: string;
}

interface ICustomInput {
  fieldData: IFieldData;
  formikProps: FormikProps<any>;
}

type passwordTypes = "password" | "new_password" | "repeat_new_password";

export const CustomInput: FC<ICustomInput> = ({ fieldData, formikProps }) => {
  const passwordField = fieldData.name;
  const handleClickShowPassword = () => {
    setShowPasswordFields({
      ...showPasswordFields,
      [passwordField]: !showPasswordFields[passwordField as passwordTypes],
    });
  };
  const [showPasswordFields, setShowPasswordFields] = useState({
    password: false,
    new_password: false,
    repeat_new_password: false,
  });

  const fieldDataWithShowPasswordRegulation = () => {
    if (
      fieldData.name === "password" ||
      fieldData.name === "new_password" ||
      fieldData.name === "repeat_new_password"
    ) {
      return showPasswordFields[fieldData.name as passwordTypes]
        ? "text"
        : "password";
    }
    return fieldData.type;
  };

  return (
    <>
      <CssTextField
        style={{ margin: "10px 0px" }}
        name={fieldData.name}
        label={fieldData.label}
        fullWidth
        value={formikProps.values[fieldData.name]}
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        type={fieldDataWithShowPasswordRegulation()}
        InputProps={{
          startAdornment: fieldData.name === "phone" && (
            <InputAdornment position="start">+992</InputAdornment>
          ),
          endAdornment: (fieldData.name === "password" ||
            fieldData.name === "new_password" ||
            fieldData.name === "repeat_new_password") && (
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPasswordFields[fieldData.name] ? (
                <Visibility />
              ) : (
                <VisibilityOff />
              )}
            </IconButton>
          ),
        }}
      />
      <If
        condition={Boolean(
          formikProps.errors[fieldData.name] &&
            formikProps.touched[fieldData.name]
        )}
      >
        <Box color="#f44335" marginTop="0px" fontSize="14px">
          {formikProps.errors[fieldData.name]}
        </Box>
      </If>
    </>
  );
};
