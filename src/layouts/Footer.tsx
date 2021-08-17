import {
  Box,
  Link,
  makeStyles,
} from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import PhoneIcon from "@material-ui/icons/Phone";
import MapIcon from "@material-ui/icons/Map";
import Instructions from "../assets/Instructions.docx";

const useStyles = makeStyles(() => ({
  footer: {
    zIndex: 1200,
    width: '100%',
    position: "relative",
    bottom: 0,
    display: "flex",
    justifyContent: "space-around",
    fontSize: "16px",
    background: "#f5f5f5",
    borderTop: "2px solid #EBEBEB",
    color: "#505050",
    alignItems: "center",
  },
  companyName: {
    fontSize: "18px",
    fontFamily: "Montserrat",
    padding: 0,
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
        <Box display="flex" gridGap="10px">
          <MapIcon />

          <Link color="inherit" href={Instructions} download='карта сайта'>
            Скачать карту сайта
          </Link>
        </Box>
        <Box>
          Контакты
          <Box display="flex" gridGap="10px">
            <TelegramIcon />
            <Link
              className={classes.links}
              href={"https://t.me/alifHRbot"}
              target="_blank"
            >
              Телеграм бот HR
            </Link>
          </Box>
          <Box display="flex" gridGap="10px">
            <PhoneIcon />
            <Link
              className={classes.links}
              href={"tel:+992488881111"}
              target="_blank"
            >
              +992 488 88 11 11
            </Link>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};
