import './formFields.scss';
import { useState } from 'react';


// Reusable Input Component
export function InputField({ label, name, type = 'text', onChange, value,placeholder, id }) {
  return (
    <div className="create__field">
      <label className="create__label" htmlFor={name}>{label}</label>
      <input className="create__input" id={name || id} type={type} name={name} onChange={onChange} value={value} placeholder={placeholder} />
    </div>  
  )}
  
  // Reusable Select Component
 export function SelectField({ label, name, options, onChange, value, id, multiple = false}) {
    // Render label and select with options
    return (
      <div className="create__field">
        <label className="create__label" htmlFor={name}>{label}</label>
        <select className="create__input create__select" name={name} id={name} onChange={onChange}  multiple={multiple} value={value}>
          <option value="">Select Option</option>
          {options.map((option) => (
           
            <option key={crypto.randomUUID()} value={option.value}>{option.label}</option>
          
          ))}
        </select>
      </div>
    );
  }

  // Reusable TextArea Component
  export function TextAreaField({ label, name, id, onChange, value, placeholder}) {
    return (
      <div className="create__field">
        <label className="create__label" htmlFor={name}>{label}</label>
        <textarea className="create__input  create__textarea" name={name} id={name} onChange={onChange} value={value} placeholder={placeholder} />
      </div>
    );
  }
  
  export function CheckBox({ label, name, id, onChange, checked }) {
   
    return (
      <div className="checkbox__create">
        <label className="checkbox__text" htmlFor={name}>{label}</label>
        <input type="checkbox"  className="checkbox__box" name={name} id={name} onChange={handleChange} checked={checked} />
      </div>
    );
  }
  

  export function SelectMultipleField({ label, name, options, onChange, value, id, multiple = true}) {
    // Render label and select with options
    return (
      <div className="create__field">
        <label className="create__label" htmlFor={name}>{label}</label>
        <select className="create__input create__select create__select-multiple" name={name} id={name}   multiple={multiple} value={value}>
        
          {options.map((option) => (
           
            <option key={crypto.randomUUID()} value={option.value}>{option.label}</option>
          
          ))}
        </select>
      </div>
    );
  }

