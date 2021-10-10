import React, { useState } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../Components/UI/Button/Button'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'
import axios from '../../../axios-order'
import {connect} from 'react-redux';
import * as action from '../../../Store/action/indexAction'
import withErrorHandler from '../../../Hoc/withErrorHandler/withErrorHandler'
import {updateObject,checkValidity } from '../../../shared/utility';

const ContactData = props =>{
    const [orderForm, setOrderForm] = useState({
            name: {
                inputtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:
                {
                    required:true
                },
                valid:false,
                touched:false,
                errorMessage: '',
            },
            street: {
                inputtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation:
                {
                    required:true
                },
                valid:false,
                touched:false,
                errorMessage: '',
            },
            country: {
                inputtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:
                {
                    required:true
                },
                valid:false,
                touched:false,
                errorMessage: '',
            },
            zipcode: {
                inputtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '',
                validation:
                {
                    required:true,
                    minLength: true,
                    maxLength: true,
                    isNumeric:true,
                },
                valid:false,
                touched:false,
                errorMessage: '',
            },
            email: {
                inputtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation:
                {
                    required:true,
                    isEmail:true,
                },
                valid:false,
                touched:false,
                errorMessage: '',
            },
            deliveryMethod: {
                inputtype: 'select',
                elementConfig: {
                    option: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }],
                },
                value:'fastest',
                validation:{},
                valid:true,
                errorMessage: '',
            }
        })
    const [formIsValid,setFormIsValid] = useState(false)
    
  const  orderClickedHandler = (event) => {
        event.preventDefault();
        const formData={};
        for(let key in orderForm)
        {
            formData[key]= orderForm[key].value;
        }
        const order = {
            ingredient: props.ing,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderInit(order,props.token)
    }



 const    inputChangedHandler=(event,inputIdentifier)=>{
      const updatedFormElement= updateObject(orderForm[inputIdentifier],{
           value:event.target.value,
           valid: checkValidity(event.target.value,orderForm[inputIdentifier].validation),
           touched:true
       })
     const  updatedOrderForm = updateObject(orderForm,{[inputIdentifier]:updatedFormElement})
        let formIsValid = true;
        for(let key in updatedOrderForm)
        {
            formIsValid = updatedOrderForm[key].valid && formIsValid
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
            
        // console.log("value = " + this.state.orderForm[inputIdentifier].value)
    }

  
        const formElementArray = [];
        for (let key in orderForm) {
            formElementArray.push({ id: key, config: orderForm[key] })
        }
        let form = (<form onSubmit={orderClickedHandler}>

            {formElementArray.map(element => {
                return <Input key={element.id} 
                inputtypes={element.config.inputtype} 
                elementconfig={element.config.elementConfig} 
                value={element.config.value} 
                invalid={!element.config.valid}
                shouldvalidate={element.config.validation}
                touched={element.config.touched}
                valuetype ={element.id}
                // formIsValid={!this.state.formIsValid}
                errormessage={element.config.errorMessage}
                changed={(event)=>inputChangedHandler(event,element.id)}
                />
            })}
        
            <Button btnType="Success" disabled={!formIsValid}>Order</Button>
        </form>);
        if (props.showLoading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        )
    
}

const mapStateToProps =(state)=>{
    return{
        ing:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalPrice,
        showLoading:state.order.showLoading,
        token:state.auth.token,
        userId: state.auth.userId     
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        onOrderInit: (order,token)=>dispatch(action.purchaseBurgerStart(order,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));