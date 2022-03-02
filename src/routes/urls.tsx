interface IUrls {
  authPage: string;
  home: string;
  login: string;
  signUp: string;
  forget: string;
  users: string;
  meetingRooms: string;
  departments: string;
  cities: string;
  buildings: string;
  reservations: string;
  profile: string;
  oldVersion: string;
}
export const urls: IUrls = {
  authPage: "/auth",
  home: "/home",
  login: "/auth/login",
  signUp: "/auth/signUp",
  forget: "/auth/forget",
  users: "/users",
  meetingRooms: "/meeting-rooms",
  departments: "/departments",
  cities: "/cities",
  buildings: "/buildings",
  reservations: "/reservations",
  profile: "/profile",
  oldVersion: "oldVersion",
};

interface IApi {
  login: string;
  signUp: string;
  forget: string;
  registrationAlert: string;
  users: string;
  meetingRooms: string;
  adminRooms: string;
  departments: string;
  apiCities: string;
  adminCities: string;
  reservations: string;
  loggedUserData: string;
  departmentsForDropdown: string;
  mrReservations: string;
  uploadPhoto: string;
  apiBuildings: string;
  adminBuildings: string;
  apiUser: string;
}

export const api: IApi = {
  login: "/auth/sign-in",
  signUp: "/auth/sign-up",
  forget: "/auth/forget",
  registrationAlert: "/auth/sign-ac",
  users: "/admin/users",
  meetingRooms: "/api/meeting-rooms",
  adminRooms: "/admin/meeting-room",
  departments: "/admin/department",
  apiCities: "/api/city",
  adminCities: "/admin/city",
  reservations: "/api/reservation",
  loggedUserData: "/api/parse-token",
  departmentsForDropdown: "/auth/department",
  mrReservations: "/api/reservation",
  uploadPhoto: "/admin/photo/meeting-room",
  apiBuildings: "/api/building",
  adminBuildings: "/admin/building",
  apiUser: "/api/user",
};
