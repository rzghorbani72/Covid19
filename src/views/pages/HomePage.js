import React from "react";
import _ from 'lodash'
import DesktopHomePageContainer from "../containers/desktop/HomePageContainer";
//import MobileHomePageContainer from "../containers/mobile/HomePageContainer";
import withWidth from '@material-ui/core/withWidth';

function HomePage(props) {
    // return _.includes(['md','sm','xs'],props.width) ? <MobileHomePageContainer/> : <DesktopHomePageContainer/>
    return <DesktopHomePageContainer/>
}

export default withWidth()(HomePage)