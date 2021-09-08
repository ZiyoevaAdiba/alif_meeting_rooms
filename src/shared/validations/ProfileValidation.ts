import * as Yup from 'yup';

export const UserProfileValidation = Yup.object().shape({
  department_id: Yup.string().required('Выберите отдел'),
  email: Yup.string().email('Почта недействительна').required('Заполните поле'),
  last_name: Yup.string().required('Заполните поле'),
  name: Yup.string().required('Заполните поле'),
  tg_account: Yup.string().matches(/^[\w.-.@]+$/, "Недействительный аккаунт").required('Заполните поле'),
  phone: Yup.number().required('Недействительный номер'),
  password: Yup.string(),
  new_password: Yup.string(),
  repeat_new_password: Yup.string().when("new_password", {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then:Yup.string().required('Пароль должен совпадать с новым паролем').oneOf([Yup.ref('new_password')], 'Пароль должен совпадать с новым паролем')})
});
