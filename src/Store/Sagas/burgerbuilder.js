import {put} from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../action/burgerbuilderAC'

export function* initIngredientSaga(action){
   try{
      const response= yield  axios.get("https://react-my-burger-43dc9-default-rtdb.firebaseio.com/ingredient.json")
       yield put(actions.setIngredient(response.data))
   }
   catch(error){
       yield put(actions.fetchIngredientFailed())
   }
}