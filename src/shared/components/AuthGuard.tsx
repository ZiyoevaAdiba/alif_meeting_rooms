import { Redirect } from "react-router";
import { urls } from "../../routes/urls";
import jwt from 'jsonwebtoken'
import {
    getToken,
    removeToken
} from "../../store/actions/login";
import { getUnixTime } from "date-fns";
import { FC, ReactNode } from "react";

export const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {

    const token: string = getToken();
    const expToken = jwt.decode(token, { complete: true })?.payload.exp;
    const currentDate = getUnixTime(Date.now());

    if (expToken > currentDate) {
        return <>{children}</>;
    }
    removeToken();

    return <Redirect to={urls.login} />;
}