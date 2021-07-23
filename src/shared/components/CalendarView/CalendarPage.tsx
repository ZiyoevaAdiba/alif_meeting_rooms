import FullCalendar from '@fullcalendar/react'
import timeGridWeekPlugin from '@fullcalendar/timegrid'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';
import { calendarStyles } from './Styles';
import { Grid } from '@material-ui/core';

export const CalendarPage = () => {
  const classes = calendarStyles()
  const [value, onChange] = useState(new Date());

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Calendar
          onChange={onChange}
          value={value}
          className=''
        />
      </Grid>
      <Grid item xs={9}>

      <FullCalendar
        plugins={[timeGridWeekPlugin]}
      />
      </Grid>
    </Grid>
  )
}
