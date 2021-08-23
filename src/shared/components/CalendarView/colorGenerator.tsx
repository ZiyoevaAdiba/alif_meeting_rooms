import randomColor from "randomcolor";
import { IMeetingRoomsInfo } from "../../../store/reducers/reservations/meetingRoomsData/interfaces";

export interface IColors {
  [key: string]: string;
}

export const colorList = (meetingRoomsInfo: IMeetingRoomsInfo[]) => {
  const colors = meetingRoomsInfo.reduce(
    (acc, item) => ({
      ...acc,
      [item.id as string]: randomColor({ luminosity: "dark" }),
    }),
    {}
  ) as IColors;
  return colors;
};
