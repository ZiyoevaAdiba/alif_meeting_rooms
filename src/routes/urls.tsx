interface IUrls {
    home: string,
    login: string,
    signUp: string,
    forget: string,
    users: string,
    meetingRooms: string,
    departments: string,
    reservations: string,
};
export const urls: IUrls = {
    home: '/home',
    login: '/login',
    signUp: '/signUp',
    forget: '/forget',
    users: '/users',
    meetingRooms: '/meeting-rooms',
    departments: '/departments',
    reservations: '/reservations',
};

interface IApi {
    base: string,
    login: string,
    signUp: string,
    forget: string,
    users: string,
    meetingRooms: string,
    adminRooms: string,
    departments: string,
    reservations: string,
    loggedUserData: string,
    departmentsForDropdown: string,
    mrReservations: string,
    uploadPhoto: string
};

export const api: IApi = {
    base: `${process.env.REACT_APP_DEV_URL}`,
    login: '/auth/sign-in',
    signUp: '/auth/sign-up',
    forget: '/auth/forget',
    users: '/admin/users',
    meetingRooms: '/api/meeting-rooms',
    adminRooms: '/admin/meeting-room',
    departments: '/admin/department',
    reservations: '/api/reservation',
    loggedUserData: '/api/parse-token',
    departmentsForDropdown: '/auth/department',
    mrReservations: '/api/reservation',
    uploadPhoto: '/admin/photo/meeting-room'
};
