import React from 'react'
import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter:new Adapter()})
describe("<NavigationItems/>",()=>{
    let wrapper;
    beforeEach(()=>{
     wrapper = shallow(<NavigationItems/>)
    })
    it("should <NavigationItem/> will have to render Two times if unauthorized",()=>{
    expect(wrapper.find(NavigationItem)).toHaveLength(1);    
    })
    it("should <NavigationItem/> will have to render Two times if authorized",()=>{
    wrapper.setProps({isAuthor:true})
    expect(wrapper.find(NavigationItem)).toHaveLength(1);    
    })
    it("should <NavigationItem/> will have to render Two times if authorized",()=>{
    wrapper.setProps({isAuthor:true})
    expect(wrapper.contains( <NavigationItem exact links='./logout'>Logout</NavigationItem>)).toEqual(!true);    
    })
})