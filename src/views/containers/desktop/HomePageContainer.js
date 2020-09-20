import React from "react";
import GlobeStats from "../../components/desktop/globeSummaryStatsTable";
import {useStyles} from './Style';
import Grid from '@material-ui/core/Grid';
import GlobeMap from "../../components/desktop/globeMap";

export default function HomePageContainer() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <Grid item xs={12} className={classes.tableWrapper}>
                    <Grid item xs={12} sm={10} md={10} lg={9} xl={8}>
                        <GlobeStats/>
                    </Grid>
                </Grid>
                <GlobeMap/>
            </div>
        </>
    )
}