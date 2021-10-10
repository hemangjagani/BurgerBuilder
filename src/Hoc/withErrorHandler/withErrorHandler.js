import React from 'react'
import Modal from '../../Components/UI/Modal/Modal'
import Aux from '../Auxilary/Auxilary'
import useHttpErrorHandler from '../../Container/Hooks/http-error-handler'

const withErrorHandler= (WrappedComponent,axios)=> {
    return props => {
            const [error,ErrorConfirmedHandler]= useHttpErrorHandler(axios)
            return(
            <Aux>
                <Modal showModal={error} modelToOrderHandler={ErrorConfirmedHandler}>{error?error.message:null}</Modal>
                <WrappedComponent {...props}/>
                </Aux>
                )
        }
    }


export default withErrorHandler
