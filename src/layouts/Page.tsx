import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface IPage{
    title: string,
    children: ReactNode
}
export const Page: FC<IPage> = ({ title, children }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    )
}