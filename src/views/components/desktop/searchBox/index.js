import React, {useEffect, useState} from 'react'
import AsyncSelect from 'react-select/async';
import _ from 'lodash';
import {fetchEachCountryTimeLineData} from "../../../../stores/timeLine/country/actions";

export function Search(props) {

    const [searchData, setSearchData] = useState([])
    const renderChartOfCountry = (code) => {
        const {dispatch} = props;
        dispatch(fetchEachCountryTimeLineData(code));
    }
    useEffect(() => {
        const {data} = props;
        if (!_.isEmpty(data)) {
            let search_list = [];
            data.map(item => search_list.push({
                value: item.CountryCode,
                label: item.Country
            }));
            setSearchData(search_list);
        }
    }, [props.data]);

    const searchUsers = async (inputValue) => {
        const regex = new RegExp(`(${inputValue}).*`, "gi");
        if (!_.isEmpty(props.data)) {
            const filtered = _.filter(props.data, obj => obj.Country.match(regex))
            let sorted = _.sortBy(filtered, "NewDeaths");
            let search_list = [];
            sorted.map(item => search_list.push({
                value: item.CountryCode,
                label: item.Country
            }));
            return search_list
        } else {
            return [];
        }
    }

    const promiseOptions = (inputValue) => new Promise(resolve => setTimeout(() => resolve(searchUsers(inputValue)), 500));

    return <AsyncSelect
        placeholder={<div>Type to search</div>}
        noOptionsMessage={() => 'search countries'}
        formatCreateLabel={() => `nothing found`}
        cacheOptions
        defaultOptions={searchData}
        loadOptions={promiseOptions}
        onChange={code => renderChartOfCountry(code.value)}/>
}
