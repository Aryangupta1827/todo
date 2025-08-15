import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState("")

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const addTask = () => {
    if (task.trim() === "" || task.length <= 0) { return alert('Enter some value'); }
    const newTask = {
      id: crypto.randomUUID(),
      name: task,
      isCompleted: false,
      isEditing: false
    }

    setTodos((prev) => {
      return [...prev, newTask]
    });
    setTask('');
  }

  const deleteTask = (i) => {
    setTodos((prev) => {
      return prev.filter((todo) => {
      if (todo.id === i) {
        return false;
      }
      else
        return true;
    })})
  }

  const taskComplete = (i) => {
    setTodos((prev) => { 
      return prev.map((todo) => {
      if (i === todo.id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      else
        return todo
    })})
  }

  const editTask = (i, currentval) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (i === todo.id) {
          return { ...todo, isEditing: true }
        }
        else
          return todo
      })
  })
    setEditText(currentval);
  }

  const saveTask = (i) => {
    setTodos((prev) =>{
      return prev.map((todo) => {
        if (i === todo.id) {
          return { ...todo, name: editText, isEditing: false }
        }
        else
          return todo
      })
  })
    setEditText('');
  }

  return (
    <div className='main'>
      <div>
        <h1 className='heading'>Todo-App</h1>
        <input className='task-input' type='text' onChange={handleChange} value={task} placeholder='enter task!' />
        <button className='btn-add' onClick={addTask}>Add</button>
      </div>

      
        {todos.map((todo) => {
          return (
            <div className='output-section'>
              <div className='alltasks' key={todo.id}>
                <input  className='checkbox' type='checkbox' checked={todo.isCompleted} onChange={() => taskComplete(todo.id)} />

                {todo.isEditing ? (
                  <>
                    <input className='edit-input' type='text' value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <button className='btn-save' onClick={() => saveTask(todo.id)}>save</button>
                  </>
                ) :
                  (
                    <>
                      <span className={  todo.isCompleted && 'strike' }>
                        <h4 className='tasks'>{todo.name}</h4>
                        </span>
                      <button className='btn-edit' onClick={() => editTask(todo.id, todo.name)}>Edit</button>
                    </>

                  )}

                <button className='btn-delete' onClick={() => deleteTask(todo.id)}>Delete</button>
              </div>
            </div>
          );
        })}
     

    </div>
  )
}

export default App
