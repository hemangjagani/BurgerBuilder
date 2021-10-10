import React from 'react'
import classes from './Order.module.css'
import Button from '../UI/Button/Button';

function Order(props) {
    const ingredients=[];
    for(let ingredientName in props.ingredients)
    {
        ingredients.push({
            name :ingredientName,
            amount: props.ingredients[ingredientName],
        })
    }
    const ingredientOutput = ingredients.map(ig=>{
        return (<span key={ig.name} style={{textTransform:"capitalize" 
                                            , display: "inline-block" 
                                            , marginLeft:"10px"
                                            ,padding: "5px"
                                            ,boxShadow: "0 2px 3px #eee"
                                        , border: '1px solid #ccc' }}>{ig.name}({ig.amount})<br/></span>)
    })
    return (
        <div className={classes.Order}>
            <p>Ingredient: {ingredientOutput}</p>
            <p>Price:<strong>{props.price} &#8377;</strong></p>
            <Button btnType="Danger" clicked={props.clicked}>Delete</Button>
        </div>
    )
}

export default Order
