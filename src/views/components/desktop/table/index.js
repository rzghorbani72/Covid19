import React, {useEffect, useState} from 'react';
import _ from 'lodash';

//material-ui components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactCountryFlag from "react-country-flag"

import ImportExportIcon from '@material-ui/icons/ImportExport';
import TextField from '@material-ui/core/TextField';

import moment from "moment";
import {connect} from 'react-redux'

import {useRowStyles} from './Style'
import {ui} from '../../../../constants/config';
import {Row} from './Row'

const mapStateToProps = state => ({
    eachCountryTimeLine: state.eachCountryTimeLine
});
let table_column = [
    {
        id: 'location',
        label: 'Location',
        minWidth: 100,
        align: 'left',
        // format: (value) => value.toLocaleString('en-US')
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
    const [tableData, setTableData] = useState({
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
    // const openRowCollapse = code => {
    //     const rowIndex = _.findIndex(tableData.data, {CountryCode: code});
    //     const newRows = [...tableData.data];
    //     newRows.map((item, key) => key === rowIndex && _.has(item, 'open') ? item.open = !item.open : item.open = key === rowIndex)
    //     setTableData(createTableDataStructure(newRows));
    // }
    useEffect(() => {
        const {data} = props;
        if (!_.isEmpty(data) && _.isArray(data)) {
            let sorted = _.reverse(_.sortBy(data, "NewDeaths"));
            sorted.map(item => item.open = false)
            setTableData(createTableDataStructure(sorted));
        }
    }, [props.data]);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {tableData.columns.map((column, key) => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.data.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {tableData.columns.map((column) => {
                                        switch (column.id) {
                                            case 'location' :
                                                return (
                                                    <TableCell key={column.id}
                                                               align={column.align}>
                                                        <div>
                                                            <ReactCountryFlag
                                                                className="emojiFlag"
                                                                countryCode={row.CountryCode}
                                                                style={{
                                                                    fontSize: '1.5em',
                                                                    lineHeight: '1em',
                                                                    marginRight: 5
                                                                }}
                                                                aria-label={row.Country}
                                                            />
                                                            {row.Country}
                                                        </div>
                                                    </TableCell>
                                                );
                                            case 'cases' :
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <div
                                                            className={classes.doublePrimary}>{row.TotalConfirmed.toLocaleString()}</div>
                                                        <div>{row.NewConfirmed > 0 && '+'}{row.NewConfirmed.toLocaleString()}</div>
                                                    </TableCell>
                                                );
                                            case 'recovered' :
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <div
                                                            className={classes.doublePrimary}>{row.TotalRecovered.toLocaleString()}</div>
                                                        <div>{row.NewRecovered > 0 && '+'}{row.NewRecovered.toLocaleString()}</div>
                                                    </TableCell>
                                                );
                                            case 'death' :
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <div
                                                            className={classes.doublePrimary}>{row.TotalDeaths.toLocaleString()}</div>
                                                        <div>{row.NewDeaths > 0 && '+'}{row.NewDeaths.toLocaleString()}</div>
                                                    </TableCell>
                                                );
                                        }
                                        // return (
                                        //     <TableCell key={column.id} align={column.align}>
                                        //         {column.format && typeof value === 'number' ? column.format(value) : value}
                                        //     </TableCell>
                                        // );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

function createTableDataStructure(data) {
    const table_rows = data;
    // const ignoreColumns = ["Premium", "Slug", "Date"]
    // _.mapKeys(data[0], (value, key) => {
    //     !_.includes(ignoreColumns, key) && table_column.push({title: key, field: key})
    // });

    // data.map(item => {
    //     if (_.has(item, 'Date') && _.endsWith(item.Date, 'Z')) {
    //         item.Date = moment
    //             .utc(item.Date)
    //             .startOf("seconds")
    //             .fromNow()
    //     }
    //     table_rows.push(_.omit(item, ignoreColumns))
    // });
    return {columns: table_column, data: table_rows}
}

export default connect(mapStateToProps)(ReportTable)