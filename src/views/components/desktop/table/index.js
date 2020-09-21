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

import {tableRowsGenerator, tableColumnsGenerator} from './widgets'
import {renderChart} from './ChartRenderer'

import moment from "moment";
import {connect} from 'react-redux'
import {fetchFullCountryTimeLineData} from '../../../../stores/timeLine/full/actions';
import {useRowStyles} from './Style';

const mapStateToProps = state => ({
    timeLine: state.timeLine,
    fullTimeLine: state.fullTimeLine
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
    const [ascending, setAscending] = useState({TotalDeaths: true})
    const [updateDate, setUpdateDate] = useState('')
    const [tableData, setTableData] = useState({
        columns: table_column,
        data: [],
    });
    const [tableGlobalData, setTableGlobalData] = useState({
        columns: table_column,
        data: [],
    });
    const filterTableRows = (country) => {
        const regex = new RegExp(`(${country}).*`, "gi");
        setTimeout(() => {
            const filtered = _.filter(props.data, obj => obj.Country.match(regex))
            filtered.map(item => item.open = false)
            let sorted = _.sortBy(filtered, "NewDeaths");
            sorted.map(item => item.open = false);
            setTableData(createTableDataStructure(filtered));
        }, 500);
    }
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
        const {timeLine} = props
        if (!_.isEmpty(timeLine.data) && !timeLine.loading) {
            let array = [];
            timeLine.data.timelineitems.map(item => {
                _.mapKeys(item, (value, key) => {
                    if (_.isObject(value)) {
                        value.date = key
                        array.push(value);
                    }
                });
            });
            renderChart(array, 'total_deaths');
        }
    }, [props.timeLine]);

    useMemo(() => {
        const {fullTimeLine, dispatch} = props
        if (!_.isEmpty(fullTimeLine.data) && !fullTimeLine.loading) {
            renderChart(fullTimeLine.data.data, 'deaths');
        }
        if (_.isEmpty(fullTimeLine.data) && !fullTimeLine.loading) {
            dispatch(fetchFullCountryTimeLineData())
        }
    }, [props.fullTimeLine]);
    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table>
                        <TableHead>
                            <TableCell
                                align='left'
                            >
                                chart
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            <div id='Report_Chart'/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" className={classes.globe}>
                        <TableHead>
                            <TableRow>
                                {tableColumnsGenerator(tableGlobalData, classes)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!_.isEmpty(tableGlobalData.data) && tableRowsGenerator({
                                tableData: tableGlobalData,
                                classes,
                                glob: true, ...props
                            })}
                        </TableBody>
                    </Table>
                    <div className={classes.date}><span>updated {updateDate.ago} at {updateDate.date}</span></div>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableColumnsGenerator(tableData, classes)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!_.isEmpty(tableData.data) && tableRowsGenerator({
                                tableData,
                                classes,
                                glob: false, ...props
                            })}
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