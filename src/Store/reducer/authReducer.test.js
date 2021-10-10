import reducer from "./authReducer";
import * as actionTypes from '../action/actionsTypes'

describe("<authReducer/>",()=>{
    it("should be deffault initial state ",()=>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId: null,
            error:null,
            ShowLoading: null,
            authRedirectPath:'/'
        }
        )
    })
    it("should receive token and userid",()=>{
        expect(reducer({
            token:null,
            userId: null,
            error:null,
            ShowLoading: null,
            authRedirectPath:'/'
        }
        ,{type:actionTypes.AUTH_SUCCESS,idToken:'some-token',userId:'some-userid'})).toEqual({
          token:'some-token',
        userId:'some-userid',
            error:null,
            ShowLoading: false,
            authRedirectPath:'/'
        })
    })
})