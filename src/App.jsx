import { useState, useEffect } from "react"
import Todo from "./components/Todo/Todo"
import "./global.css"
import FormTodo from "./components/FormTodo/FormTodo"
import SearchTodo from "./components/SearchTodo/SearchTodo"
import FilterTodo from "./components/FilterTodo/FilterTodo"

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || []
  const [todos, setTodos] = useState(initialTodos)

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("Asc")

  const [editTodoId, setEditTodoId] = useState(null)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (text, category, desc) => {
    if (editTodoId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodoId ? { ...todo, text, category, desc } : todo
      )
      setTodos(updatedTodos)
      setEditTodoId(null)
    } else {
      const newTodos = [
        ...todos,
        {
          id: Math.floor(Math.random() * 10000),
          text,
          desc,
          category,
          isCompleted: false,
        },
      ]
      setTodos(newTodos)
    }
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    )
    setTodos(filteredTodos)
    setEditTodoId(null)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    )
    setTodos(newTodos)
    setEditTodoId(null)
  }

  const editTodo = (id) => {
    setEditTodoId(id)
  }

  return (
    <div className="App">
      <h1>LISTA DE TAREFAS</h1>
      <SearchTodo search={search} setSearch={setSearch}></SearchTodo>
      <FilterTodo
        filter={filter}
        setFilter={setFilter}
        setSort={setSort}
      ></FilterTodo>
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>Sem Tarefas</p>
        ) : (
          todos
            .filter((todo) =>
              filter === "all"
                ? true
                : filter === "completed"
                ? todo.isCompleted
                : !todo.isCompleted
            )
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
              sort === "Asc"
                ? a.text.localeCompare(b.text)
                : b.text.localeCompare(a.text)
            )
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
                editTodo={editTodo}
                isEditing={editTodoId === todo.id}
              ></Todo>
            ))
        )}
      </div>
      <FormTodo
        addTodo={addTodo}
        editTodoId={editTodoId}
        setEditTodoId={setEditTodoId}
        todos={todos}
      ></FormTodo>
    </div>
  )
}

export default App
