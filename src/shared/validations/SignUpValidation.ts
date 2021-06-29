import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({

  // department: Yup.object().required('Выберите отдел'),
  email: Yup.string().email('Invalid email').required('Заполните поле'),
  last_name: Yup.string().required('Заполните поле'),
  name: Yup.string().required('Заполните поле'),
  password: Yup.string().required('Введите пароль').min(4, 'минимальное количество символов - 4'),
  tg_account: Yup.string().required('Заполните поле'),
  phone: Yup.number().required('Phone number is not valid'),
});