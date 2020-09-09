import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {makeStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import {connect} from 'react-redux'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {fetchEachCountryTimeLineData} from '../../../stores/eachCountryTimeLine/actions'
import {ui} from '../../../constants/config';

am4core.useTheme(am4themes_myTheme);

function am4themes_myTheme(target) {
    if (target instanceof am4core.ColorSet) {
        target.list = [
            am4core.color("#F06292")
        ];
    }
}

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

function renderChart(values, code) {
    let chart = am4core.create(`Report_Chart_${code}`, am4charts.XYChart);
    chart.data = values;
    chart.logo.height = -15000
    chart.svgContainer.htmlElement.style.height = '300px'

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.startLocation = 0.5;
    dateAxis.renderer.minGridDistance = values.length;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Configure axis label
    let label = dateAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 200;
    label.fontSize = 11;
    label.tooltipText = "{Date}";

    dateAxis.events.on("sizechanged", function (ev) {
        let axis = ev.target;
        let cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
        if (cellWidth < axis.renderer.labels.template.maxWidth) {
            axis.renderer.labels.template.rotation = -45;
            axis.renderer.labels.template.horizontalCenter = "right";
            axis.renderer.labels.template.verticalCenter = "middle";
        } else {
            axis.renderer.labels.template.rotation = 0;
            axis.renderer.labels.template.horizontalCenter = "middle";
            axis.renderer.labels.template.verticalCenter = "top";
        }
    });


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = _.maxBy(values, 'Deaths').Deaths;
    valueAxis.autoGridCount = true;
    valueAxis.gridCount = values.length;
    valueAxis.tooltip.disabled = true;
    valueAxis.gridCount = values.length;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "Date";
    series.name = "Deaths";
    series.dataFields.valueY = "Deaths";
    series.tooltipText = "{date}\n[bold font-size: 14px]value: {valueY}[/]";
    series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value}</b>";
    series.tooltipText = "[#000]{valueY.value}[/]";
    series.tooltip.background.fill = am4core.color("#FFF");
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.strokeWidth = 3;
    series.tooltip.getFillFromObject = false;
    series.fillOpacity = 0.2;
    series.strokeWidth = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.fontSize = 11
    chart.legend.useDefaultMarker = true;
    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.width = 17;
    marker.height = 17;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
}

const mapStateToProps = state => ({
    eachCountryTimeLine: state.eachCountryTimeLine
});
export default connect(mapStateToProps)(CollapsibleTable)