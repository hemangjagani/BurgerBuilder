import React, { useState,useEffect } from 'react'
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from '../Order/ContactData/ContactData.module.css'
import * as action from '../../Store/action/indexAction';
import {connect} from 'react-redux'
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility'

const  Auth = props =>{
    const [controls,setControls] = useState({
            email: {
                inputtype: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail Address'
                },
                value: '',
                validation:
                {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
                errorMessage: '',
            },
            password: {
                inputtype: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation:
                {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false,
                errorMessage: '',
            },
        })

    const [isSignUp,setIsSignUp] = useState(true)
    const [formIsValid,setFormIsValid] = useState(true)
    
    useEffect(()=>{
        if(!props.buildingBurger && props.authRedirectPath !== '/')
        {
            props.onSetAuthRedirectPath()
        }        
    },[])
    
 
   
   const  inputChangedHandler = (event, controlName) => {

        const updateControls = updateObject(controls,{
            [controlName]:updateObject(controls[controlName],
                {value:event.target.value,
                    valid: checkValidity(event.target.value, controls[controlName].validation),
                    touched:true
                })
        })

        let formIsValid = true;
        for(let key in updateControls)
        {
            formIsValid = updateControls[key].valid && formIsValid
        }
        setControls(updateControls)
        setFormIsValid(formIsValid)
                
    }
    const submitHandler =(event)=>
      {
      event.preventDefault();
      props.onAuthInit(controls.email.value,controls.password.value,isSignUp)
    }
    
   const  authChangeHandler = ()=>{
       setIsSignUp(!isSignUp)
    }
           
        const formElementArray = [];
        for (let key in controls) {
            formElementArray.push(
                { id: key, config: controls[key] }
            )
        }

        let form = formElementArray.map(element => {
            return (
                <Input key={element.id}
                    inputtypes={element.config.inputtype}
                    elementconfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldvalidate={element.config.validation}
                    touched={element.config.touched}
                    valuetype={element.id}
                    // formIsValid={!this.state.formIsValid}
                    errormessage={element.config.errorMessage}
                    changed={(event) => inputChangedHandler(event, element.id)}
                />
            )
        })
        if(props.ShowLoading)
        {
            form = <Spinner/>
        }
        if(props.error)
        {
            var errorMessage = <p>{props.error.message}</p>
        }
        let authRedirect = null;
        if(props.isAutheticated)
        {
            authRedirect = <Redirect to={props.authRedirectPath}/>
        }
        return (
            <div className={classes.ContactData}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!formIsValid}>Submit</Button>
                </form>
                    <Button btnType="Danger" clicked={authChangeHandler}> SWITCH TO {isSignUp? "SIGNIN" : "SIGNUP"} </Button>
            </div>
        )

    
}

const mapStateToProps = state=>{
    return{
        ShowLoading: state.auth.ShowLoading,
        error:state.auth.error,
        isAutheticated: state.auth.token!=null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
} 

const mapDispatchToProps =(dispatch)=>{
    return{
   onAuthInit:(email,password,isSignUp)=>dispatch(action.AUTH_SEND(email,password,isSignUp)),
   onSetAuthRedirectPath:()=>dispatch(action.auth_set_redirect_path('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);