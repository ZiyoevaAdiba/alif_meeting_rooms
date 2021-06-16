import PropTypes from 'prop-types';
import { Container, makeStyles } from '@material-ui/core';
import { TopBar } from '../shared/components/TopBar';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        width: '100%',
        fontSize: 20
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        paddingTop: 70,
        [theme.breakpoints.up('lg')]: {
            padding: '80px 50px 0'
        }
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
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
        <Container
            className={classes.root}
            maxWidth="xl"
        >
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
        </Container>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.any
};