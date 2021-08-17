import { Checkbox, CheckboxProps, FormControlLabel, FormGroup, withStyles } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urls } from "../../../routes/urls";
import { getCheckedMRs } from "../../../store/actions/reservations/meetingRoomsData";
import { IRootReducer } from "../../../store/reducers";
import { IColors } from "./colorGenerator";

export const GreenCheckbox = withStyles({
  root: {
    color: 'rgb(57 185 127)',
    borderRadius: '50',
    '&$checked': {
      color: 'rgb(57 185 127)',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface IMRCheckBox {
  colors: IColors,
  selectedCity: string,
  selectedBuilding: string,
  urlRooms: string,
}

export const MRCheckBox: FC<IMRCheckBox> = ({ colors, selectedCity, selectedBuilding, urlRooms }) => {
  const {
    meetingRoomsInfo
  } = useSelector((state: IRootReducer) => state.getMRsDataReducer);
  const dispatch = useDispatch();
  const urlParam = (urlRooms === "") ? [] : urlRooms.split(',');
  const [selectedRooms, setSelectedRooms] = useState<string[]>(urlParam);

  interface ICheckBoxItems {
    [key: string]: boolean
  }

  const checkBoxItems = meetingRoomsInfo.reduce((o, key) => ({
    ...o,
    [key.id as string]: selectedRooms.includes(key.id as string)
  }), {}) as ICheckBoxItems

  const [checked, setChecked] = useState<ICheckBoxItems>(checkBoxItems);

  const mrChecked = (mrId: string) => {
    setChecked({ ...checked, [mrId]: !checked[mrId] });

    if (checked[mrId] === false) {
      setSelectedRooms([...selectedRooms, mrId]);
    } else {
      setSelectedRooms(selectedRooms.filter(room => room !== mrId))
    }
  };

  useEffect(() => {
    dispatch(getCheckedMRs(selectedRooms))
    window.history.pushState({},"",`${urls.reservations}?date=&city=${selectedCity}&building=${selectedBuilding}&rooms=${selectedRooms.toString()}`)
  }, [checked, dispatch])

  return (
    <>
      <FormGroup
      >
        Миттинг румы
        <hr />
        {
          (!meetingRoomsInfo)
            ?
            'На данный момент нет доступных миттинг румов.'
            :
            meetingRoomsInfo.map((item) => {
              return <FormControlLabel
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
            })
        }
      </FormGroup>
    </>
  )
}
