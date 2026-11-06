import { useState } from 'react'
import { useStudent } from '../StudentContext'

function StudentList() {
  const { students, dispatch } = useStudent()

  const [editedId, setEditedId] = useState<number | null>(null)
  const [editedName, setEditedName] = useState("")
  const [editedAge, setEditedAge] = useState("")
  const [editedScore, setEditedScore] = useState("")

  const handleEdit = (id: number, name: string, age: number, score: number) => {
    setEditedId(id)
    setEditedName(name)
    setEditedAge(age.toString())
    setEditedScore(score.toString())
  }

  const handleSave = () => {
    if (editedId === null) return
    
    if (editedName.trim() === "" || editedAge.trim() === "" || editedScore.trim() === "") return

    dispatch({
      type: "put",
      payload: {
        id: editedId,
        name: editedName,
        age: Number(editedAge),
        score: Number(editedScore)
      }
    })

  
    setEditedId(null)
    setEditedName("")
    setEditedAge("")
    setEditedScore("")
  }

  return (
    <section className="student-list">
      <div className="section-heading">
        <h2>Student List</h2>
        <span className="student-count">{students.length} {students.length === 1 ? 'student' : 'students'}</span>
      </div>
      <div className="student-grid">
      {students.map((elem) => (
        <article className="student-card panel" key={elem.id}>
          {editedId === elem.id ? (
            <div className="edit-fields">
              <input aria-label="Student name" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
              <input aria-label="Student age" type="number" value={editedAge} onChange={(e) => setEditedAge(e.target.value)} />
              <input aria-label="Student score" type="number" value={editedScore} onChange={(e) => setEditedScore(e.target.value)} />
              
              <button className="button button-primary" onClick={handleSave}>Save Edit</button>
              
              <button className="button button-secondary" onClick={() => { setEditedId(null); setEditedName(""); setEditedAge(""); setEditedScore("") }}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="student-details">
              <h3>{elem.name}</h3>
              <p><span>Age</span><strong>{elem.age}</strong></p>
              <p><span>Score</span><strong>{elem.score}</strong></p>
              
              <div className="card-actions">
                <button className="button button-secondary" onClick={() => handleEdit(elem.id, elem.name, elem.age, elem.score)}>Edit</button>
                <button className="button button-danger" onClick={() => dispatch({ type: "delete", payload: elem.id })}>Delete</button>
              </div>
            </div>
          )}
        </article>
      ))}
      </div>
    </section>
  )
}

export default StudentList