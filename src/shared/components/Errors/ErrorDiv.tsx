import { Box } from "@material-ui/core";
import { FC } from "react";

export const ErrorDiv: FC<{ error: null | string | undefined}> = ({ error }) => {
  return (
    <Box margin="20px" color="red" fontSize="16px">
      {error}
    </Box>
  );
};
