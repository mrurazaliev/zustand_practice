import { useReducer } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentContext, { initialState, StudentReducer } from "./StudentContext";
import "./App.css";

function App() {
  const [students, dispatch] = useReducer(StudentReducer, initialState);

  return (
    <StudentContext.Provider value={{ students, dispatch }}>
      <main className="app">
        <header className="app-header">
          <p className="eyebrow">STUDENT RECORDS</p>
          <h1>Student Manager</h1>
          <p className="subtitle">Keep track of your students and their progress.</p>
        </header>
        <StudentForm />
        <StudentList />
      </main>
    </StudentContext.Provider>
  );
}

export default App;