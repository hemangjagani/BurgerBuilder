import * as actionTypes from './actionsTypes'

export const purcaseBurgerSuccess =(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData: orderData,      
    }
}

export const PURCHASED_ORDER =()=>{
    return{
        type:actionTypes.PURCHASED_ORDER,
        purchased:false
    }
}
export const showLoadingHandler =()=>{
    return{
        type:actionTypes.showLoadingHandler,
        ShowLoading:true,
        
    }
}
export const purchaseBurgerFail =(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart =(orderData,token)=>{
     return{
         type: actionTypes.PURCHASE_BURGER_START,
         orderData: orderData,
         token: token
     }
    }
    
export const FETCH_ORDER_START =()=>{
        return{
            type:actionTypes.FETCH_ORDER_START,           
        }
    }
export const FETCH_ORDER_FAILED =(error)=>{
        return{
        type:actionTypes.FETCHED_INGREDIENT_FALIED,
        error:error,
        }
    }
 export const FETCH_ORDER_SUCCESS =(orders) =>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders,
    }
}

export const FETCH_ORDER =(token,userId)=>{
return{
    type: actionTypes.FETCH_ORDER_INIT,
    token:token,
    userId:userId
}
}

export const FETCH_ORDER_DELETE=(updateOrder)=>{
 return{
     type:actionTypes.FETCH_ORDER_DELETE,
     updateOrder:updateOrder
 }
}