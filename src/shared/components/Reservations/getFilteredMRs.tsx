import { History } from "history";
import { Dispatch } from "react";
import {
  getMRsByBuildingId,
  getMRsByCityId,
  getMRsInfo
} from "../../../store/actions/reservations/meetingRoomsData";


export const getFilteredMRs = (cityId: string, history: History, buildingId: string, dispatch: Dispatch<any>) => {
  if (buildingId) {
    return dispatch(getMRsByBuildingId(buildingId, history, cityId))
  }

  if (cityId) {
    return dispatch(getMRsByCityId(cityId, history, buildingId));
  }

  return dispatch(getMRsInfo(history));
};