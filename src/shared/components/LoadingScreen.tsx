import { useEffect } from 'react';
import NProgress from 'nprogress';
import {
    Box,
    LinearProgress,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        minHeight: '100%',
        paddingTop: '6px',
    },
    progrBar: {
        backgroundColor: '#39B980',
        '& div': {
            backgroundColor: 'white',
        }
    }
}));

export const LoadingScreen = () => {
    const classes = useStyles();

    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <div className={classes.root}>
            <Box width={400}>
                <LinearProgress className={classes.progrBar} />
            </Box>
        </div>
    )
}