import { makeStyles } from "@material-ui/core";

export const calendarStyles = makeStyles((theme) => ({
  calendarContainer: {
    fontSize: '8px',
  },
  '& .fc-title':{
    fontSize: '8px'
  },
  '& .fc td, .fc th': {
    borderStyle: 'none !important'
  }
}));