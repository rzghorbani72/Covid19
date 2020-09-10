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
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TextField from '@material-ui/core/TextField';

import moment from "moment";
import {connect} from 'react-redux'

import {useRowStyles} from './Style'
import {ui} from '../../../constants/config';
import {Row} from './Row'

const mapStateToProps = state => ({
    eachCountryTimeLine: state.eachCountryTimeLine
});

function CollapsibleTable(props) {
    const classes = useRowStyles();
    const [ascending, setAscending] = useState({TotalDeaths: true})
    const [tableData, setTableData] = useState({
        columns: [],
        data: [],
    });
    const filterTableRows = (country) => {
        const regex = new RegExp(`(${country}).*`, "gi");
        setTimeout(() => {
            const filtered = _.filter(props.data, obj => obj.Country.match(regex))
            filtered.map(item => item.open = false)
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
    const openRowCollapse = code => {
        const rowIndex = _.findIndex(tableData.data, {CountryCode: code});
        const newRows = [...tableData.data];
        newRows.map((item, key) => item.open = key === rowIndex)
        setTableData(createTableDataStructure(newRows));
    }
    useEffect(() => {
        const {data} = props;
        if (!_.isEmpty(data) && _.isArray(data)) {
            let sorted = _.reverse(_.sortBy(data, "NewDeaths"));
            sorted.map(item => item.open = false)
            setTableData(createTableDataStructure(sorted));
        }
    }, [props.data]);

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="collapsible table">
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                {tableData.columns.map(item => {
                                    if (item.title !== 'CountryCode') {
                                        if (props.data.length === 1) {
                                            return <TableCell align="center"
                                                              style={{
                                                                  color: ui.getTextColor(item.title),
                                                                  fontWeight: 'bold',
                                                                  fontSize: 16
                                                              }}
                                                              className={classes.TableHeadCell}>{item.title}</TableCell>
                                        } else {
                                            switch (item.title) {
                                                case 'Country':
                                                    return (<TableCell align="center">
                                                        <TextField id="filled-search"
                                                                   label="Search Country"
                                                                   InputProps={{
                                                                       style: {fontSize: 13}
                                                                   }}
                                                                   InputLabelProps={{
                                                                       style: {fontSize: 13}
                                                                   }}
                                                                   className={classes.textField}
                                                                   onChange={(e) => filterTableRows(e.target.value)}
                                                                   type="search"
                                                                   variant="filled"/>
                                                    </TableCell>)
                                                case 'Date' :
                                                    return <TableCell align="center"
                                                                      style={{color: ui.getTextColor(item.title)}}
                                                                      className={classes.TableHeadCell}>LastUpdateDate</TableCell>
                                                default :
                                                    return <TableCell align="center" className={classes.TableHeadCell}
                                                                      style={{color: ui.getTextColor(item.title)}}
                                                                      onClick={() => sortArray(item.title)}>
                                                        <div className={classes.tableCell}><ImportExportIcon
                                                            style={{color: '#b1b3b1'}}/>{item.title}
                                                        </div>
                                                    </TableCell>
                                            }
                                        }
                                    }
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.data.map((row, index) => (
                                <Row
                                    openRowCollapse={openRowCollapse}
                                    key={index} {...props} row={row}
                                    type={props.data.length === 1 ? 'glob' : 'countries'}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Table>
        </TableContainer>
    );
}

function createTableDataStructure(data) {
    let table_column = [], table_rows = [];
    const ignoreColumns = ["Premium", "Slug"]
    _.mapKeys(data[0], (value, key) => {
        !_.includes(ignoreColumns, key) && table_column.push({title: key, field: key})
    });

    data.map(item => {
        if (_.has(item, 'Date') && _.endsWith(item.Date, 'Z')) {
            item.Date = moment
                .utc(item.Date)
                .startOf("seconds")
                .fromNow()
        }
        table_rows.push(_.omit(item, ignoreColumns))
    });
    return {columns: table_column, data: table_rows}
}

export default connect(mapStateToProps)(CollapsibleTable)