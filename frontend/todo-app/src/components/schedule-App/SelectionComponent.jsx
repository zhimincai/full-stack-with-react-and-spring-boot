import React from 'react';
import { Field } from 'formik'

function SelectionComponent(props) {
  
  return (
    <fieldset className={'form-group ' + props.width_className}>
    <label className='font-weight-bold'>{props.label}</label>
    <Field className="form-control" as="select" type={props.type} name={props.name}>
        <option value={props.init}>---- Please Select... ----</option>
        {!props.optionValues && 
              props.idxs.map(
                  i => <option key={i} value={i}>{props.selections[i]}</option>)
        }
        {props.optionValues && props.optionValues === 'original' &&
              props.idxs.map(
                  i => <option key={i} value={props.selections[i]}>{props.selections[i]}</option>)}

        {props.optionValues && props.optionValues !== 'original' &&
              props.idxs.map(
                  i => <option key={i} value={props.optionValues[i]}>{props.selections[i]}</option>)}
    </Field>
    </fieldset>
  );
}

export default SelectionComponent