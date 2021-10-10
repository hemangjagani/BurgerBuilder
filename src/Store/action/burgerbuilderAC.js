import * as actionTypes from './actionsTypes'

export const addIngredient =(igName)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:igName
    }
}
export const removeIngredient =(igName)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:igName
    }
}


export const fetchIngredientFailed =()=>{
 return{
     type:actionTypes.FETCHED_INGREDIENT_FALIED,
     er:true
 }
}

export const setIngredient =(ingredient) =>{
  return{
      type:actionTypes.SET_INGREDIENT,
      ingredient:ingredient,
      er:false
  }
}


export const initIngredient =()=>{
    return{
        type:actionTypes.INIT_INGREDIENT
    }   
}