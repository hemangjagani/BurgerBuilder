import * as actionType from '../action/actionsTypes';
import {updateObject} from '../../shared/utility'
const initialState ={
    ShowLoading:false,
   order:[],
   purchased:false
}

const reducer = (state=initialState,action)=>{

    switch (action.type) {
        case actionType.PURCHASED_ORDER:
            return updateObject(state,{purchased:action.purchased})
        
        case actionType.showLoadingHandler:
            return updateObject(state,{ShowLoading:true})
           
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.order,{id:action.orderId})
            return updateObject(state,{   ShowLoading:false,
                order: state.order.concat(newOrder),
                purchased:true})
          
        case actionType.PURCHASE_BURGER_FAIL:
            return updateObject(state,{ShowLoading:false,error:action.error})
     
        case actionType.FETCH_ORDER_SUCCESS:
            return  updateObject(state,{
                ShowLoading:false,
                orders: action.orders,
            })
     
        case actionType.FETCH_ORDER_FAILED:
            return updateObject(state,{
                ShowLoading:false,
                orders:action.orders
            })
          
        case actionType.FETCH_ORDER_START:
            return updateObject(state,{ShowLoading:true})
          
        case actionType.FETCH_ORDER_DELETE:
            return updateObject(state,{orders:action.updateOrder})
           
        default:
            return state;
    }
}

export default reducer;