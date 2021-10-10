import * as actionTypes from '../action/actionsTypes'
import {updateObject} from '../../shared/utility'

const initialState ={
    token:null,
    userId: null,
    error:null,
    ShowLoading: null,
    authRedirectPath:'/'
}

const auth_start =(state,action)=>{
    return updateObject(state,{error:null,ShowLoading:true})
}

const auth_success=(state,action)=>{
    return updateObject(state,{token:action.idToken,userId:action.userId,error:null,ShowLoading:false})
}

const auth_fail=(state,action)=>{
    return updateObject(state,{error:action.error,ShowLoading:false})
}

const auth_logout=(state,action)=>{
    return updateObject(state,{token:null,userId:null})
}

const  auth_set_redirect_path =(state,action)=>{
    return updateObject(state,{authRedirectPath:action.path})
}
const reducer =(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.AUTH_START: return auth_start(state,action)
        case actionTypes.AUTH_SUCCESS: return auth_success(state,action)
        case actionTypes.AUTH_FAIL: return auth_fail(state,action)
        case actionTypes.AUTH_LOGOUT: return auth_logout(state,action)
        case actionTypes.AUTH_SET_REDIRECT_PATH : return auth_set_redirect_path(state,action)
        default:return state
    }
}

export default reducer;
