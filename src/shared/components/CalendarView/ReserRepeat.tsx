import React, { FC, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import { FormGroup } from "@material-ui/core";

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

interface IReserRepeat {
  checkedDays: string[];
  setCheckedDays: (state: string[]) => void;
}

export const ReserRepeat: FC<IReserRepeat> = ({
  checkedDays,
  setCheckedDays,
}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedDays([...checkedDays, event.target.value]);
    } else {
      setCheckedDays(checkedDays.filter((item) => item !== event.target.value));
    }
  };

  interface IRepeatDays {
    id: string;
    value: number;
    label: string;
  }

  const repeatDays: IRepeatDays[] = [
    {
      id: "ch1",
      value: 1,
      label: "Пн",
    },
    {
      id: "ch2",
      value: 2,
      label: "Вт",
    },
    {
      id: "ch3",
      value: 3,
      label: "Ср",
    },
    {
      id: "ch4",
      value: 4,
      label: "Чт",
    },
    {
      id: "ch5",
      value: 5,
      label: "Пт",
    },
    {
      id: "ch6",
      value: 6,
      label: "Сб",
    },
    {
      id: "ch7",
      value: 7,
      label: "Вс",
    },
  ];

  return (
    <div className={classes.constainer}>
      <FormLabel> Дни повторения</FormLabel>
      <FormGroup row>
        {repeatDays.map((item) => (
          <div key={item.value}>
            <input
              type="checkbox"
              className={classes.inp}
              id={item.id}
              value={item.value}
              onChange={handleChange}
              key={item.id}
            />
            <label htmlFor={item.id} className={classes.label} key={item.value}>
              {item.label}
            </label>
          </div>
        ))}
      </FormGroup>
    </div>
  );
};
