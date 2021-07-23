import { IUserData } from "../../store/actions/signUp/interfaces"


export const user: IUserData = {
  name: '',
  last_name: '',
  email: '',
  phone: '',
  department: {},
  department_id: '',
  tg_account: '',
  password: '',
  role: '',
};
export const fieldInput = {
  name: 'name',
  last_name: 'last_name',
  email: 'email',
  phone: 'phone',
  department: 'department',
  department_id: 'department_id',
  tg_account: 'tg_account',
  password: 'password',
  role: 'role',
} 

export const userDataFields = [
  {
    name: fieldInput.name,
    label: "Имя",
    type: 'text',
  },
  {
    name: fieldInput.last_name,
    label: "Фамилия",
    type: 'text',
  },
  {
    name: fieldInput.email,
    label: "E-mail",
    type: 'email'
  },
  {
    name: fieldInput.phone,
    label: "Телефон",
    type: 'text',
  },
  {
    name: fieldInput.tg_account,
    label: "Аккаунт telegram (username)",
    type: 'text',
  },
]