import * as actionType from '../action/actionsTypes'
import {updateObject} from '../../shared/utility'

const INGREDIENT_PRICE = {
    Cheese: 15,
    Salad: 5,
    Bacon: 7,
    Meat: 20,
}

const initialstate ={
    ingredient: null,
    totalPrice: 10,
    INGREDIENT_PRICE:INGREDIENT_PRICE,
    error:false,
    building:false
}
const addIngredient =(state,action)=>{
    const updatedIngredient = updateObject({[action.ingredientName]:state.ingredient[action.ingredientName] + 1})
    const updatedIngredients = updateObject(state.ingredient,updatedIngredient)
     const updatedState ={
      ingredient:updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
      building:true
  }  
  return updateObject(state,updatedState)    
}

const removeIngredient = (state,action) =>{
    const updateing = updateObject({[action.ingredientName]:state.ingredient[action.ingredientName] - 1})
    const updateings = updateObject(state.ingredient,updateing)
    const updatest ={
        ingredient: updateings,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state,updatest)
}

const setIngredient =(state, action)=>{
    return updateObject(state,{ingredient:{
        Salad:action.ingredient.Salad,
        Cheese:action.ingredient.Cheese,
        Bacon:action.ingredient.Bacon,
        Meat:action.ingredient.Meat,
    },
    totalPrice:10,
    error:action.er,
    building:false
})
}

const fetchIngredient = (state, action)=>{
    return updateObject(state,{error:action.er})
}
const reducer=(state=initialstate,action)=>{
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state,action);  
        case actionType.REMOVE_INGREDIENT:return removeIngredient(state,action);    
        case actionType.SET_INGREDIENT: return setIngredient(state,action);
        case actionType.FETCHED_INGREDIENT_FALIED: return fetchIngredient(state,action);        
        default:
            return state;
    }
}

export default reducer;