import React, { useState,useEffect } from 'react'
import Aux from '../../Hoc/Auxilary/Auxilary'
import Burger from '../../Components/Burger/Burger'
import BurgerControlers from '../../Components/BurgerControlers/BurgerControlers';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummery from '../../Components/Burger/OrderSummery/OrderSummery';
// import axios from '../../axios-order'
import axios from 'axios';  
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
// import * as actionTypes from '../../Store/action/actionsTypes'
import * as action from '../../Store/action/indexAction'

export const  BurgerBuilder = props =>{
    // const [purchasable,setPurchasable] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [showLoading,setShowLoding] = useState(false)
      
    useEffect(()=> {
        setShowLoding(true)
        props.onSetIngredient();
        setShowLoding(false)
    },[])
   
   const updatePurchaseState = (ingredients)=> {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0 ;
    }

    const orderToModelHandler = () => {
        if(props.isAuthenticated)
        {
            // setPurchasable(true)
            setShowModal(true)
        }
        else{
            props.onSetAuthRedirectPath('/checkout')
           props.history.push('/auth')
        }
    }
  const  modelToOrderHandler = () => {
        setShowModal(false)
        
    }

  const  OrderConfirmHandler = () => {
               
        const queryParams =[];
        for(let i in props.ingredient)
        {
           queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(props.ingredient[i]))
        }
        queryParams.push('price='+ props.totalPrice)
        const queryString = queryParams.join('&');
          props.history.push({
          pathname:'/checkout',
          search : '?' + queryString
          
        })
        props.onInitPuchased()
    }
  const  OrderCancledHandler = () => {
        setShowModal(false)
        // setPurchasable(false)
    }

        const disableInfo = {
            ...props.ing
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummery =null;
        let burger = props.error? <p>Something went wrong!!!</p> :<Spinner/>;
        
        if (props.ing) {
            burger = (<Aux>
                <Burger ingredient={props.ing} />
                <BurgerControlers
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disableInfo}
                    price={props.price}
                    INGREDIENT_PRICE={props.INGREDIENT_PRICE}
                    purchasable={updatePurchaseState(props.ing)}
                    orderNowClicked={orderToModelHandler}
                    isAuth={props.isAuthenticated}
                />
             </Aux>
            )
            orderSummery=  <OrderSummery totalPrice={props.price}
                  ingredient={props.ing}
                  OrderConfirmHandler={OrderConfirmHandler}
                  OrderCancledHandler={OrderCancledHandler} />
                 
        }
        if (showLoading) {
            orderSummery = <Spinner />
        }
        

        return (
            <Aux>
                <Modal showModal={showModal} modelToOrderHandler={modelToOrderHandler}>
                    {orderSummery}
                </Modal>
                {burger}

            </Aux>
        )
    
}

const mapStateToProps =(state)=>{
    return{
        ing:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalPrice,
        INGREDIENT_PRICE:state.burgerBuilder.INGREDIENT_PRICE,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token!=null
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onIngredientAdded: (igName)=> dispatch(action.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(action.removeIngredient(igName)),
        onSetIngredient: ()=> dispatch( action.initIngredient()),
        onInitPuchased: ()=> dispatch(action.PURCHASED_ORDER()),
        onSetAuthRedirectPath : (path)=>dispatch(action.auth_set_redirect_path(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
