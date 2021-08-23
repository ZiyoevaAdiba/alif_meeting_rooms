import React, { Dispatch, FC } from "react";
import { ChangeEvent } from "react";
import { History } from "history";
import { getFilteredMRs } from "./getFilteredMRs";
import { Box, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducers";

const useStyles = makeStyles(() => ({
  filters: {
    margin: "20px 20px 20px 0",
    width: "12vw",
    marginBottom: "20px",
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(57 185 127)",
    },
  },
}));

interface IFilters {
  date: string;
  selectedCity: string;
  setSelectedCity: (state: string) => void;
  history: History;
  selectedBuilding: string;
  setSelectedBuilding: (state: string) => void;
  selectedRooms: string;
  dispatch: Dispatch<any>;
  getBuildingsForDropdown: any;
}

export const Filters: FC<IFilters> = ({
  date,
  selectedCity,
  setSelectedCity,
  history,
  selectedBuilding,
  setSelectedBuilding,
  selectedRooms,
  dispatch,
  getBuildingsForDropdown,
}) => {
  const classes = useStyles();
  const { buildings } = useSelector(
    (state: IRootReducer) => state.buildingsReducer
  );
  const { cities } = useSelector((state: IRootReducer) => state.citiesReducer);

  const handleCitySelect = (
    e: ChangeEvent<{ value: unknown }>,
    history: History
  ) => {
    setSelectedCity(e.target.value as string);
    setSelectedBuilding("");

    getFilteredMRs(
      date,
      e.target.value as string,
      history,
      "",
      selectedRooms,
      dispatch
    );
    getBuildingsForDropdown(e.target.value as string);
  };

  const handleBuildingSelect = (
    evt: ChangeEvent<{ value: unknown }>,
    history: History,
    selectedCity: string
  ) => {
    setSelectedBuilding(evt.target.value as string);
    getFilteredMRs(
      date,
      selectedCity,
      history,
      evt.target.value as string,
      selectedRooms,
      dispatch
    );
  };

  return (
    <Box className={classes.filters}>
      <Select
        id="demo-simple-select"
        value={selectedCity}
        onChange={(e) => handleCitySelect(e, history)}
        name="city_id"
        fullWidth
        displayEmpty
        style={{ marginBottom: 20 }}
      >
        {cities.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
        <MenuItem value={""}>Все города</MenuItem>
      </Select>

      <Select
        id="demo-simple-select"
        value={selectedBuilding}
        onChange={(evt) => handleBuildingSelect(evt, history, selectedCity)}
        name="building_id"
        fullWidth
        displayEmpty
      >
        {buildings.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
        <MenuItem value={""}>Все здания</MenuItem>
      </Select>
    </Box>
  );
};
