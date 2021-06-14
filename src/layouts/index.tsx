import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { TopBar } from '../shared/components/TopBar';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
        fontFamily: 'Calibri',
        fontSize: 20
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 70,
        [theme.breakpoints.up('md')]: {
            padding: '80px 50px 0'
        }
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
    }
}));

export const DashboardLayout = ({ children }: any) => {
    const classes = useStyles();
    const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

    return (
        <div className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
            {/* <NavBar
                openMobile={isMobileNavOpen}
                onMobileClose={() => setMobileNavOpen(false)}
            /> */}
            {/* set router */}
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <div className={classes.content}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.any
};