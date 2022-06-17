import React from 'react'
import "./Input.scss"

function Input({type, name, onChange, placeholder}) {
  return (
    <div className='input_group'>
        <input type= {type} class="form-control" placeholder={placeholder} onChange={(e) => onChange(e) } />
    </div>
  )
}


export default Input