import { 
  ChangeEvent, 
  FormEvent, 
  useEffect, 
  useState 
} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../Reservations/Form';
import { IRootReducer } from '../../../store/reducers';
import { ErrorDiv } from '../ErrorDiv';
import { requestEditCity, resetCityEditing } from '../../../store/actions/cities';

export const EditCity = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { editError } = useSelector((state: IRootReducer) => state.citiesReducer)
  const {
    city
  } = useSelector((state: IRootReducer) => state.citiesReducer);
  
  const [cityInput, setCityInput] = useState<string | undefined>('');

  useEffect(() => {
    setOpen(!open);
    setCityInput(city?.name); 
  }, [city]);

  const handleClose = () => {
    // setOpen(false);
    dispatch(resetCityEditing());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCityInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestEditCity(cityInput, setOpen, city?.id));
  };

  return (
    <div>
      <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Редактирование отдела</DialogTitle>
        <form
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <TextField
              autoFocus
              name="name"
              fullWidth
              label="Наименование"
              value={cityInput || ''}
              onChange={handleChange}
              type="text"
              required
            />
            {
            (editError)
            &&
            <ErrorDiv
              error={editError}
            />
          }
          </DialogContent>
          
          <DialogActions>
            <Button
              variant='contained'
              className={classes.btnReserve}
              type='submit'
            >
              Сохранить
            </Button>
            <Button
              onClick={handleClose}
              className={classes.btnCancel}
            >
              Отмена
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
