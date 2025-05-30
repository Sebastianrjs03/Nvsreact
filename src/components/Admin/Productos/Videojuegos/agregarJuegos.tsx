//css
import "../../../../styles/admin/admin-productos.css"

//hooks
import { ApiPrivate, ApiPublic } from "../../../../hooks/UseFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Types
import { Administrador, Genero, Plataforma, ProductoA, Marca } from '../../Types/TypesDatos';
import Swal from "sweetalert2";

const AgregarJuegos = () => {

  const [dataM, setDataM] = useState<Marca[]>([]);
  const [dataA, setDataA] = useState<Administrador[]>([]);
  const [dataP, setDataP] = useState<Plataforma[]>([]);
  const [dataG, setDataG] = useState<Genero[]>([]);
  const [dataPro, setDataPro] = useState<ProductoA | null>(null);
  const id = useParams();

  const [portada, setPortada] = useState<File | null>(null);
  const [iva, setIva] = useState<number>(0);
  const [valor, setValor] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [lanzamiento, setLanzamiento] = useState<string>("");
  const [garantia, setGarantia] = useState<string>("");
  const [selectedAdministrador, setSelectedAdministrador] = useState<number>(0);
  const [selectedStock, setSelectedStock] = useState<number>(0);
  const [seleccionadosMarca, setSeleccionadosMarca] = useState([]);
  const [seleccionadosPlataforma, setSeleccionadosPlataforma] = useState([]);
  const [seleccionadosGenero, setSeleccionadosGenero] = useState([]);

  const [selectedTipo, setSelectedTipo] = useState("Videojuego");

  const get = async () => {

    const resultImage = await ApiPublic("Consultar_ImagenesCategoria", {
      categoria: "visuales"
    })
    const resultMarca = await ApiPublic("Consultar_Marca");
    const resultAdministrador = await ApiPublic("Consultar_Administrador");
    const resultPlataforma = await ApiPublic("Consultar_Plataforma");
    const resultGenero = await ApiPublic("Consultar_Genero");

    console.log(resultImage);
    if (resultMarca && resultAdministrador && resultPlataforma && resultGenero) {
      setDataM(resultMarca);
      setDataA(resultAdministrador);
      setDataP(resultPlataforma);
      setDataG(resultGenero);
    } else {
      console.error('No se recibieron datos o los datos están en un formato inesperado');
    }
  }

  const getProducto = async () => {
    if (id) {
      const resultProducto = await ApiPublic("ConsultarPorId_Producto");
      if (resultProducto) {
        setDataPro(resultProducto);
      }
    }
  }

  const AsignarProducto = async () => {
    if (dataPro) {
    }
  }

  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    getProducto();
    AsignarProducto();
  }, [id])

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const file = e.target.files[0];
    setPortada(file);
    }
  };



  const Agregar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!portada) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Debes seleccionar una imagen de portada.",
  });
  return;
}
      const formData = new FormData();
  formData.append("portada", portada);

  const response = await ApiPrivate("Subir_Imagenes", formData,)
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Subir Imagenes Exitoso",
      })
    }
  }

    return (
      <main className="main_content">
        <h2>Añadir Juego</h2>
        <form onSubmit={Agregar} method="post" encType="multipart/form-data">
          <div className="product-form">
            <div className="visuals">
              <div className="image-placeholder-left" style={{ height: "400px" }}>
                <div className="img-left">
                  <label htmlFor="name">banner:</label>
                  <input className="file-input" type="file" id="banner" name="banner"
                    style={{ width: "130px" }} />
                </div>
                <div className="img-left">
                  <label htmlFor="name">visual1:</label>
                  <input className="file-input" type="file" id="visual1" name="visual1"
                    style={{ width: "130px" }} />
                </div>
                <div className="img-left">
                  <label htmlFor="name">visual2:</label>
                  <input className="file-input" type="file" id="visual2" name="visual2"
                    style={{ width: "130px" }} />
                </div>

                <div className="img-left">
                  <label htmlFor="name">visual3:</label>
                  <input className="file-input" type="file" id="visual3" name="visual3"
                    style={{ width: "130px" }} />
                </div>

                <div className="img-left">
                  <label htmlFor="name">trailer:</label>
                  <input className="file-input" type="file" id="trailer" name="trailer"
                    style={{ width: "130px" }} />
                </div>
              </div>
              <div className="image-placeholder">
                <label htmlFor="name">Portada</label>
                <input className="file-input" type="file" onChange={handleImagenChange}
                  style={{ width: "130px" }} />
              </div>
            </div>
            <div className="product-details">
              <label htmlFor="product-type">Tipo de producto:</label>
              <select id="product-type" name="tipoproducto">
                <option value="Videojuego">Videojuego</option>
                <option value="Consola">Consola</option>
              </select>

              <label htmlFor="developer">Marca:</label>
              <select id="developer" name="marca[]" multiple>
              </select>
              <span className="spanSelectMultiple">Ctrl + Click para más de una opcion</span>

              <label htmlFor="price">IVA:</label>
              <input type="text" id="iva" name="iva" />

              <label htmlFor="price">Valor:</label>
              <input type="text" id="precio" name="precio" />


              <label htmlFor="name">Nombre Juego:</label>
              <input type="text" id="nombre" name="nombre" />

              <label htmlFor="price">Año de lanzamiento:</label>
              <input type="date" id="anolanzamiento" name="anoLanzamiento" />


            </div>
            <div className="product-details2">
              <label htmlFor="name">Garantia Juego</label>
              <input type="text" id="garantia" name="garantia" />

              <label htmlFor="developer">Administardor Encargado:</label>
              <select id="developer" name="admin">


              </select>

              <label htmlFor="price">Plataforma:</label>
              <select id="developer" name="plataforma[]" multiple size={3}>
              </select>
              <span className="spanSelectMultiple">Ctrl + Click para más de una opcion</span>

              <label htmlFor="price">Genero:</label>
              <select id="developer" name="genero[]" multiple>

              </select>
              <span className="spanSelectMultiple">Ctrl + Click para más de una opcion</span>

              <label htmlFor="price">Stock</label>
              <input type="number" id="stock" name="stock" />

            </div>
          </div>
          <h3>Acerca de:</h3>
          <div className="about-section">
            <div className="container-description">
              <h5>Sobre el Juego:</h5>
              <textarea name="sobreJuego" id="sobreJuego"></textarea>
            </div>
          </div>
          <button name="submit" className="button">Añadir Producto</button>

        </form>
      </main>
    )
  }
  export default AgregarJuegos;  