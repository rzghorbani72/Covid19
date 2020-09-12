import React from "react";
import GlobeStats from "../../components/globeSummaryStatsTable";
import {useStyles} from './Style';
import Grid from '@material-ui/core/Grid';
import GlobeMap from "../../components/globeMap";

export default function HomePageContainer() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                mobileView
                {/*<Grid item xs={12} className={classes.tableWrapper}>*/}
                {/*    <GlobeStats/>*/}
                {/*</Grid>*/}
                {/*<GlobeMap/>*/}
            </div>
        </>
    )
}