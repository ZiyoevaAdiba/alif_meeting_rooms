import * as Yup from 'yup';

export const RoomSchema = Yup.object().shape({
  city: Yup.string().required('Заполните поле'),
  name: Yup.string().required('Заполните поле'),
  number: Yup.string().required('Заполните поле'),
  place: Yup.string(),
  status: Yup.string().required('Заполните поле'),
});