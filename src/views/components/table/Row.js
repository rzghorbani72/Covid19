import React, {useEffect, useState, useMemo} from "react";
import {useRowStyles} from "./Style";
import {fetchEachCountryTimeLineData} from "../../../stores/eachCountryTimeLine/actions";
import _ from "lodash";
import {renderChart} from "./ChartRenderer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {ui} from "../../../constants/config";
import Collapse from "@material-ui/core/Collapse";
import CircularProgress from '@material-ui/core/CircularProgress';

export function Row(props) {
    const {row, openRowCollapse} = props;
    const [currentRow, setCurrentRow] = useState()
    const [open, setOpen] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState(null)
    const classes = useRowStyles();
    const fetchCountryChart = (code) => {
        openRowCollapse(code);
    }
    useMemo(() => {
        const {dispatch} = props
        setCurrentRow(row)
        if (row.open) {
            setSelectedCountryCode(row.CountryCode)
            dispatch(fetchEachCountryTimeLineData(row.CountryCode));
        }
    }, [row]);
    useEffect(() => {
        const {eachCountryTimeLine} = props;
        setLoading(eachCountryTimeLine.loading);
        if (!eachCountryTimeLine.loading && !_.isEmpty(eachCountryTimeLine.data)) {
            if (_.isEmpty(eachCountryTimeLine.data)) {
                setOpen(false)
            } else {
                if (eachCountryTimeLine.data[0]['CountryCode'] === selectedCountryCode) renderChart(eachCountryTimeLine.data, selectedCountryCode)
            }
        }
    }, [props.eachCountryTimeLine]);

    return (
        <React.Fragment>
            {!_.isEmpty(currentRow) &&
            <>
                <TableRow className={classes.root}>
                    {props.type === 'glob' ?
                        <TableCell/>
                        :
                        <TableCell className={classes.rowCursor}>
                            <IconButton aria-label="expand row" size="small"
                                        onClick={() => fetchCountryChart(currentRow.CountryCode)}>
                                {currentRow.open ?
                                    <KeyboardArrowUpIcon style={{color: '#E91E63'}}/> :
                                    <KeyboardArrowDownIcon style={{color: '#E91E63'}}/>}
                            </IconButton>
                        </TableCell>}
                    {_.keys(currentRow).map((key, index) => {
                        if (!_.includes(['CountryCode', 'open'], key)) {
                            return (<TableCell key={index} align="center"
                                               style={{
                                                   color: ui.getTextColor(key),
                                                   fontWeight: props.type === 'glob' ? 'bolder' : 'normal',
                                                   fontSize: props.type === 'glob' ? 25 : 13
                                               }}>{String(currentRow[key].toLocaleString())}</TableCell>
                            )
                        }
                    })}
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={_.keys(currentRow).length + 1}>
                        <Collapse in={currentRow.open} timeout="auto" unmountOnExit>
                            <div className={classes.loading}> {loading && <CircularProgress/>}</div>
                            <div id={`Report_Chart_${currentRow.CountryCode}`}/>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
            }
        </React.Fragment>
    );
}