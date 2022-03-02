import {
  Box,
  Link,
  makeStyles,
} from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";

const useStyles = makeStyles(() => ({
  footer: {
    zIndex: 1200,
    width: '100%',
    position: "relative",
    bottom: 0,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    background: "#f5f5f5",
    borderTop: "2px solid #EBEBEB",
    color: "#505050",
    alignItems: "center",
  },
  companyName: {
    fontSize: "18px",
    fontFamily: "Montserrat",
    padding: "10px 50px",
    color: "black",
  },
  links: {
    color: "#73787d",
    fontSize: "15px",
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Box className={classes.footer}>
        <Box className={classes.companyName}>{" © alif tech "}</Box>
        <Box display="flex" padding="10px 50px">
            <TelegramIcon />
            <Link
              className={classes.links}
              href={"https://t.me/alifHRbot"}
              target="_blank"
            >
              Телеграм бот HR
            </Link>
        </Box>
      </Box>
    </footer>
  );
};
