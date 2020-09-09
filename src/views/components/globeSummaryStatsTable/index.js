import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchSummaryData} from '../../../stores/summary/actions';
import Table from '../table'
import {useStyles} from './Style'

const mapStateToProps = state => ({
    summary: state.summary
})

function GlobeStats(props) {
    const classes = useStyles();
    const [globeCountriesStats, setGlobeCountriesStats] = useState({});

    useEffect(() => {
        const {dispatch, summary} = props;
        if (!summary.loading) {
            if (_.isEmpty(summary.data)) dispatch(fetchSummaryData())
            else summary.data !== globeCountriesStats && setGlobeCountriesStats(summary.data)
        }
    }, [props.summary.data]);


    return (
        <div className={classes.root}>
            <h2 className={classes.h2}>Global Stats</h2>
            {!_.isEmpty(globeCountriesStats) && <Table data={[globeCountriesStats.Global]}/>}
            <h2 className={classes.h2}>Countries Stats</h2>
            {!_.isEmpty(globeCountriesStats) && <Table data={globeCountriesStats.Countries}/>}
        </div>
    )
}

export default connect(mapStateToProps)(GlobeStats)