import React, {useEffect, useMemo, useState} from 'react';
import _ from 'lodash';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import {ui} from '../../../constants/config'

const useRowStyles = makeStyles({
    root: {
        width: '100%',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    container: {
        maxHeight: 490,
        overflowY: 'scroll !important'
    },
    tableHead: {
        backgroundColor: '#EEE'
    },
    table: {
        marginTop: 40
    },
    textField: {
        width: 115
    },
    tableCell: {
        display: 'inline-flex',
        alignItems: 'center',
        height: 55
    },
    TableHeadCell: {
        cursor: 'pointer'
    }
});

function Row(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {_.keys(row).map(key => <TableCell align="center"
                                                   style={{
                                                       color: ui.getTextColor(key),
                                                       fontWeight: props.type === 'glob' ? 'bolder' : 'normal'
                                                   }}>{String(row[key].toLocaleString())}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={_.keys(row).length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function createTableDataStructure(data) {
    let table_column = [], table_rows = [];
    const ignoreColumns = ["Premium", "Slug", "CountryCode"]
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


export default function CollapsibleTable(props) {
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
        const sorted = _.sortBy(tableData.data, [by]);
        setTableData(createTableDataStructure(isAsc ? sorted : _.reverse(sorted)));
    }
    useEffect(() => {
        const {data} = props;
        if (!_.isEmpty(data) && _.isArray(data)) {
            setTableData(createTableDataStructure(data));
        }
    }, [props.data]);

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="collapsible table">
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell/>
                                {tableData.columns.map(item => {
                                    if (props.data.length === 1) {
                                        return <TableCell align="center"
                                                          style={{
                                                              color: ui.getTextColor(item.title),
                                                              fontWeight: 'bold'
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
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.data.map((row, index) => (
                                <Row key={index} row={row} type={props.data.length === 1 ? 'glob' : 'countries'}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Table>
        </TableContainer>
    );
}
