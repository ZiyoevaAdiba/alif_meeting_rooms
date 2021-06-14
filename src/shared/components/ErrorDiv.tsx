import { Box } from "@material-ui/core"


export const ErrorDiv = ({ error }: any) => {
  return (
    <Box
      style={{ marginTop: '20px', color: 'red' }}
    >{error}
    </Box>
  )
}