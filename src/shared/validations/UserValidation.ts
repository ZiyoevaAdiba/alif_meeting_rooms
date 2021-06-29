import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({

  // department: Yup.string().required('Заполните поле'),
  email: Yup.string().email('Invalid email').required('Заполните поле'),
  last_name: Yup.string().required('Заполните поле'),
  name: Yup.string().required('Заполните поле'),
  tg_account: Yup.string().required('Заполните поле'),
  phone: Yup.number().required('Phone number is not valid'),
  role: Yup.string(),
});