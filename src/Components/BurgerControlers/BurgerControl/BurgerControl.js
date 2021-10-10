import React from 'react'
import classes from './BurgerControl.module.css'

function BurgerControl(props) {
    return (
        <div className={classes.BurgerControl}>
            <div className={classes.Label}>{props.label}({props.INGREDIENT_PRICE}&#8377;)</div>
            <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>-</button>
            <button className={classes.More} onClick={props.added}>+</button>
        </div>
    )
}

export default BurgerControl
