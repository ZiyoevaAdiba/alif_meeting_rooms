import { Redirect } from "react-router";
import { urls } from "../../routes/urls";
import jwt from 'jsonwebtoken'
import { 
    getToken, 
    removeToken 
} from "../../store/actions/login";


export const AuthGuard = ({ children }: any) => {

    const token: string = getToken();
    const expToken = jwt.decode(token, { complete: true })?.payload.exp;
    const currentDate = new Date().getSeconds();
    
    if (expToken > currentDate) {
        return children;
    }
    removeToken();
    return <Redirect to={urls.login}/>;
} 