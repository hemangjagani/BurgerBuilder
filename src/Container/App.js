import React,{ useEffect,Suspense } from 'react';
import './App.module.css';
import Layout from '../Hoc/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
// import Auth from '../Container/Auth/Auth'
import { connect } from 'react-redux';
import * as actions from '../Store/action/indexAction'

const Checkout = React.lazy(()=>import('./Order/Order'))
 

const MainOrder = React.lazy(()=> import('./MainOrder/MainOrder'))

const Logout = React.lazy(()=> import('./Auth/Logout/Logout'))
 
const Auth = React.lazy(()=>import('../Container/Auth/Auth'))


const App = props => {

  useEffect(()=>{
    function tryauto(){
      props.onTryAutoSignup()
      console.log("helo")
    }
    tryauto()
  },[props])

  let routes = (
    <Switch>
      <Route path ='/auth' component={Auth}/>
      <Route path = '/' component={BurgerBuilder}/>
      <Redirect to="/" />
    </Switch>
  )
  if(props.isAuthenticated)
  {
    routes = (
      <Switch>        
        <Route path ='/checkout' component={Checkout}/>
        <Route path='/orders' component={MainOrder}/>
        <Route path='/logout' component={Logout}/>
        <Route path ='/auth' component={Auth}/>
        <Route path='/' component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )
  }
  
return (
  <div>
    <Layout>  
      <Suspense fallback={<div>Loading...</div>}> 
      {routes}
      </Suspense>
    </Layout>
  </div>
)
}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps =(dispatch)=>{
  return{
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

