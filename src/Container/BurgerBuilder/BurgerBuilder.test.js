import React from "react";
import {BurgerBuilder} from "./BurgerBuilder";
import { configure,shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import BurgerControlers from "../../Components/BurgerControlers/BurgerControlers";

configure({adapter:new Adapter()})
describe("<BurgerBuilder />",()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper= shallow(<BurgerBuilder onSetIngredient={()=>{}}/>)
    })
    
   it("should render <Burger contolers/> when it receives ings ",()=>{
      wrapper.setProps({ing:{salad:0}})
      expect(wrapper.find(BurgerControlers)).toHaveLength(1)
  })
})

