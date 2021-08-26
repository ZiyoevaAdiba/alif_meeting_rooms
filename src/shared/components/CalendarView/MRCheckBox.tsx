import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  withStyles,
} from "@material-ui/core";
import { History } from "history";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urls } from "../../../routes/urls";
import { getCheckedMRs } from "../../../store/actions/reservations/meetingRoomsData";
import { IRootReducer } from "../../../store/reducers";
import { If } from "../If";
import { IColors } from "./colorGenerator";

export const GreenCheckbox = withStyles({
  root: {
    color: "rgb(57 185 127)",
    borderRadius: "50",
    "&$checked": {
      color: "rgb(57 185 127)",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface IMRCheckBox {
  history: History;
  colors: IColors;
  selectedCity: string;
  selectedBuilding: string;
  urlRooms: string;
  date: string;
}

export const MRCheckBox: FC<IMRCheckBox> = ({
  history,
  colors,
  selectedCity,
  selectedBuilding,
  urlRooms,
  date,
}) => {
  const { meetingRoomsInfo } = useSelector(
    (state: IRootReducer) => state.getMRsDataReducer
  );
  const dispatch = useDispatch();
  const urlParam = urlRooms === "" ? [] : urlRooms.split(",");
  const [selectedRooms, setSelectedRooms] = useState<string[]>(urlParam);

  interface ICheckBoxItems {
    [key: string]: boolean;
  }

  const [checked, setChecked] = useState<ICheckBoxItems>({});

  const mrChecked = (mrId: string) => {
    setChecked({ ...checked, [mrId]: !checked[mrId] });
    let rooms = [];
    if (checked[mrId] === false) {
      rooms = [...selectedRooms, mrId];
      setSelectedRooms(rooms);
    } else {
      rooms = selectedRooms.filter((room) => room !== mrId);
      setSelectedRooms(rooms);
    }
    history.push(
      `${
        urls.reservations
      }?date=${date}&city=${selectedCity}&building=${selectedBuilding}&rooms=${rooms.toString()}`
    );
  };

  useEffect(() => {
    dispatch(getCheckedMRs(selectedRooms));
  }, [meetingRoomsInfo, selectedRooms]);

  useEffect(() => {
    !meetingRoomsInfo
      ? setChecked({})
      : setChecked(
          meetingRoomsInfo?.reduce(
            (o, key) => ({
              ...o,
              [key.id as string]: selectedRooms.includes(key.id as string),
            }),
            {}
          ) as ICheckBoxItems
        );
  }, [meetingRoomsInfo, selectedRooms]);

  return (
    <>
      <FormGroup>
        Миттинг румы
        <hr />
        <If
          condition={Boolean(meetingRoomsInfo)}
          anotherChildren={"На данный момент нет доступных миттинг румов."}
        >
          {meetingRoomsInfo?.map((item) => (
            <FormControlLabel
              control={
                <GreenCheckbox
                  name={item.id}
                  style={{ color: colors[item.id as string] }}
                />
              }
              checked={checked[item.id as string] || false}
              label={item.name}
              onChange={() => mrChecked(item.id as string)}
              key={item.id}
            />
          ))}
        </If>
      </FormGroup>
    </>
  );
};
