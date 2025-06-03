//css
import "../../../../styles/admin/admin-productos.css"

//librerias
import Swal from "sweetalert2";

//hooks
import { ApiPrivate, ApiPublic } from "../../../../hooks/UseFetch";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Types
import { AdministradorCon, Genero, Plataforma, Marca, Aux_Marca, Aux_Genero, Aux_Plataforma } from '../../Types/TypesDatos';


const AgregarJuegos = () => {

  const [dataM, setDataM] = useState<Marca[]>([]);
  const [dataA, setDataA] = useState<AdministradorCon[]>([]);
  const [dataP, setDataP] = useState<Plataforma[]>([]);
  const [dataG, setDataG] = useState<Genero[]>([]);

  const { id } = useParams();
  const Navigate = useNavigate();

  const [nombrePortada, setNombrePortada] = useState<string>("");
  const [nombreBanner, setNombreBanner] = useState<string>("");
  const [nombreVisuales, setNombreVisuales] = useState<string>("");
  const [nombreTrailer, setNombreTrailer] = useState<string>("");
  const [portada, setPortada] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [visuales, setVisuales] = useState<File[] | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  const [valor, setValor] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [lanzamiento, setLanzamiento] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [garantia, setGarantia] = useState<string>("");
  const [selectedAdministrador, setSelectedAdministrador] = useState<number>(0);
  const [selectedStock, setSelectedStock] = useState<number>(1);
  const [seleccionadosMarca, setSeleccionadosMarca] = useState<string[]>([]);
  const [seleccionadosPlataforma, setSeleccionadosPlataforma] = useState<string[]>([]);
  const [seleccionadosGenero, setSeleccionadosGenero] = useState<string[]>([]);

  const get = async () => {

    const resultMarca = await ApiPublic("Consultar_Marca");
    const resultAdministrador = await ApiPublic("Consultar_AdministradorConUsuario");
    const resultPlataforma = await ApiPublic("Consultar_Plataforma");
    const resultGenero = await ApiPublic("Consultar_Genero");

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
      //Imagenes
      const resultPortada = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "portada", carpeta: "Videojuegos" });
      const resultTrailer = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "trailer", carpeta: "Videojuegos" });
      const resultVisuales = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "visuales", carpeta: "Videojuegos" });
      const resultBanner = await ApiPublic("ConsultarPorId_Imagenes", { id: id, categoria: "banner", carpeta: "Videojuegos" });

      //DATOS
      const resultProducto = await ApiPublic("ConsultarPorID_Producto", { id1: id, nombre1: "idProducto" });
      const resultJuego = await ApiPublic("ConsultarPorID_Juego", { id1: id, nombre1: "idJuego" });
      const resultMarca = await ApiPublic("ConsultarPorID_AuxMarca", { id1: id, nombre1: "fk_pk_producto" });
      const resultPlataforma = await ApiPublic("ConsultarPorID_AuxPlataforma", { id1: id, nombre1: "idJuego" });
      const resultGenero = await ApiPublic("ConsultarPorID_AuxGenero", { id1: id, nombre1: "fk_pk_juego" });

      //IMAGENES
      if (resultBanner) {
        const keys = Object.keys(resultBanner);
        if (keys.length > 0) {
          const url = resultBanner[keys[0]];
          const nombreArchivo = url.split("/").pop();
          setNombreBanner(nombreArchivo || "");
        }
      }

      if (resultTrailer) {
        const keys = Object.keys(resultTrailer);
        if (keys.length > 0) {
          const url = resultTrailer[keys[0]];
          const nombreArchivo = url.split("/").pop();
          setNombreTrailer(nombreArchivo);
        }
      }

      if (resultVisuales) {
        for (let i = 0; i < 3; i++) {
          const keys = Object.keys(resultPortada);
          if (keys.length > 0) {
            const url = resultPortada[keys[i]];
            const nombreArchivo = url.split("/").pop();
            setNombreVisuales(nombreArchivo);
          }
        }
        console.log(visuales)
      }

      if (resultPortada) {
        const keys = Object.keys(resultPortada);
        if (keys.length > 0) {
          const url = resultPortada[keys[0]];
          const nombreArchivo = url.split("/").pop();
          setNombrePortada(url);
        }
      }

      //DATOS
      if (resultProducto) {
        setValor(Number(resultProducto[0].precioProducto));
        setNombre(resultProducto[0].nombreProducto);
        setGarantia(resultProducto[0].garantiaProducto);
        setSelectedAdministrador(Number(resultProducto[0].idAdministrador_crear));
        setSelectedStock(Number(resultProducto[0].stock));
      }

      if (resultJuego) {
        setLanzamiento(resultJuego[0].anoLanzamiento);
        setDescripcion(resultJuego[0].descripcionJuego);
      }

      if (Array.isArray(resultMarca)) {
        setSeleccionadosMarca(
          resultMarca.map((marca: Aux_Marca) => marca.fk_pk_marca)
        );
      }

      if (Array.isArray(resultPlataforma)) {
        setSeleccionadosPlataforma(
          resultPlataforma.map((pla: Aux_Plataforma) => pla.idPlataforma)
        );
      }

      if (Array.isArray(resultGenero)) {
        setSeleccionadosGenero(
          resultGenero.map((gen: Aux_Genero) => gen.fk_pk_genero)
        );
      }
    }
  }

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    getProducto();
  }, [id]);

  const handlePortadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPortada(file);
      setNombrePortada(file.name);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPortada(file);
      setNombrePortada(file.name);
    }
  };

  const handleTrailerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTrailer(file);
      setNombreTrailer(file.name);
    }
  };

  const handleVisualesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setPortada(file);
    }
  };

  const handleTipoChange = () => {
    if (id) {
      Navigate(`/Administrador/Agregar_Consola/${id}`)
    } else {
      Navigate(`/Administrador/Agregar_Consola/`)
    }
  };

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opcionesSeleccionadas = Array.from(e.target.selectedOptions, option => option.value);
    setSeleccionadosMarca(opcionesSeleccionadas);
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(Number(e.target.value));
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };

  const handleLanzamientoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanzamiento(e.target.value);
  };

  const handleGarantiaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGarantia(e.target.value);
  };

  const handleAdministradorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAdministrador(Number(e.target.value));
  };

  const handlePlataformaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opcionesSeleccionadas = Array.from(e.target.selectedOptions, option => option.value);
    setSeleccionadosPlataforma(opcionesSeleccionadas);
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opcionesSeleccionadas = Array.from(e.target.selectedOptions, option => option.value);
    setSeleccionadosGenero(opcionesSeleccionadas);
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStock(Number(e.target.value));
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
      <h2 className="Titulo">Añadir Juego</h2>
      <form onSubmit={Agregar} method="post" encType="multipart/form-data">
        <div className="product-form">
          <div className="visuals">
            <div className="image-placeholder-left" style={{ height: "400px" }}>
              <div className="img-left">
                <label htmlFor="name">banner:</label>
                <input className="file-input" type="file" onChange={handleBannerChange}
                  style={{ width: "130px" }} />
              </div>
              <div className="img-left">
                <label htmlFor="name">visual1:</label>
                <input className="file-input" type="file" onChange={handleVisualesChange}
                  style={{ width: "130px" }} />
              </div>
              <div className="img-left">
                <label htmlFor="name">visual2:</label>
                <input className="file-input" type="file"  onChange={handleVisualesChange}
                  style={{ width: "130px" }} />
              </div>

              <div className="img-left">
                <label htmlFor="name">visual3:</label>
                <input className="file-input" type="file" onChange={handleVisualesChange}
                  style={{ width: "130px" }} />
              </div>

              <div className="img-left">
                <label htmlFor="name">trailer:</label>
                <input className="file-input" type="file" onChange={handleTrailerChange}
                  style={{ width: "130px" }} />
              </div>
            </div>
            <div className="image-placeholder">
              <label htmlFor="name">portada:</label>
              <input className="file-input" type="file" onChange={handlePortadaChange}
                  style={{ width: "130px" }} />
            </div>
          </div>
          <div className="product-details">
            <label htmlFor="product-type">Tipo de producto:</label>
            <select id="product-type" name="tipoproducto" onChange={handleTipoChange}>
              <option value="Videojuego">Videojuego</option>
              <option value="Consola">Consola</option>
            </select>

            <label htmlFor="developer">Marca:</label>
            <select multiple value={seleccionadosMarca} onChange={handleMarcaChange}>
              {dataM.map((mar) => (
                <option key={mar.idMarca} value={mar.idMarca}>
                  {mar.idMarca}
                </option>))}
            </select>
            <span className="spanSelectMultiple">Ctrl + Click para más de una opcion</span>

            <label htmlFor="price">Valor:</label>
            <input type="text" value={valor} onChange={handleValorChange} />


            <label htmlFor="name">Nombre Juego:</label>
            <input type="text" value={nombre} onChange={handleNombreChange} />

            <label htmlFor="lanzamiento">Año de lanzamiento:</label>
            <input type="date" value={lanzamiento} onChange={handleLanzamientoChange} />


          </div>
          <div className="product-details2">
            <label htmlFor="garantia">Garantia Juego</label>
            <input type="text" value={garantia} onChange={handleGarantiaChange} />

            <label htmlFor="administrador">Administardor Encargado:</label>
            <select id="developer" name="admin" value={selectedAdministrador} onChange={handleAdministradorChange}>
              {dataA.map((Admin) => (
                <option key={Admin.idAdministrador} value={Admin.idAdministrador}>
                  {Admin.idAdministrador} - {Admin.nombreUsuario} {Admin.apellidoUsuario}
                </option>))}
            </select>

            <label htmlFor="plataforma">Plataforma:</label>
            <select multiple value={seleccionadosPlataforma} onChange={handlePlataformaChange}>
              {dataP.map((Pla) => (
                <option key={Pla.idPlataforma} value={Pla.idPlataforma}>
                  {Pla.idPlataforma}
                </option>))}
            </select>
            <span className="spanSelectMultiple">Ctrl + Click para más de una opcion</span>

            <label htmlFor="genero">Genero:</label>
            <select value={seleccionadosGenero} multiple onChange={handleGeneroChange}>
              {dataG.map((Gen) => (
                <option key={Gen.idGeneroJuego} value={Gen.idGeneroJuego}>
                  {Gen.idGeneroJuego}
                </option>))}
            </select>
            <span className="spanSelectMultiple">Ctrl + Click para más de una opcion</span>

            <label htmlFor="stock">Stock</label>
            <select value={selectedStock} onChange={handleStockChange}>
              <option value={1}>
                Activo
              </option>
              <option value={0}>
                Inactivo
              </option>
            </select>
          </div>
        </div>
        <h3 className="Subtitulo">Acerca de:</h3>
        <div className="about-section">
          <div className="container-description">
            <h5>Sobre el Juego:</h5>
            <textarea name="sobreJuego" id="sobreJuego" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
          </div>
        </div>
        <button name="submit" className="button">Añadir Producto</button>

      </form>
    </main>
  ) 
}
export default AgregarJuegos;  