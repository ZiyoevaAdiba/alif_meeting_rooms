import * as Yup from 'yup';

export const ReserveSchema = Yup.object().shape({
  purpose: Yup.string(),
  start_time: Yup.string().required('Выберите время!'),
  end_time: Yup.string().required('Выберите время!'),
});