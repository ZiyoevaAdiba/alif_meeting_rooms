import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Заполните поле'),
  password: Yup.string().min(4, 'минимальное количество символов - 4').required('Введите пароль'),
});