const Filter = () => {
    return(
        <div className="filter">
                <input type="text" placeholder="ID Cliente"/>
                <input type="text" placeholder="ID Producto"/>
                <input type="text" placeholder="Calificacion"/>
                <button>Reiniciar Filtro</button>
        </div>
    )
}

export default Filter