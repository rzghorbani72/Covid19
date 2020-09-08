import React from "react";
import GlobeStats from "../components/globeSummaryStatsTable";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GlobeMap from "../components/globeMap";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // backgroundColor:'#1c54b2'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    tableWrapper: {
        display: 'flex',
        justifyContent: 'center'
    }
}));
export default function HomePageContainer() {
    const classes = useStyles();
    return (<>
        <div className={classes.root}>
            <Grid item xs={12} className={classes.tableWrapper}>
                <GlobeStats/>
            </Grid>
            <GlobeMap/>
        </div>
    </>)
}