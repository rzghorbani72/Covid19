import React, {memo, useEffect, useState} from "react";
import {
    // ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import {connect} from 'react-redux';
import geoUrl from '../../../../constants/map.json'
import _ from "lodash";
import {fetchSummaryData} from "../../../../stores/summary/actions";
// const geoUrl =
//     "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const toolTipCreator = (obj) => {
    return _.isEmpty(obj) ? 'No Data' : `[NewDeaths: ${obj.NewDeaths.toLocaleString()} ]  [NewCase: ${obj.NewConfirmed.toLocaleString()} ]`
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
    const getCountryDetails = (country_code = null) => {
        if (!_.isEmpty(country_code)) {
            const foundCountry = _.find(countriesStats, {CountryCode: country_code})
            if (!_.isEmpty(foundCountry)) {
                return toolTipCreator(foundCountry)
            } else {
                return toolTipCreator(null)
            }
        }
    }
    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{scale: 150}}>
                {/*<ZoomableGroup>*/}
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map(geo => {
                                const {NAME, ISO_A2} = geo.properties;

                                return (<Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        // setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                                        setTooltipContent(`${NAME} — ${getCountryDetails(ISO_A2)}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#607D8B",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#CDDC39",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#8BC34A",
                                            outline: "none"
                                        }
                                    }}
                                />)
                            }
                        )
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
