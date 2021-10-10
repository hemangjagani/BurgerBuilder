import React from 'react'
import  classes from './ToolBar.module.css'
import Logo from '../../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToogleDrawer from '../SideDrawer/ToogleDrawer/ToogleDrawer'
import PropTypes from 'prop-types'

function ToolBar(props) {
    return (
        <header className={classes.ToolBar}>
            <ToogleDrawer clicked={props.toogleDrawerClicked}/>
            <Logo />
            <div className={classes.displayOnly}>
            <NavigationItems /> 
            </div>
        </header>
    )
}
ToolBar.propTypes={
    toogleDrawerClicked:PropTypes.func
}

export default ToolBar
