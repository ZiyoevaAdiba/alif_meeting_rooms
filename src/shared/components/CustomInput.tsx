import { InputLabel, makeStyles, MenuItem, Select, TextField, withStyles } from '@material-ui/core'
import { FormikProps } from 'formik';
import { FC } from 'react';
import { IDepartment } from '../../store/reducers/departments/interfaces';

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgb(57 185 127)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(57 185 127)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(57 185 127)',
      },
    },
  },
})(TextField);

export const greenStyle = makeStyles((theme) => ({
  select: {
    marginBottom: 10,
    "&:after": {
      borderBottomColor: "rgb(57 185 127)",
    },
  }
}));

interface IFieldData {
  name: string,
  label: string,
  type: string,
}

interface ICustomInput {
  fieldData: IFieldData,
  formikProps: FormikProps<any>
}

export const CustomInput: FC<ICustomInput> = ({ fieldData, formikProps }) => {
  return (
    <>
      <CssTextField
        style={{ margin: '10px 0px' }}
        name={fieldData.name}
        label={fieldData.label}
        fullWidth
        value={formikProps.values[fieldData.name]}
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        type={fieldData.type}
      />
      {
        formikProps.errors[fieldData.name]
        &&
        formikProps.touched[fieldData.name]
        &&
        <div style={{ color: '#f44335', marginTop: '0px', fontSize:"14px"}}>
          {formikProps.errors[fieldData.name]}
        </div>
      }
    </>
  )
}

interface ICustomSelect {
  itemList?: IDepartment[] ,
  formikProps: FormikProps<any>,
  fieldName: string,
  text: string,
}

export const CustomSelect: FC<ICustomSelect> = ({ itemList, formikProps, fieldName, text }) => {
  const classes = greenStyle();

  return (
    <>
      <InputLabel
        style={{ marginTop: '15px' }}
        id="select"
      >
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
        {
          itemList?.map(item => {
            return <MenuItem
              key={item.id}
              value={item.id}
            >
              {item.name}
            </MenuItem>
          })
        }
      </Select>
      {
        formikProps.errors[fieldName]
        &&
        formikProps.touched[fieldName]
        &&
        <div style={{ color: '#f44335', marginTop: '0px', fontSize:"14px"}}>
          {formikProps.errors[fieldName]}
        </div>
      }
    </>
  )
}