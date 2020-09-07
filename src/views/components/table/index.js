import React, {useEffect, useState} from 'react';
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
import moment from "moment";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tableHead:{
        backgroundColor:'#EEE'
    },
    table:{
        marginTop:40
    }
});

function createData(row) {
    return {...row}
}

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
                {_.keys(row).map(key => <TableCell align="center">{String(row[key])}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={_.keys(row).length+1}>
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

export default function CollapsibleTable(props) {
    const classes = useRowStyles();
    const [tableData, setTableData] = useState({
        columns: [],
        data: [],
    });

    useEffect(() => {
        let table_column = [], table_rows = [];
        const {data} = props;
        if (!_.isEmpty(data) && _.isArray(data)) {

            _.mapKeys(data[0], (value, key) => {
                !_.includes(["Premium","Slug"], key) && table_column.push({title: key, field: key})
            });

            data.map(item => {
                if (_.has(item, 'Date')) {
                    item.Date = moment
                        .utc(item.Date)
                        .local()
                        .startOf("seconds")
                        .fromNow()
                }
                createData(_.omit(item, ["Premium","Slug","CountryCode"]))
                table_rows.push(_.omit(item, ["Premium","Slug"]))
            });
            setTableData({columns: table_column, data: table_rows});
        }
    }, [props.data]);

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="collapsible table">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell/>
                        {tableData.columns.map(item => <TableCell align="center">{item.title}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.data.map((row, index) => (
                        <Row key={index} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
