import { Box } from "@material-ui/core"
import { FC } from "react"


export const ErrorDiv: FC<{ error: null | any  }> = ({ error }) => {
  return (
    <Box
      style={{ margin: '20px', color: 'red', fontSize: '16px' }}
    >
      { error }
    </Box>
  )
}