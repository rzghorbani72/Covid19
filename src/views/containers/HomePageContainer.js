import React from "react";
import GlobeStats from "../components/globeSummaryStatsTable";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    tableWrapper: {
        display: 'flex'
    },
    wrapperGrid: {
        display: 'flex',
        justifyContent: 'center'
    }
}));
export default function HomePageContainer() {
    const classes = useStyles();
    return (<>
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.wrapperGrid}>
                <Grid item xs={10} className={classes.tableWrapper}>
                    <GlobeStats/>
                </Grid>
            </Grid>
        </div>
    </>)
}