import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import { FormGroup } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  constainer: {
    width: 'inherit',
    marginTop: '10px'
  },
  label: {
    width: '30px',
    height: '28px',
    background: '#f0f3f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    color: '#878d91',
    margin: '10px 13px 10px 0px'
  },
  inp: {
    display: 'none',
    "&:checked + label": {
      background: 'rgb(57 185 127)',
      color: 'white'
    }
  },
}));

export const ReserRepeat = () => {
  const classes = useStyles();
  const [checkedDays, setCheckedDays] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedDays([...checkedDays, event.target.value]);
    } else {
      setCheckedDays(checkedDays.filter(item => item !== event.target.value))
    }
  };

  interface IRepeatDays {
    id: string,
    value: string,
    label: string
  };

  const repeatDays: IRepeatDays[] = [
    {
      id: "ch1",
      value: 'monday',
      label: 'Пн',
    },
    {
      id: "ch2",
      value: 'tuesday',
      label: 'Вт'
    },
    {
      id: "ch3",
      value: 'wednesday',
      label: 'Ср'
    },
    {
      id: "ch4",
      value: 'thursday',
      label: 'Чт'
    },
    {
      id: "ch5",
      value: 'friday',
      label: 'Пт'
    },
    {
      id: "ch6",
      value: 'saturday',
      label: 'Сб'
    },
  ];

  return (
    <div className={classes.constainer}>
      <FormLabel> Дни повторения</FormLabel>
      <FormGroup row>
        {
          repeatDays.map(item =>
            <div >
              <input type="checkbox" className={classes.inp} id={item.id} value={item.value}
                onChange={handleChange}
              />
              <label htmlFor={item.id} className={classes.label}>{item.label}</label>
            </div>
          )
        }
      </FormGroup>
    </div>


  );
}
