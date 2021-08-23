import {
  Box,
  TextField,
  withStyles,
} from "@material-ui/core";
import { FormikProps } from "formik";
import { FC } from "react";
import { If } from "./If";

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

export const CustomInput: FC<ICustomInput> = ({ fieldData, formikProps }) => {
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
        type={fieldData.type}
      />
      <If
        condition={
          formikProps.errors[fieldData.name] &&
          formikProps.touched[fieldData.name]
        }
      >
        <Box color="#f44335" marginTop="0px" fontSize="14px">
          {formikProps.errors[fieldData.name]}
        </Box>
      </If>
    </>
  );
};
