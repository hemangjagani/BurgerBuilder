import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    var inputElement = null;
    const inputClasses = [classes.input];
    if(props.invalid  &&  props.shouldvalidate && props.touched)
    {
        inputClasses.push(classes.invalidClass);
        // let validationError  = <p>Insert a valid value</p>
    }

    switch (props.inputtypes) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} type={props.type}  {...props.elementconfig} value={props.value}
                onChange={props.changed} />
            break;
        case 'textbox':
            inputElement = <textbox className={props.inputtypes} {...props} onChange={props.changed} />
            break;
        case 'select':
            inputElement = (<select className={props.inputtypes}  {...props} onChange={props.changed}  >
                {props.elementconfig.option.map(eachoption => {
                    return <option key={eachoption.value} value={eachoption.value}>{eachoption.displayValue}</option>
                })}
            </select>
            )
            break;

        default:
            inputElement = <input className={props.inputtypes} type={props.type}  {...props.elementconfig} value={props.value}
                onChange={props.changed} />
    }
    return (
        <div className={classes.input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
            {(props.invalid  &&  props.shouldvalidate && props.touched) ? <p className={classes.ValidationError}></p>:null}
            {/* *Insert a {props.valuetype} with valid value  */}
        </div>
    )
}

export default Input
