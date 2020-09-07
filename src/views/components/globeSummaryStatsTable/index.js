import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {fetchSummaryData} from '../../../stores/summary/actions';
import Table from '../table'
import _ from 'lodash';
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles({
    root: {
       display:'flex'
    },
});
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
        <div>
            {!_.isEmpty(globeCountriesStats) && <Table data={[globeCountriesStats.Global]}/>}
            {!_.isEmpty(globeCountriesStats) && <Table data={globeCountriesStats.Countries}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    summary: state.summary
})
export default connect(mapStateToProps)(GlobeStats)