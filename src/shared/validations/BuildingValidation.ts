import * as Yup from 'yup';

export const BuildingSchema = Yup.object().shape({
  name: Yup.string().required('Заполните поле'),
  city_id: Yup.string().required('Выберите город'),
});