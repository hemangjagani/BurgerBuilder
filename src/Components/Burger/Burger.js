import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'


function Burger(props) {
    
   let  transformedIngredient = Object.keys(props.ingredient).map(igkey=>{
       return [...Array(props.ingredient[igkey])].map((_,i)=>{
           return <BurgerIngredient key={igkey+i} type={igkey}/>
       })
   })
  .reduce((arr,el)=>{
      return arr.concat(el);
   },[])

 if(transformedIngredient.length===0)
 {
     transformedIngredient = <div>Please add someting!</div>
     
 }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={"BreadTop"}/>
           {transformedIngredient}
           
            <BurgerIngredient type={"BreadBottom"}/>
        </div>
    )
}

export default Burger
