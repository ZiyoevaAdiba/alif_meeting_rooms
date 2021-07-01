import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestEmailConfirm } from '../../../store/actions/emailConfirm';
import { IRootReducer } from '../../../store/reducers';

export const EmailAlert = () => {

  const dispatch = useDispatch();
  const {id}: {id: string}  = useParams();

  useEffect(() => {
    dispatch(requestEmailConfirm(id));
  }, []);

  const {
    error,
    success,
    loading
  } = useSelector((state: IRootReducer) => state.emailConfirmReducer);

  if (loading) {
    return <>Loading...</>
  }

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
