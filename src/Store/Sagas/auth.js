import {put,call} from 'redux-saga/effects'
import {delay} from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../action/indexAction'

export function* logoutSaga(action){
    yield call([localStorage,"removeItem"],"token")
    yield call([localStorage,"removeItem"],"expirationDate")
    yield call([localStorage,"removeItem"],"userId")
   yield put(actions.logoutSucceed())
}

export function* cheackExpireTimeSaga(action){
    yield delay(action.expiretime*1000)
    yield put(actions.logout())
}

export function* authUserSaga(action){
        yield put(actions.AUTH_START())
        const authData ={
            email:action.email,
            password:action.password,
            returnSecureToken:true,
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSn8F6GJsD6I4QdbPQNwk4NZYNKhho2Dw'
        if(!action.isSignUp)
        {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSn8F6GJsD6I4QdbPQNwk4NZYNKhho2Dw'
        }

       try{
        const response = yield axios.post(url,authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn *1000)
        yield call([localStorage,"setItem"],"token",response.data.idToken)
        yield call([localStorage,"setItem"],"expirationDate",expirationDate)
        yield call([localStorage,"setItem"],"userId",response.data.localId)
        // yield localStorage.setItem('token',response.data.idToken)
        // yield localStorage.setItem('expirationDate',expirationDate)
        // yield localStorage.setItem('userId',response.data.localId)
        yield put(actions.AUTH_SUCCESS(response.data.idToken,response.data.localId))
        yield put(actions.cheackExpireTime(response.data.expiresIn))
       }
      catch(error)
      {
          yield put(actions.AUTH_FAIL(error.response.data.error))
      }  
}

export function* autoCheckStateSaga(action){
        const token =  yield localStorage.getItem('token')
        if(!token)
        {
            yield put(actions.logout())
        }
        else{
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
            if(expirationDate>=new Date())
            {
                const userId = yield localStorage.getItem('userId')
                yield put (actions.AUTH_SUCCESS(token,userId))
                yield put (actions.cheackExpireTime((expirationDate.getTime() - new Date().getTime())/1000) )
            }
            else{
                yield put(actions.logout())
            }
        
    }
}
