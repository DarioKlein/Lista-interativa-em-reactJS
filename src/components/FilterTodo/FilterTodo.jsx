import PropTypes from "prop-types"

const FilterTodo = ({ filter, setFilter, setSort }) => {
  return (
    <div className="filter">
      <h2>Filtrar tarefas</h2>
      <div className="Filter-Options">
        <div>
          <p>Status: </p>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="completed">Completas</option>
            <option value="pending">Pendentes</option>
          </select>
        </div>
        <div className="orderByAscOrDesc">
          <p>Ordene de</p>
          <button className="buttonsAll" onClick={() => setSort("Asc")}>
            A-Z
          </button>
          <p>Ou</p>
          <button className="buttonsAll" onClick={() => setSort("Desc")}>
            Z-A
          </button>
        </div>
      </div>
    </div>
  )
}

FilterTodo.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
}

export default FilterTodo
