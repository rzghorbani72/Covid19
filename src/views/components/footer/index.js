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
        borderTop:'2px solid #FFC107'
    },
    name:{
        color:'#FFEA00',
        fontSize:17,
        margin:'0px 3px'
    },
    email:{
        color:'#FFF',
        fontSize:14
    },
    wrapFooterText:{
        display:'flex',
        flexDirection:'row',
        marginTop:10
    }
});
export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.wrapFooterText}><span>developed by </span><h2 className={classes.name}> Reza Ghorbani</h2></div>
            <div className={classes.wrapFooterText}><span>LinkedIn : </span><a href="https://www.linkedin.com/in/reza-ghorbani-a59196116/" className={classes.name}>reza-ghorbani-a59196116</a></div>
        </div>
    )
}