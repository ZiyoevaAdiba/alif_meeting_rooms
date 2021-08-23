import { History } from "history";
import { Dispatch } from "react";
import {
  getMRsByBuildingId,
  getMRsByCityId,
  getMRsInfo,
} from "../../../store/actions/reservations/meetingRoomsData";

export const getFilteredMRs = (
  date: string,
  cityId: string,
  history: History,
  buildingId: string,
  selectedRooms: string,
  dispatch: Dispatch<any>
) => {
  if (buildingId) {
    return dispatch(
      getMRsByBuildingId(buildingId, history, cityId, selectedRooms, date)
    );
  }

  if (cityId) {
    return dispatch(
      getMRsByCityId(cityId, history, buildingId, selectedRooms, date)
    );
  }

  return dispatch(getMRsInfo(history, selectedRooms, date));
};
