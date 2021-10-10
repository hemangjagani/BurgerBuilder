import React from 'react'
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop'
import Aux from '../../../Hoc/Auxilary/Auxilary'
import PropTypes from 'prop-types'

const  Modal = props => {
// shouldComponentUpdate(nextProps,nextState){
//    return nextProps.sshowModal!== this.props.showModal || nextProps.children!==this.props.children;
// }
        return (
            <Aux>
                <BackDrop show={props.showModal} clicked={props.modelToOrderHandler} />
                <div className={classes.Modal}
                    style={{
                        transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.showModal ? '1' : '0'
                    }}>
                    {props.children}
                </div>
            </Aux>
        )
    
}
Modal.propTypes =
{
    showModal: PropTypes.bool
}
export default React.memo(Modal,(prevProps,nextProps)=> nextProps.showModal=== prevProps.showModal && nextProps.children ===prevProps.children)
