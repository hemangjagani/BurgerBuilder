import React, {  createContext, useState,} from 'react'
import Aux from '../Auxilary/Auxilary';
import classes from './Layout.module.css'
import ToolBar from '../../Components/Burger/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../Components/Burger/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const isAuthor = createContext ()
const Layout = props => {
      const [showSideDrawer,setShowSideDrawer]  = useState(false)
    
   const showSideDrawerHandler = () => {
        setShowSideDrawer(false)
    }

  const toogleDrawerClickedHandler = () => {
        setShowSideDrawer(!showSideDrawer)
}

    return (
        <Aux>
            <isAuthor.Provider value={props.isAuthenicated}>
            <ToolBar  toogleDrawerClicked={toogleDrawerClickedHandler} />
            <SideDrawer open={showSideDrawer} closed={showSideDrawerHandler} />
            </isAuthor.Provider>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );

};

const mapStateToProps =(state)=>{
return{
    isAuthenicated: state.auth.token!=null
}
}

export default connect(mapStateToProps)(Layout);
export {isAuthor}