import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState
} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../../store/reducers';
import { ErrorDiv } from '../ErrorDiv';
import { requestEditCity, resetCityEditing } from '../../../store/actions/cities';
import { CssTextField } from '../CustomInput';
import { buttonStyles } from '../styles/buttonStyles';

export const EditCity = () => {
  const buttonClasses = buttonStyles();
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
    dispatch(resetCityEditing());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestEditCity(cityInput, setOpen, city?.id));
  };

  return (
    <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Редактирование отдела</DialogTitle>
      <form
        onSubmit={handleSubmit}
      >
        <DialogContent>
          <CssTextField
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
            className={buttonClasses.btnReserve}
            type='submit'
          >
            Сохранить
          </Button>
          <Button
            onClick={handleClose}
            className={buttonClasses.btnCancel}
          >
            Отмена
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
