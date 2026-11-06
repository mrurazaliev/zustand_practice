import React, { useState } from 'react'
import { useStudent } from '../StudentContext'

function StudentForm() {

 
  const {dispatch}=useStudent()

  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [score,setScore]=useState("")

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    
    const studentScore=Number(score)

    dispatch({
      type:"post",
      payload:{
        id:Date.now(),
        name,
        age:Number(age),
        score:studentScore
      }
    })
    setName("")
    setAge("")
    setScore("")
  }


  return (
    <form className="student-form panel" onSubmit={handleSubmit}>
      <h2>Add a student</h2>
      <div className="form-fields">
        <input aria-label="Name" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input aria-label="Age" type="number" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
        <input aria-label="Score" type="number" placeholder="Score" value={score} onChange={(e)=>setScore(e.target.value)}/>
        <button className="button button-primary" type="submit">Add Student</button>
      </div>
    </form>
  )
}

export default StudentForm