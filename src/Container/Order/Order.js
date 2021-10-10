import React, {  } from 'react'
import CheackoutSummery from '../../Components/Order/CheackoutSummery/CheackoutSummery'
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import ContactData from './ContactData/ContactData'

const order = (props)=> {   

    const orderCancledHandler = () => {
        props.history.push('/');
    }
    const orderConfirmedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }
  
        let summery = <Redirect to="/" />
        if(props.ing){
            const purchasedRedirect = props.purchased?<Redirect to='/'/>:null;
            summery=(
                <div>
                    {purchasedRedirect}
                <CheackoutSummery ingredients={props.ing}
                    cancelOrderHandler={orderCancledHandler}
                    confirmOrderHandler={orderConfirmedHandler} />
                <Route path={props.match.path + '/contact-data'} component={ContactData}/>
            </div>
            )
        }
        return summery;
    
}

const mapStateToProps =(state)=>{
    return{
        ing:state.burgerBuilder.ingredient,
        purchased:state.order.purchased
    }
} 

export default connect(mapStateToProps)(order)
