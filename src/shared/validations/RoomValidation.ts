import * as Yup from 'yup';

export const RoomSchema = Yup.object().shape({
  building_id: Yup.string().required('Необходимо выбрать'),
  name: Yup.string().required('Заполните поле'),
  number: Yup.string().required('Заполните поле'),
  status: Yup.string().required('Заполните поле'),
});