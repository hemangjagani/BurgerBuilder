import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { isAuthor } from '../../../../Hoc/Layout/Layout'

function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            
            <NavigationItem links='./' exact>BurgerBuilder</NavigationItem>
            
            <isAuthor.Consumer>
                {(isAuthor) => {
                    return ((!isAuthor)? 
                    <NavigationItem exact links='./auth'>Authentication</NavigationItem>:
                    <>
                    <NavigationItem exact links='./orders'>Orders</NavigationItem> 
                    <NavigationItem exact links='./logout'>Logout</NavigationItem>
                    </>)
                }
                }
            </isAuthor.Consumer>

        </ul>
    )
}

export default NavigationItems
