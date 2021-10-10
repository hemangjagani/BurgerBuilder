import React from 'react'
import BurgerControl from './BurgerControl/BurgerControl'
import classes from './BurgerConrolers.module.css'

const controls = [
    { label: 'Salad', type: 'Salad' },
    { label: 'Cheese', type: 'Cheese' },
    { label: 'Bacon', type: 'Bacon' },
    { label: 'Meat', type: 'Meat' },
]
function BurgerControlers(props) {
    // console.log(props.purchasable)
    return (
        <div className={classes.BurgerControlers}>
            <p className={classes.priceTag}>Current Price:<em><strong>{props.price}&#8377;</strong></em> </p>
            {controls.map(ctrl => {
                return <BurgerControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    INGREDIENT_PRICE ={props.INGREDIENT_PRICE[ctrl.type]}                    
                />
            })}
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.orderNowClicked}>{props.isAuth?"ORDER NOW":"SIGN UP TO ORDER"
        }</button>
        </div>
    )
}

export default BurgerControlers
