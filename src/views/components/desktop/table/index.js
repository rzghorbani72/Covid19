import React, {useMemo, useState} from 'react';
import _ from 'lodash';

//material-ui components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from "@material-ui/lab/Skeleton";

import {TableRowsGenerator, TableColumnsGenerator, TableLoadingRowsGenerator} from './widgets'
import {renderChart} from './ChartRenderer'

import moment from "moment";
import {connect} from 'react-redux'
import {fetchEachCountryTimeLineData} from '../../../../stores/timeLine/country/actions';
import {useRowStyles} from './Style';
import {Search} from '../searchBox';
import {Grid} from "@material-ui/core";

const mapStateToProps = state => ({
    countryTimeLine: state.countryTimeLine,
    totalTimeLine: state.totalTimeLine
});
let table_column = [
    {
        id: 'location',
        label: 'Location',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'cases',
        label: 'Cases',
        minWidth: 50,
        align: 'center'
    },
    {
        id: 'recovered',
        label: 'Recovered',
        minWidth: 50,
        align: 'center'
    },
    {
        id: 'death',
        label: 'Death',
        minWidth: 50,
        align: 'center'
    }]

function ReportTable(props) {
    const classes = useRowStyles();
    const {tableLoading} = props;
    const [ascending, setAscending] = useState({TotalDeaths: true})
    const [updateDate, setUpdateDate] = useState('');
    const [isCountryLoading, setIsCountryLoading] = useState(false)
    const [isTotalLoading, setIsTotalLoading] = useState(true)
    const [countryCode, setCountryCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState({
        columns: table_column,
        data: [],
    });
    const [tableData, setTableData] = useState({
        columns: table_column,
        data: [],
    });
    const [tableGlobalData, setTableGlobalData] = useState({
        columns: table_column,
        data: [],
    });
    const sortArray = (by = 'TotalDeaths') => {
        let isAsc = true;
        if (_.has(ascending, by)) {
            setAscending(!ascending[by]);
            isAsc = !ascending[by];
        } else {
            let obj = {}
            obj[by] = true
            setAscending(obj);
            isAsc = true;
        }
        let sorted = _.sortBy(tableData.data, [by]);
        sorted.map(item => item.open = false)
        setTableData(createTableDataStructure(isAsc ? sorted : _.reverse(sorted)));
    }

    useMemo(() => {
        const {data: {Global, Countries}} = props;
        if (!_.isEmpty(Countries) && _.isArray(Countries)) {
            Global.Country = 'world wide';
            Global.CountryCode = 'WORLD';
            setTableGlobalData(createTableDataStructure([Global]))
            let sorted = _.reverse(_.sortBy(Countries, "NewDeaths"));
            let howLongAgo = moment
                .utc(sorted[0].Date)
                .startOf("seconds")
                .fromNow();
            let date = moment().utc(sorted[0].Date).format('MMMM Do YYYY, h:mm:ss a');
            setUpdateDate({ago: howLongAgo, date})
            setTableData(createTableDataStructure(sorted));
        }
    }, [props.data]);

    useMemo(() => {
        const {totalTimeLine} = props;
        setIsTotalLoading(totalTimeLine.loading);
    }, [props.totalTimeLine.loading]);

    useMemo(() => {
        const {countryTimeLine} = props;
        setIsCountryLoading(countryTimeLine.loading);
    }, [props.countryTimeLine.loading]);

    useMemo(() => {
        const {countryTimeLine, dispatch} = props
        if (!_.isEmpty(countryTimeLine.data) && _.has(countryTimeLine.data, 'timelineitems') && !isCountryLoading) {
            let array = [];
            countryTimeLine.data.timelineitems.map(item => {
                _.mapKeys(item, (value, key) => {
                    if (_.isObject(value)) {
                        value.date = key
                        array.push(value);
                    }
                });
            });
            const code = countryTimeLine.data.countrytimelinedata[0].info.code
            setCountryCode(code);
            setSelectedCountry({columns: table_column, data: [_.find(tableData.data, {CountryCode: code})],})
            renderChart(array, 'total_deaths');
        }
        if (_.isEmpty(countryTimeLine.data) && !isCountryLoading) {
            dispatch(fetchEachCountryTimeLineData('IR'))
        }
    }, [props.countryTimeLine, isCountryLoading]);

    useMemo(() => {
        const {totalTimeLine} = props
        if (!_.isEmpty(totalTimeLine.data) && !_.isEmpty(totalTimeLine.data.data) && !isTotalLoading) {
            renderChart(totalTimeLine.data.data, 'deaths');
        }

    }, [props.totalTimeLine, isTotalLoading]);

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table>
                        <TableHead>
                            <TableCell
                                align='left'
                            >
                                <Grid container justify="left">
                                    <Grid item xs={6} md={3} lg={2} xl={1}>chart</Grid>
                                    <Grid item xs={6} md={3} lg={2} xl={1}
                                          style={{
                                              position: 'absolute',
                                              zIndex: 10,
                                              left: '30%',
                                              marginTop: '-7px',
                                              width: '50%'
                                          }}>
                                        {!_.isEmpty(tableData.data) &&
                                        <Search data={tableData.data} dispatch={props.dispatch}/>}
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            <div className="row">
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {TableColumnsGenerator(tableGlobalData, classes)}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {!_.isEmpty(selectedCountry.data) && !_.isEmpty(selectedCountry.data[0]) && !(isTotalLoading || isCountryLoading) ?
                                                <TableRowsGenerator
                                                    tableData={selectedCountry}
                                                    classes={classes}
                                                    glob={false}  {...props}/> :
                                                <TableRowsGenerator
                                                    tableData={{column: table_column, data: []}}
                                                    classes={classes}
                                                    glob={false}  {...props}/>}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className="col-xl-12 text-center">
                                    {(isTotalLoading || isCountryLoading) &&
                                    <Skeleton animation="wave" height={300} width="100%"/>}
                                    <div id='Report_Chart'
                                         style={{display: (isTotalLoading || isCountryLoading) ? 'none' : 'block'}}/>
                                </div>
                            </div>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" className={classes.globe}>
                        <TableHead>
                            <TableRow>
                                {TableColumnsGenerator(tableGlobalData, classes)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!_.isEmpty(tableGlobalData.data) && <TableRowsGenerator
                                tableData={tableGlobalData}
                                classes={classes}
                                glob={true}
                                {...props}/>}
                        </TableBody>
                    </Table>
                    <div className={classes.date}><span>updated {updateDate.ago} at {updateDate.date}</span></div>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {TableColumnsGenerator(tableData, classes)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableLoading && _.isEmpty(tableData.data) ?
                                TableLoadingRowsGenerator()
                                : <TableRowsGenerator tableData={tableData} classes={classes} glob={false} {...props}/>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

function createTableDataStructure(data) {
    return {columns: table_column, data: data}
}

export default connect(mapStateToProps)(ReportTable)