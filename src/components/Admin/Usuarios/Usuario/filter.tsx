const Filter = () => {
    return(
        <div className="filter">
                <input className="inputFilterViejo" type="text" placeholder="ID Cliente"/>
                <input className="inputFilterViejo" type="text" placeholder="ID Producto"/>
                <input className="inputFilterViejo" type="text" placeholder="Calificacion"/>
                <button>Reiniciar Filtro</button>
        </div>
    )
}

export default Filter