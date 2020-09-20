import React from "react";
import {useStyles} from './Style'

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.wrapFooterText}><span>developed by </span>
                <h2 className={classes.name}>
                    <a href="https://gitconnected.com/rzghorbani72/resume"> Reza
                        Ghorbani</a>
                </h2>
            </div>
        </div>
    )
}