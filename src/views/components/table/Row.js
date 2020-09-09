import React, {useEffect, useState} from "react";
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

export function Row(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState(null)
    const classes = useRowStyles();
    const fetchCountryChart = (code) => {
        const {dispatch} = props
        setOpen(!open)
        if(open){
            setSelectedCountryCode(code)
            dispatch(fetchEachCountryTimeLineData(code));
        }
    }
    useEffect(() => {
        const {eachCountryTimeLine} = props
        if (!eachCountryTimeLine.loading && !_.isEmpty(eachCountryTimeLine.data)) {
            if (eachCountryTimeLine.data[0]['CountryCode'] === selectedCountryCode) renderChart(eachCountryTimeLine.data, selectedCountryCode)
        }
    }, [props.eachCountryTimeLine]);

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => fetchCountryChart(row.CountryCode)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {_.keys(row).map(key => {
                    if (key !== 'CountryCode') {
                        return (<TableCell align="center"
                                           style={{
                                               color: ui.getTextColor(key),
                                               fontWeight: props.type === 'glob' ? 'bolder' : 'normal',
                                               fontSize: props.type === 'glob' ? 25 : 13
                                           }}>{String(row[key].toLocaleString())}</TableCell>
                        )
                    }
                })}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={_.keys(row).length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div id={`Report_Chart_${row.CountryCode}`}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}