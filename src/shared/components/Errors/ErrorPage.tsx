import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export const ErrorPage = () => (
  <Box display="flex" alignItems="center" flexDirection="column"
  >
    <h2>Страница не существует. </h2>
    <Button component={Link} to='/auth/login'>Перейти на страницу  Логина?</Button>
  </Box>
);
