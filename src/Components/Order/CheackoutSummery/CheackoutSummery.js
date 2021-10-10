import React from 'react'
import classes from './CheackoutSummery.module.css'
import Button from '../../UI/Button/Button'
import Burger from '../../Burger/Burger'


function CheackoutSummery(props) {
   
    return (
        <div className={classes.CheackoutSummery}>
            <h1>This Burger is not broken like you...xD</h1>
            <div style={{height:"300px",width:"100",margin:"auto"}}>
                <Burger style={{height:'500px'}} ingredient={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.cancelOrderHandler}>Cancel</Button>
            <Button btnType="Success" clicked={props.confirmOrderHandler}>Continue</Button>
        </div>
    )
}

export default CheackoutSummery
