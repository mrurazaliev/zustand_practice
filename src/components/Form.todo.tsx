import React, { useState } from 'react'

function Form.todo() {
    const [open,setOpen]=useState(false)
  return (
     <form >
       <input type="text" />
     </form>
  )
}

export default Form.todo