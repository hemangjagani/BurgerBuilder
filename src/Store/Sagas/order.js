import axios from '../../axios-order'
import { put } from 'redux-saga/effects'
import * as actions from '../action/indexAction'

export function* purchaseBurgerStartSaga(action) {

    yield put(actions.showLoadingHandler())
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put (actions.purcaseBurgerSuccess(response.data.name, action.orderData))
    }
    catch (error) {
        yield put(actions.purcaseBurgerSuccess())
    }

}
export function* fetchOrderSaga(action){
        yield put(actions.FETCH_ORDER_START())
         const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="'+ action.userId + '"';
         try{
            const res =  yield axios.get('/orders.json'+ queryParams)
            const fetchedOrder=[];
            for(let key in res.data)
            {
                fetchedOrder.push({...res.data[key],id:key})                 
           }
          yield put(actions.FETCH_ORDER_SUCCESS(fetchedOrder))           
         }
        catch(err)
        {
            yield put(actions.FETCH_ORDER_FAILED(err))
        }     
}