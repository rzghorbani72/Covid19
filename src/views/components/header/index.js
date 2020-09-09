import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 100,
        color:'#FFF',
        backgroundColor: '#689F38',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        borderBottom:'3px solid #FFC107'
    },
    head:{
        fontSize:40
    }
});
export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1 className={classes.head}>Let's All Wear a Mask</h1>
        </div>
    )
}