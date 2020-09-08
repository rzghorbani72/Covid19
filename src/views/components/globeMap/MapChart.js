import React, {memo, useEffect, useState} from "react";
import {
    // ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import {connect} from 'react-redux';
import geoUrl from '../../../constants/map.json'
import _ from "lodash";
import {fetchSummaryData} from "../../../stores/summary/actions";
// const geoUrl =
//     "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100) / 10 + "K";
    }
};
const toolTipCreator = (obj) =>{
    const info = _.isEmpty(obj) ? 'No Data' : `NewDeaths : ${obj.NewDeaths.toLocaleString()}`
    return info
}
const MapChart = (props) => {
    const {setTooltipContent} = props;
    const [countriesStats, setCountriesStats] = useState({});
    useEffect(() => {
        const {dispatch, summary} = props;
        if (!summary.loading) {
            if (_.isEmpty(summary.data)) dispatch(fetchSummaryData())
            else summary.data !== countriesStats && setCountriesStats(summary.data.Countries)
        }
    }, [props.summary.data]);
    const getCountryDetails = (country_name=null) => {
        if(!_.isEmpty(country_name)) {
            const foundCountry = _.find(countriesStats, {Country: country_name})
            if (!_.isEmpty(foundCountry)) {
                return toolTipCreator(foundCountry)
            } else {
                const regex = new RegExp(`(${country_name}).*`, "gi");
                const filtered = _.filter(countriesStats, obj => obj.Country.match(regex))
                if(!_.isEmpty(filtered)){
                    return toolTipCreator(foundCountry)
                }else{
                    return toolTipCreator(null)
                }
            }
        }
    }
    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{scale: 150}}>
                {/*<ZoomableGroup>*/}
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    const {NAME, POP_EST} = geo.properties;
                                    // setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                                    setTooltipContent(`${NAME} — ${getCountryDetails(NAME)}`);
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}
                                style={{
                                    default: {
                                        fill: "#fff3e0",
                                        outline: "none"
                                    },
                                    hover: {
                                        fill: "#F53",
                                        outline: "none"
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: "none"
                                    }
                                }}
                            />
                        ))
                    }
                </Geographies>
                {/*</ZoomableGroup>*/}
            </ComposableMap>
        </>
    );
};
const mapStateToProps = state => ({
    summary: state.summary
})
export default connect(mapStateToProps)(memo(MapChart));
