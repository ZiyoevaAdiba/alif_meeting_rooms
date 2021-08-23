import { Box, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import { FormikProps } from "formik";
import { FC } from "react";
import { IDepartment } from "../../store/reducers/departments/interfaces";
import { If } from "./If";

interface ICustomSelect {
  itemList?: IDepartment[];
  formikProps: FormikProps<any>;
  fieldName: string;
  text: string;
}

export const greenStyle = makeStyles((theme) => ({
  select: {
    marginBottom: 10,
    "&:after": {
      borderBottomColor: "rgb(57 185 127)",
    },
  },
}));

export const CustomSelect: FC<ICustomSelect> = ({
  itemList,
  formikProps,
  fieldName,
  text,
}) => {
  const classes = greenStyle();

  return (
    <Box width="100%">
      <InputLabel style={{ marginTop: "15px" }} id="select">
        {text}
      </InputLabel>
      <Select
        className={classes.select}
        id="select"
        value={formikProps.values[fieldName]}
        onChange={formikProps.handleChange}
        name={fieldName}
        fullWidth
      >
        {itemList?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>

      <If
        condition={
          formikProps.errors[fieldName] && formikProps.touched[fieldName]
        }
      >
        <Box color="#f44335" marginTop="0px" fontSize="14px">
          {formikProps.errors[fieldName]}
        </Box>
      </If>
    </Box>
  );
};
