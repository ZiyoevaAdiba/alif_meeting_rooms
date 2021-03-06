import FullCalendar, { EventInput } from "@fullcalendar/react";
import { FC, RefObject } from "react";
import timeGridWeekPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";
import ruLocale from "@fullcalendar/core/locales/ru";
import { IColors } from "./colorGenerator";
import { addHours, subWeeks } from "date-fns";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { getCurrentReservation } from "../../../store/actions/reservations";
import { If } from "../If";
import { LoadingScreen } from "../LoadingScreen";

interface IEventsCalendar {
  setOpen: (state: boolean) => void;
  setOpenActions: (state: boolean) => void;
  colors: IColors;
  choosenDate: Date;
  calendarComponentRef: RefObject<any>;
  setSelectedStartTime: (state: Date | null) => void;
  setSelectedEndTime: (state: Date | null) => void;
  dateParam: string;
  selectedCity: string;
  selectedBuilding: string;
  roomsParam: string;
  gotoWeek: (value: Date) => void;
}

export const EventsCalendar: FC<IEventsCalendar> = ({
  setOpen,
  setOpenActions,
  colors,
  choosenDate,
  calendarComponentRef,
  setSelectedStartTime,
  setSelectedEndTime,
  dateParam,
  gotoWeek,
}) => {
  const { checkedRooms, meetingRoomsInfo, loading } = useSelector(
    (state: IRootReducer) => state.getMRsDataReducer
  );
  const dispatch = useDispatch();

  const checkedRoomInfo = meetingRoomsInfo?.filter((room) =>
    checkedRooms.includes(room.id as string)
  );
  const reservation = checkedRoomInfo?.map((room) => room.reservations || []);

  const info = reservation
    ?.map((item) =>
      item?.map((item) => ({
        id: item.id,
        start: item.start_time,
        end: item.end_time,
        title: item.purpose,
        fullName: `${item.user?.name} ${item.user?.last_name}`,
        tg_account: item.user?.tg_account,
        color: colors[item.meeting_room?.id as string],
        userId: item.user?.id,
        roomId: item.meeting_room?.id,
        repeatDays: item.repeat_days,
        repeatId: item.repeat_id,
      }))
    )
    .flat();

  return (
    <div>
      <If condition={!loading} anotherChildren={<LoadingScreen />}>
        <FullCalendar
          initialDate={choosenDate}
          timeZone={"GMT+5"}
          firstDay={1}
          slotMinTime={"08:00:00"}
          slotMaxTime={"21:00:00"}
          ref={calendarComponentRef}
          allDaySlot={false}
          selectable
          height={"auto"}
          plugins={[timeGridWeekPlugin, dayGridPlugin, interactionPlugin]}
          dateClick={function (info: any) {
            setSelectedStartTime(info.dateStr);
            setOpen(true);
          }}
          select={function (info: any) {
            setSelectedStartTime(info.startStr);
            setSelectedEndTime(info.endStr);
            setOpen(true);
          }}
          eventMouseEnter={(mouseEnterInfo) => {
            const start = addHours(mouseEnterInfo.event.start as Date, -5);
            const zero1 = start.getMinutes() < 10 ? "0" : "";
            const tjTime1 = `${start.getHours()}:${zero1}${start.getMinutes()}`;

            const end = addHours(mouseEnterInfo.event.end as Date, -5);
            const zero2 = end.getMinutes() < 10 ? "0" : "";
            const tjTime2 = `${end.getHours()}:${zero2}${end.getMinutes()}`;

            const account = mouseEnterInfo.event.extendedProps.tg_account;
            tippy(mouseEnterInfo.el, {
              content: `${tjTime1} - ${tjTime2}
                        ${mouseEnterInfo.event.extendedProps.fullName} 
                        <a href="https://t.me/${account}" target="_blank" style='color:lightblue'>@${account}</a>`,
              interactive: true,
              allowHTML: true,
              appendTo: document.body,
            });
          }}
          eventClick={function (info) {
            const resInfo = {
              id: info.event.id,
              meeting_room_id: info.event.extendedProps.roomId,
              purpose: info.event.title || "",
              start_time: info.event.startStr,
              end_time: info.event.endStr,
              user_id: info.event.extendedProps.userId,
              repeat_days: info.event.extendedProps.repeatDays,
              repeat_id: info.event.extendedProps.repeatId,
            };
            dispatch(getCurrentReservation(resInfo));
            setOpenActions(true);
          }}
          eventOverlap
          locale={ruLocale}
          events={info as EventInput[]}
          headerToolbar={{
            start: "title",
            center: "",
            end: "today prev,next",
          }}
          customButtons={{
            prev: {
              click: function () {
                const prevWeekDate = subWeeks(new Date(dateParam), 1);
                gotoWeek(prevWeekDate);
              },
            },
            next: {
              click: function () {
                const nextWeekDate = subWeeks(new Date(dateParam), -1);
                gotoWeek(nextWeekDate);
              },
            },
            today: {
              text: "??????????????",
              click: function () {
                gotoWeek(new Date());
              },
            },
          }}
          handleWindowResize
        />
      </If>
    </div>
  );
};
