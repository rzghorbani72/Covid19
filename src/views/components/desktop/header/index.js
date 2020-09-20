import React from "react";
import {useStyles} from './Style';

export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1 className={classes.head}>Let's All Wear a Mask</h1>
        </div>
    )
}