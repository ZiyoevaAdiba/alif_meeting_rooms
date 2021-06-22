import { Helmet } from 'react-helmet';
import ReactNotification from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";

export const Page = ({ title, children }: any) => {
    return (
        <>
            <ReactNotification />
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    )
}