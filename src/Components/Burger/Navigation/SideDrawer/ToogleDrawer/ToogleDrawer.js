import React from 'react'
import classes from './ToogleDrawer.module.css'
function ToogleDrawer(props) {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default ToogleDrawer
