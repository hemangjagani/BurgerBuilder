import React, { Component } from 'react'
import Button from '../../UI/Button/Button'


class OrderSummery extends Component{
    
    render(){
        const ingredientSummery = Object.keys(this.props.ingredient).map((igkey)=>{
            return <li key={igkey}><b>{igkey}</b> : {this.props.ingredient[igkey]}</li>
        })
        return(
            <div>
            <h3><u>Your Order</u></h3>
            <p>Items List:</p>
            <ul style={{ listStyleType: 'circle'}}>
            {ingredientSummery}
            </ul>
            <p><strong>Total Price: {this.props.totalPrice} &#8377;</strong></p>
            <p>Checkout and Confirm order just click here</p>
            <Button btnType='Danger'clicked={this.props.OrderCancledHandler}>CANCLE</Button>
            <Button btnType='Success'clicked={this.props.OrderConfirmHandler}>CONFIRM</Button>
           
            
        </div>
        )
    }
}

export default OrderSummery
