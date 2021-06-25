import PropTypes from 'prop-types';
import { Container, makeStyles } from '@material-ui/core';
import { TopBar } from '../shared/components/TopBar';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        width: '100%',
        fontSize: 20,
        // overflow: 'hidden',
        '& .MuiPaper-elevation4': {
            boxShadow: 'none',
            borderBottom: '2px solid #EBEBEB',
            height: '70px',
        }
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        // overflow: 'hidden',
        paddingTop: 70,
        [theme.breakpoints.up('lg')]: {
            padding: '70px 50px 0'
        }
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        // overflow: 'hidden',
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        // overflow: 'auto',
    }
}));

export const DashboardLayout = ({ children }: any) => {
    const classes = useStyles();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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