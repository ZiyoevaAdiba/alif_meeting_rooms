import * as Yup from 'yup';

export const AddUserValidation = Yup.object().shape({
  department_id: Yup.string().required('Выберите отдел'),
  email: Yup.string().email('Почта недействительна').required('Заполните поле'),
  last_name: Yup.string().required('Заполните поле'),
  name: Yup.string().required('Заполните поле'),
  password: Yup.string().required('Введите пароль').min(4, 'минимальное количество символов - 4'),
  tg_account: Yup.string().required('Заполните поле'),
  phone: Yup.number().required('Phone number is not valid'),
});

export const EditUserValidation = Yup.object().shape({
  department_id: Yup.string().required('Выберите отдел'),
  email: Yup.string().email('Почта недействительна').required('Заполните поле'),
  last_name: Yup.string().required('Заполните поле'),
  name: Yup.string().required('Заполните поле'),
  tg_account: Yup.string().required('Заполните поле'),
  phone: Yup.number().required('Phone number is not valid'),
});