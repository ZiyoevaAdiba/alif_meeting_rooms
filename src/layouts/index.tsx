import PropTypes from 'prop-types';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';
import { IRootReducer } from '../store/reducers';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        width: '100%',
        fontSize: 20,
        '& .MuiPaper-elevation4': {
            boxShadow: 'none',
            borderBottom: '2px solid #EBEBEB',
            height: '65px',
        }
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        paddingTop: 70,
        [theme.breakpoints.up('lg')]: {
            padding: '70px 50px 0'
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
    const {
        userData
    } = useSelector((state: IRootReducer) => state.getUserDataReducer);

    return (
        <Container
            className={classes.root}
            maxWidth="xl"
        >
            <CssBaseline />
            <TopBar />
            {
                (userData.role === 'admin')
                &&
                <SideBar />
            }

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