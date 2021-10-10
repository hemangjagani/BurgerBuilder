import React, { useEffect } from 'react'
import Order from '../../Components/Order/Order'
import axios from '../../axios-order'
import { connect } from 'react-redux'
import * as action from '../../Store/action/indexAction'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../Components/UI/Spinner/Spinner'

 const MainOrder =(props)=> {
     useEffect(()=>{
         props.onOrderInit(props.token,props.userId)
     },[props])
     
    const deleteOrderHistoryHandler=(id)=>{
           const updateOrder = orders.filter(element=> element.id !== id )
          props.onOrderDelete(updateOrder)
 
     }

        let orders = <Spinner/>
        if(props.orders)
        orders= props.orders.map(order=>(
                 <Order price={order.price} 
                               ingredients={order.ingredient}
                               key={order.id}
                               clicked={()=>deleteOrderHistoryHandler(order.id)}/>
        ))
        return (
            <div>
                {orders}
            </div>
        )
    
}

const mapStateToProps=(state)=>{
    return {
        orders: state.order.orders,
        ShowLoading: state.order.ShowLoading,
        token:state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        onOrderInit:(token,userId)=>dispatch(action.FETCH_ORDER(token,userId)),
        onOrderDelete:(updateOrder)=>dispatch(action.FETCH_ORDER_DELETE(updateOrder))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(MainOrder,axios))
