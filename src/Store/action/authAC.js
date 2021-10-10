import * as actionTypes from './actionsTypes'

export const AUTH_START =()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const AUTH_SUCCESS=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const AUTH_FAIL =(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout =()=>{
    return{
        type:actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed =() =>{
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}
export const cheackExpireTime =(expiretime)=>{
  return{
      type: actionTypes.AUTH_CHECK_EXPIRATION_TIME,
      expiretime: expiretime
  }
}

export const AUTH_SEND = (email,password,isSignUp)=>{
      return{
          type:actionTypes.AUTH_USER,
          email:email,
          password:password,
          isSignUp:isSignUp
      }
}

export const auth_set_redirect_path= (path)=>{
    return{
        type:actionTypes.AUTH_SET_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () =>{
   return{
       type:actionTypes.AUTH_CHECK_STATE,
   }
}