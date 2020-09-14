import React from "react";
import {useStyles} from './Style';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import GlobeStats from '../../components/mobile/glob'
import CountriesStats from '../../components/mobile/countries'

function HomePageContainer(props) {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <Grid item xs={12} className={classes.tableWrapper}>
                    <GlobeStats {...props}/>
                </Grid>
                <Grid item xs={12} className={classes.tableWrapper}>
                    <CountriesStats {...props}/>
                </Grid>
            </div>
        </>
    )
}
const mapStateToProps = state => ({
    summary: state.summary
})
export default connect(mapStateToProps)(HomePageContainer)