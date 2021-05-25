interface IUrls {
    home: string,
    login: string,
};
export const urls: IUrls = {
    home: '/home',
    login: '/login',
};

interface IApi {
    base: string,
    login: string,
};
export const api: IApi = {
    base: `${process.env.REACT_APP_DEV_URL}`,
    login: '/auth/sign-in',
};