import { TextField } from '@material-ui/core'

export const CustomInput = ({ fieldData, formikProps }: any) => {
  return (
    <TextField
      style={{marginBottom: 10}}
      name={fieldData.name}
      label={fieldData.label}
      fullWidth
      error={Boolean(formikProps.touched[fieldData.name] && formikProps.errors[fieldData.name])}
      helperText={formikProps.touched[fieldData.name] && formikProps.errors[fieldData.name]}
      value={formikProps.values[fieldData.name]}
      onChange={formikProps.handleChange}
      onBlur={formikProps.handleBlur}
      type={fieldData.type}
    />
  )
}
