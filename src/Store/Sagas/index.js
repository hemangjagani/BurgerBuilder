import {  all, takeEvery, takeLatest } from "redux-saga/effects";
import * as actionTypes from '../action/actionsTypes'
import { logoutSaga,cheackExpireTimeSaga, authUserSaga,autoCheckStateSaga } from "./auth";
import {initIngredientSaga} from './burgerbuilder'
import {purchaseBurgerStartSaga,fetchOrderSaga} from './order'


export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_EXPIRATION_TIME,cheackExpireTimeSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga),
         takeEvery(actionTypes.AUTH_USER,authUserSaga),
         takeEvery(actionTypes.AUTH_CHECK_STATE,autoCheckStateSaga)
    ])
    
}
export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENT,initIngredientSaga)
}
export function* watchOrderBuilder(){
    yield takeLatest(actionTypes.PURCHASE_BURGER_START,purchaseBurgerStartSaga)
    yield takeEvery(actionTypes.FETCH_ORDER_INIT,fetchOrderSaga)
}