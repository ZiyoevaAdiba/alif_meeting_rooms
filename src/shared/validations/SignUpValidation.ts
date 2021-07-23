import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  
  department_id: Yup.string().required('Выберите отдел'),
  email: Yup.string().email('Почта недействительна').required('Заполните поле'),
  last_name: Yup.string().required('Заполните поле'),
  name: Yup.string().required('Заполните поле'),
  password: Yup.string().required('Введите пароль').min(4, 'минимальное количество символов - 4'),
  tg_account: Yup.string().matches(/^[\w.-]+$/, "Недействительный аккаунт").required('Заполните поле'),
  phone: Yup.number().required('Недействительный номер'),
});