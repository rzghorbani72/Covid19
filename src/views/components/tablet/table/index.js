import React, {useEffect, useState} from 'react';
import _ from 'lodash';

import {connect} from 'react-redux'
const mapStateToProps = state => ({
    eachCountryTimeLine: state.eachCountryTimeLine
});

const DataTable = (props) =>{
    return(<div/>)
}
export default connect(mapStateToProps)(DataTable)