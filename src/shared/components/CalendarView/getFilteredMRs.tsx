import { History } from "history";
import { Dispatch } from "react";
import {
  getMRsByBuildingId,
  getMRsByCityId,
  getMRsInfo
} from "../../../store/actions/reservations/meetingRoomsData";

export const getFilteredMRs = (cityId: string, history: History, buildingId: string, selectedRooms: string, dispatch: Dispatch<any>) => {
  if (buildingId) {
    return dispatch(getMRsByBuildingId(buildingId, history, cityId, selectedRooms));
  };

  if (cityId) {
    return dispatch(getMRsByCityId(cityId, history, buildingId, selectedRooms));
  };

  return dispatch(getMRsInfo(history, selectedRooms));
};