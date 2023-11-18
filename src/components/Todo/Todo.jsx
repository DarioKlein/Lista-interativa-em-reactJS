import PropTypes from "prop-types"

function Todo({ todo, removeTodo, completeTodo, editTodo, isEditing }) {
  return (
    <div className="todo">
      <div
        className="content"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        <h3>{todo.text}</h3>
        <p className="desc">{todo.desc}</p>
        <p className="category">({todo.category})</p>
      </div>
      <div className="buttonsTask">
        <button
          className={todo.isCompleted ? "returnPending" : "complete"}
          onClick={() => completeTodo(todo.id)}
        ></button>
        {!isEditing && (
          <button className="edit" onClick={() => editTodo(todo.id)}></button>
        )}
        <button className="remove" onClick={() => removeTodo(todo.id)}></button>
      </div>
    </div>
  )
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  removeTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
}

export default Todo
