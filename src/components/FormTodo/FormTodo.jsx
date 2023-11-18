import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const getExistingTodoById = (id, todos) => {
  const existingTodo = todos.find((todo) => todo.id === id)
  return existingTodo || {}
}

function FormTodo({ addTodo, editTodoId, setEditTodoId, todos }) {
  const [value, setValue] = useState("")
  const [category, setCategory] = useState("")
  const [desc, setDesc] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setIsEditing(editTodoId !== null)

    if (editTodoId !== null) {
      const existingTodo = getExistingTodoById(editTodoId, todos)
      console.log("Existing Todo:", existingTodo)
      setValue(existingTodo.text || "")
      setCategory(existingTodo.category || "")
      setDesc(existingTodo.desc || "")
    }
  }, [editTodoId, todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (!value.trim() || !category || !desc.trim()) {
        setValue("")
        setCategory("")
        setDesc("")
        throw new Error("Por favor, preencha todos os campos ")
      } else {
        console.log("Preencheu tudo")
        if (isEditing) {
          addTodo(value, category, desc)
          setEditTodoId(null)
        } else {
          addTodo(value, category, desc)
        }
        setValue("")
        setCategory("")
        setDesc("")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="todo-form">
      <h2>{isEditing ? "Editando Tarefa:" : "Criar Nova Tarefa:"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título"
          value={value}
          maxLength={50}
          onChange={(e) => setValue(e.target.value)}
        />
        <textarea
          placeholder="Descrição da tarefa"
          value={desc}
          maxLength={255}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Selecione uma categoria
          </option>
          <option value="Pessoais">Pessoais</option>
          <option value="Estudos">Estudos</option>
          <option value="Trabalhos">Trabalhos</option>
          <option value="Religiosos">Religiosas</option>
        </select>
        <button className="buttonsAll" type="submit">
          {isEditing ? "Salvar Edição" : "Criar Nova Tarefa"}
        </button>
      </form>
    </div>
  )
}

FormTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodoId: PropTypes.number,
  setEditTodoId: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
}

export default FormTodo
