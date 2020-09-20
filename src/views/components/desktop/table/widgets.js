import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import PublicSharpIcon from "@material-ui/icons/PublicSharp";
import ReactCountryFlag from "react-country-flag";
import {fetchEachCountryTimeLineData} from '../../../../stores/timeLine/actions';
import React from "react";

export function tableColumnsGenerator(tableData) {
    return tableData.columns.map((column, key) => {
        return (
            <TableCell
                key={column.id}
                align={column.align}
                style={{minWidth: column.minWidth}}
            >
                {column.label}
            </TableCell>
        )
    })
}

export function tableRowsGenerator(props) {
    const {tableData, classes, glob} = props
    const renderChartOfCountry = (code) => {
        const {dispatch} = props;
        dispatch(fetchEachCountryTimeLineData(code));
    }
    return tableData.data.map((row) => {
        return (
            <TableRow hover tabIndex={-1}>
                {tableData.columns.map((column) => {
                    switch (column.id) {
                        case 'location' :
                            return (
                                <TableCell key={column.id}
                                           onClick={()=>renderChartOfCountry(row.CountryCode)}
                                           className={glob ? classes.globeRow : {}}
                                           align={column.align}>
                                    <div>
                                        {row.Country === 'world wide' ?
                                            <PublicSharpIcon fontSize='small' style={{margin: 5}}/>
                                            :
                                            <ReactCountryFlag
                                                className="emojiFlag"
                                                countryCode={row.CountryCode}
                                                style={{
                                                    fontSize: '1.5em',
                                                    lineHeight: '1em',
                                                    marginRight: 5
                                                }}
                                                aria-label={row.Country}
                                            />}
                                        {row.Country === 'world wide' ?
                                            <span style={{fontWeight: 'bolder'}}>world wide</span> : row.Country}
                                    </div>
                                </TableCell>
                            );
                        case 'cases' :
                            return (
                                <TableCell key={column.id} align={column.align}
                                           className={glob ? classes.globeRow : {}}>
                                    <div
                                        className={classes.doublePrimary}>{row.TotalConfirmed.toLocaleString()}</div>
                                    <div>{row.NewConfirmed > 0 && '+'}{row.NewConfirmed.toLocaleString()}</div>
                                </TableCell>
                            );
                        case 'recovered' :
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    <div style={{color: glob ? "white" : "#558B2F"}}
                                         className={classes.doublePrimary}>{row.TotalRecovered.toLocaleString()}</div>
                                    <div
                                        style={{color: glob ? "white" : "#558B2F"}}>{row.NewRecovered > 0 && '+'}{row.NewRecovered.toLocaleString()}</div>
                                </TableCell>
                            );
                        case 'death' :
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    <div style={{color: glob ? "white" : "#FF5722"}}
                                         className={classes.doublePrimary}>{row.TotalDeaths.toLocaleString()}</div>
                                    <div
                                        style={{color: glob ? "white" : "#FF5722"}}>{row.NewDeaths > 0 && '+'}{row.NewDeaths.toLocaleString()}</div>
                                </TableCell>
                            );
                    }
                })}
            </TableRow>
        );
    })
}