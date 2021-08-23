import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import { Box, FormGroup } from "@material-ui/core";
import { repeatDays } from "../../consts/daysCheckbox";

const useStyles = makeStyles(() => ({
  constainer: {
    width: "inherit",
    marginTop: "10px",
  },
  label: {
    width: "30px",
    height: "28px",
    background: "#f0f3f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    color: "#878d91",
    margin: "10px 13px 10px 0px",
  },
  inp: {
    display: "none",
    "&:checked + label": {
      background: "rgb(57 185 127)",
      color: "white",
    },
  },
}));

interface IReservationRepeat {
  checkedDays: number[];
  setCheckedDays: (state: number[]) => void;
}

export const ReservationRepeat: FC<IReservationRepeat> = ({
  checkedDays,
  setCheckedDays,
}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedDays([...checkedDays, Number(event.target.value)]);
    } else {
      setCheckedDays(
        checkedDays.filter((item) => item !== Number(event.target.value))
      );
    }
  };
  interface IChecked {
    [key: number]: boolean;
  }

  const markedList: IChecked = repeatDays.reduce(
    (acc, item) => ({
      ...acc,
      [item.value]: checkedDays.includes(item.value),
    }),
    {}
  );

  return (
    <div className={classes.constainer}>
      <FormLabel> Дни повторения</FormLabel>
      <FormGroup row>
        {repeatDays.map((item) => (
          <Box key={item.value}>
            <input
              type="checkbox"
              className={classes.inp}
              id={item.id}
              value={item.value}
              onChange={handleChange}
              key={item.id}
              checked={markedList[item.value] || false}
            />
            <label htmlFor={item.id} className={classes.label} key={item.value}>
              {item.label}
            </label>
          </Box>
        ))}
      </FormGroup>
    </div>
  );
};
