import { Helmet } from 'react-helmet';

export const Page = ({ title, children }: any) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    )
}