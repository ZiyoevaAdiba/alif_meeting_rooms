import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestEmailConfirm } from '../../../store/actions/emailConfirm';
import { IRootReducer } from '../../../store/reducers';

export const EmailAlert = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestEmailConfirm());
  }, [])

  const {
    error,
    success
  } = useSelector((state: IRootReducer) => state.emailConfirmReducer);

  const classes = useStyles();

    return (
    <>
      {
        (error && !success)
        &&
        <Alert variant="filled" severity="error">
          Ошибочка!
        </Alert>
      }
      {
        (!error && success)
        &&
        <Alert variant="filled" severity="success">
          Регистрация прошла успешно!
        </Alert>
      }
    </>
  );
}
