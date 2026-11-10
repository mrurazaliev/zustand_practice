import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { addUSer, deleteUser, editUser, type Todo } from '../slice/counterSlice'
import { useState, type FormEvent } from 'react'
import './Home.css'

function Home() {
  const dispatch = useDispatch()

  const data = useSelector((state: RootState) => state.Todochka.todo)

  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [open, setOpen] = useState(false)

  function handleDelete(id: number) {
    dispatch(deleteUser(id))
  }

  function handleOpenAdd() {
    setName('')
    setJob('')
    setEditId(null)
    setOpen(true)
  }

  function handleOpenEdit(user: Todo) {
    setName(user.name)
    setJob(user.job)
    setEditId(user.id)
    setOpen(true)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name.trim() || !job.trim()) return

    if (editId !== null) {
      dispatch(editUser({
        id: editId,
        name: name.trim(),
        job: job.trim()
      }))
    } else {
      dispatch(addUSer({
        id: Date.now(),
        name: name.trim(),
        job: job.trim()
      }))
    }

    setEditId(null)
    setName('')
    setJob('')
    setOpen(false)
  }

  return (
    <main className="users-page">
      <div className="users-container">
        <header className="users-header">
          <div>
            <span className="users-eyebrow">REDUX TOOLKIT</span>
            <h1>User Management</h1>
            <p>Manage your team members in one place.</p>
          </div>

          <button className="add-btn" onClick={handleOpenAdd}>
            <span>＋</span> Add User
          </button>
        </header>

        <div className="users-stats">
          <div className="stats-icon">👥</div>
          <div>
            <span>Total Users</span>
            <strong>{data.length}</strong>
          </div>
        </div>

        {open && (
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div
              className="modal-box"
              role="dialog"
              aria-modal="true"
              aria-labelledby="user-form-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-heading">
                <div>
                  <h2 id="user-form-title">
                    {editId !== null ? 'Edit User' : 'Add New User'}
                  </h2>
                  <p>Fill in the information below.</p>
                </div>

                <button
                  type="button"
                  className="close-btn"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="user-form">
                <label htmlFor="user-name">Full Name</label>
                <input
                  id="user-name"
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label htmlFor="user-job">Job Title</label>
                <input
                  id="user-job"
                  type="text"
                  placeholder="Enter job title"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  required
                />

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-btn">
                    {editId !== null ? 'Save Changes' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="users-section">
          <div className="section-heading">
            <h2>Team Members</h2>
            <span>{data.length} members</span>
          </div>

          {data.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <h3>No users yet</h3>
              <p>Add your first user to get started.</p>
              <button className="add-btn" onClick={handleOpenAdd}>
                + Add User
              </button>
            </div>
          ) : (
            <div className="users-grid">
              {data.map((user) => (
                <article className="user-card" key={user.id}>
                  <div className="card-top">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="member-badge">Member</span>
                  </div>

                  <h3>{user.name}</h3>
                  <p className="user-job">{user.job}</p>

                  <div className="card-divider" />

                  <div className="card-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleOpenEdit(user)}
                    >
                      ✎ Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="users-footer">
          Built with React + Redux Toolkit
        </footer>
      </div>
    </main>
  )
}

export default Home