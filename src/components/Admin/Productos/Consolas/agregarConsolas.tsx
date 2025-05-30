//css
import "../../../../styles/admin/admin-product-consolas.css"

const AgregarConsolas = () => {
  return (
      <main className="mainTabla">
        <h2>Añadir Producto</h2>
            <form action="../option_prod_con/insert.php" method="post" encType="multipart/form-data">
                <input type="hidden" name="csrf_token" value=""/>
                <div className="product-form">
                    <div className="visuals">
                        <div className="image-placeholder-left">
                            <div className="img-left">
                                <label htmlFor="name">Auxiliar:</label>
                                <input className="file-input" type="file" id="auxiliar1" name="auxiliar1"
                                    style={{width: "130px"}}/>
                            </div>
                            <div className="img-left">
                                <label htmlFor="name">Auxiliar:</label>
                                <input className="file-input" type="file" id="auxiliar2" name="auxiliar2"
                                    style={{width: "130px"}}/>
                            </div>
                            <div className="img-left">
                                <label htmlFor="name">Auxiliar:</label>
                                <input className="file-input" type="file" id="auxiliar3" name="auxiliar3"
                                    style={{width: "130px"}}/>
                            </div>
                        </div>
                        <div className="image-placeholder">
                            <label htmlFor="name">Principal</label>
                            <input className="file-input" type="file" id="principal" name="principal" style={{width: "130px"}}/>
                        </div>
                    </div>
                    <div className="product-details">
                        <label htmlFor="product-type">Tipo de producto:</label>
                        <select id="product-type" name="tipoproducto" required>
                            <option value="Consola">Consola</option>
                            <option value="Videojuego">Videojuego</option>
                        </select>

                        <label htmlFor="developer">Marca:</label>
                        <select id="developer" name="marca" required>
                            
                        </select>

                        <label htmlFor="price">IVA:</label>
                        <input type="text" id="iva" name="iva" required/>

                        <label htmlFor="price">Valor:</label>
                        <input type="text" id="precio" name="precio" required/>


                        <label htmlFor="name">Nombre Consola:</label>
                        <input type="text" id="nombre" name="nombre" required/>
                    </div>
                    <div className="product-details2">
                        <label htmlFor="name">Garantia Consola</label>
                        <input type="text" id="garantia" name="garantia" required/>
                        <label htmlFor="developer">Administardor Encargado:</label>
                        <select id="developer" name="admin">

                        </select>
                    </div>
                </div>
                <h3>Acerca de:</h3>
                <div className="about-section">
                    <div className="container-description">
                        <h5>Sobre el producto:</h5>
                        <textarea name="sobrepro" id="sobrepro" required></textarea>
                    </div>
                </div>


                <h3>Especificaciones tecnicas:</h3>
                <div className="form-container">
                    <div className="section">
                        <h3>Conectividad</h3>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="ancho">Fuentes de alimentacion</label>
                                <input type="text" id="alimentacion" name="alimentacion" required/>
                            </div>
                            <div className="cell">
                                <label htmlFor="alto">Opciones de conectividad</label>
                                <input type="text" id="conectividad" name="conectividad" required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="fondo">Tipos de puertos</label>
                                <input type="text" id="puertos" name="puertos" required/>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Características Físicas</h3>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="tonalidad">Tonalidad de Color</label>
                                <input type="text" id="tonalidad" name="tonalidad" required/>
                            </div>
                            <div className="cell">
                                <label htmlFor="tipo-controles">Tipo de Controles</label>
                                <input type="text" id="tipo-controles" name="tipocontroles" required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="controles-incluidos">Controles Incluidos</label>
                                <input type="text" id="controles-incluidos" name="controlesincluidos" required/>
                            </div>
                            <div className="cell">
                                <label htmlFor="controles-soporta">Controles que Soporta</label>
                                <input type="text" id="controles-soporta" name="controlessoporta" required/>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Características Técnicas</h3>
                        <div className="row">
                            <div className="cell">
                                <label htmlFor="tipo-procesador">Tipo de Procesador</label>
                                <input type="text" id="tipo-procesador" name="tipoprocesador" required/>
                            </div>
                            <div className="cell">
                                <label htmlFor="resolucion-imagen">Resolución Imagen</label>
                                <input type="text" id="resolucion-imagen" name="resolucionimagen" required/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="button">Añadir Producto</button>
            </form>
      </main>
  )
}
export default AgregarConsolas;  