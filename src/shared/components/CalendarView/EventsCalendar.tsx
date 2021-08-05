import FullCalendar, { EventInput } from '@fullcalendar/react';
import { FC, RefObject } from 'react'
import timeGridWeekPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import ruLocale from '@fullcalendar/core/locales/ru';
import { IColors } from './colorGenerator';
import { calendarStyles } from './Styles';
import { addHours } from 'date-fns';
import tippy, { followCursor } from 'tippy.js';
import "tippy.js/dist/tippy.css";
import { getCurrentReservation } from '../../../store/actions/reservations';

interface IEventsCalendar {
  setOpen: (state: boolean) => void,
  setOpenActions: (state: boolean) => void,
  colors: IColors,
  choosenDate: Date,
  calendarComponentRef: RefObject<any>,
  setSelectedStartTime: (state: Date | null) => void,
  setSelectedEndTime: (state: Date | null) => void,
};

export const EventsCalendar: FC<IEventsCalendar> = ({
  setOpen, setOpenActions, colors, choosenDate, calendarComponentRef,
  setSelectedStartTime, setSelectedEndTime,
}) => {

  const classes = calendarStyles();
  const {
    checkedRooms,
    meetingRoomsInfo
  } = useSelector((state: IRootReducer) => state.getMRsDataReducer);
  const dispatch = useDispatch();


  const checkedRoomInfo = meetingRoomsInfo.filter(room => checkedRooms.includes(room.id as string));
  const reservation = checkedRoomInfo.map(room => room.reservations || []);

  const info = reservation?.map((item) => (
    item?.map((item) => (
      {
        id: item.id,
        start: item.start_time,
        end: item.end_time,
        title: item.purpose,
        fullName: `${item.user?.name} ${item.user?.last_name}`,
        tg_account: item.user?.tg_account,
        color: colors[item.meeting_room?.id as string],
        userId: item.user?.id,
        roomId: item.meeting_room?.id
      }
    ))
  )).flat();


  return (
    <div>
      <FullCalendar
        timeZone={'GMT+5'}
        firstDay={1}
        ref={calendarComponentRef}
        allDaySlot={false}
        selectable
        contentHeight='900px'
        plugins={[timeGridWeekPlugin, dayGridPlugin, interactionPlugin]}
        dateClick={
          function (info: any) {
            setSelectedStartTime(info.dateStr);
            setOpen(true)
          }
        }
        select={
          function (info: any) {
            setSelectedStartTime(info.startStr);
            setSelectedEndTime(info.endStr);
            setOpen(true)
          }
        }
        eventMouseEnter={
          (mouseEnterInfo) => {
            const start = addHours(mouseEnterInfo.event.start as Date, -5);
            const zero1 = (start.getMinutes() < 10 ? '0' : '')
            const tjTime1 = `${start.getHours()}:${zero1}${start.getMinutes()}`;

            const end = addHours(mouseEnterInfo.event.end as Date, -5);
            const zero2 = (end.getMinutes() < 10 ? '0' : '')
            const tjTime2 = `${end.getHours()}:${zero2}${end.getMinutes()}`;

            const account = mouseEnterInfo.event.extendedProps.tg_account
            tippy(mouseEnterInfo.el, {
              content: `${tjTime1} - ${tjTime2}
                        ${mouseEnterInfo.event.extendedProps.fullName} 
                        <a aria-expanded href="https://t.me/${account}" style='color:lightblue'>@${account}</a>`,
              interactive: true,
              allowHTML: true,
              appendTo: document.body,
            });
          }
        }

        eventClick={
          function (info) {
            const resInfo = {
              id: info.event.id,
              meeting_room_id: info.event.extendedProps.roomId,
              purpose: info.event.title || '',
              start_time: info.event.startStr,
              end_time: info.event.endStr,
              user_id: info.event.extendedProps.userId
            }
            dispatch(getCurrentReservation(resInfo));
            setOpenActions(true);
          }
        }
        eventOverlap
        locale={ruLocale}
        events={info as EventInput[]}
        handleWindowResize
      />
    </div>
  )

}
