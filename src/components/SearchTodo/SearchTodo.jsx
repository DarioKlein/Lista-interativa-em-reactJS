import PropTypes from "prop-types"

const SearchTodo = ({ search, setSearch }) => {
  return (
    <div className="search">
      <h2>Pesquise por sua tarefa</h2>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar..."
      />
    </div>
  )
}

SearchTodo.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
}

export default SearchTodo
