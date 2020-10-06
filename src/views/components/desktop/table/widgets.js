import React, {useEffect, useMemo, useState} from "react";
import _ from 'lodash';

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import PublicSharpIcon from "@material-ui/icons/PublicSharp";
import ReactCountryFlag from "react-country-flag";
import {fetchEachCountryTimeLineData} from '../../../../stores/timeLine/country/actions';
import Skeleton from "@material-ui/lab/Skeleton";
import {fetchTotalTimeLineData} from "../../../../stores/timeLine/total/actions";

export function TableColumnsGenerator(tableData) {
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

export function TableLoadingRowsGenerator() {
    return Array.from(new Array(2)).map((row, key) => {
        return (
            <TableRow tabIndex={-1} key={key}>
                <TableCell>
                    <Skeleton animation="wave" height={100} width="100%"/>
                </TableCell>
                <TableCell>
                    <Skeleton animation="wave" height={100} width="100%"/>
                </TableCell>
                <TableCell>
                    <Skeleton animation="wave" height={100} width="100%"/>
                </TableCell>
                <TableCell>
                    <Skeleton animation="wave" height={100} width="100%"/>
                </TableCell>
            </TableRow>
        );
    });
}

export function TableRowsGenerator(props) {
    const {tableData, classes, glob} = props;
    const renderChartOfCountry = (code) => {
        const {dispatch} = props;
        dispatch(fetchEachCountryTimeLineData(code));
    }
    const getWorldTimeLine = () => {
        const {dispatch} = props
        dispatch(fetchTotalTimeLineData())
    }
    return !_.isEmpty(tableData.data) && tableData.data.map((row,key) => {
        return (
            <TableRow hover tabIndex={-1} key={key}>
                {tableData.columns.map((column) => {
                    switch (column.id) {
                        case 'location' :
                            return (
                                <TableCell key={column.id}
                                           className={glob ? classes.globeRow : {}}
                                           align={column.align}>
                                    <div>
                                        {row.Country === 'world wide' ?
                                            <PublicSharpIcon fontSize='small' style={{margin: 5}}
                                                             onClick={getWorldTimeLine}/>
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
                                            <a onClick={getWorldTimeLine} className={classes.worldActive}>world
                                                wide</a> : <a onClick={() => renderChartOfCountry(row.CountryCode)}
                                                              className={classes.active}>{row.Country}</a>}
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