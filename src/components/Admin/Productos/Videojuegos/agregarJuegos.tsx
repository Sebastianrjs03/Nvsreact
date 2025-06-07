//css
import "../../../../styles/admin/admin-productos.css"

//librerias
import Swal from "sweetalert2";

//components
import VerImagenes from "../Producto/verImagenes";

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

  const [portada, setPortada] = useState<File | string>("");
  const [banner, setBanner] = useState<File | string>("");
  const [visual1, setVisual1] = useState<File | string>("");
  const [visual2, setVisual2] = useState<File | string>("");
  const [visual3, setVisual3] = useState<File | string>("");
  const [trailer, setTrailer] = useState<File | string>("");

  const [tipo, setTipo] = useState<string>("Videojuego");
  const [valor, setValor] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [lanzamiento, setLanzamiento] = useState<string>("");
  const [cantidad, setCantidad] = useState<number>(0);
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

      //DATOS
      const resultProducto = await ApiPublic("ConsultarPorID_Producto", { id1: id, nombre1: "idProducto" });
      const resultJuego = await ApiPublic("ConsultarPorID_Juego", { id1: id, nombre1: "idJuego" });
      const resultMarca = await ApiPublic("ConsultarPorID_AuxMarca", { id1: id, nombre1: "fk_pk_producto" });
      const resultPlataforma = await ApiPublic("ConsultarPorID_AuxPlataforma", { id1: id, nombre1: "idJuego" });
      const resultGenero = await ApiPublic("ConsultarPorID_AuxGenero", { id1: id, nombre1: "fk_pk_juego" });

      //DATOS
      if (resultProducto) {
        setValor(Number(resultProducto[0].precioProducto));
        setNombre(resultProducto[0].nombreProducto);
        setGarantia(resultProducto[0].garantiaProducto);
        setCantidad(resultProducto[0].cantidad);
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

  const handleTipoChange = () => {
    if (id) {
      Navigate(`/Administrador/Agregar_Juego/${id}`)
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Para cambiar el tipo del producto debera crear uno nuevo",
      });
      setTipo("Videojuegos")
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

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantidad(Number(e.target.value));
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

  const Validar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!portada || !banner || !visual1 || !visual2 || !visual3 || !trailer) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar una imagen, Alguna esta vacia."
      });
      return;
    } else if (!tipo || !valor || !nombre || !lanzamiento || !descripcion || !garantia || !cantidad) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes completar los campos de texto, Alguno esta vacio."
      });
      return;
    } else if (!selectedStock || !selectedAdministrador) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes completar las listas de opcion unica, Alguna esta vacia."
      });
      return;
    } else if (!seleccionadosGenero || !seleccionadosMarca || !seleccionadosPlataforma) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar por lo menos una opcion en las listas de opcion multiple."
      });
      return;
    }
    const formData = new FormData();

    if (tipo) formData.append('idTipoProducto', tipo);

    if (portada instanceof File) formData.append("portada", portada);
    if (visual1 instanceof File) formData.append("visual1", visual1);
    if (visual2 instanceof File) formData.append("visual2", visual2);
    if (visual3 instanceof File) formData.append("visual3", visual3);
    if (trailer instanceof File) formData.append("trailer", trailer);
    if (banner instanceof File) formData.append("banner", banner);

    if (nombre) formData.append("nombreProducto", nombre);
    if (valor) formData.append("precioProducto", valor.toString());
    if (garantia) formData.append("garantiaProducto", garantia);
    if (selectedAdministrador) formData.append("idAdmin", selectedAdministrador.toString());
    if (selectedStock) formData.append("stock", selectedStock.toString());
    if (cantidad) formData.append("cantidad", cantidad.toString());
    if (lanzamiento) formData.append("lanzamiento", lanzamiento);
    if (descripcion) formData.append("sobreJuego", descripcion);

    if (seleccionadosMarca) {
      seleccionadosMarca.forEach((mar) => (
        formData.append("marca[]", mar)
      ))
    };

    if (seleccionadosPlataforma) {
      seleccionadosPlataforma.forEach((pla) => (
        formData.append("plataforma[]", pla)
      ))
    };

    if (seleccionadosGenero) {
      seleccionadosGenero.forEach((gen) => (
        formData.append("genero[]", gen)
      ))
    };

    if (id) {
      const response = await ApiPrivate("Editar_Producto", formData)
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Acción exitosa",
          text: "se ha creado un nuevo elemento de distraccion para personas descupadas"
        }).then(() => {
          Navigate("/Administrador/Productos/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Acción Fallida",
          text: "No se agrego el producto",
        })
      }
    } else {
      const response = await ApiPrivate("Crear_Producto", formData)
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Acción exitosa",
          text: "se ha creado un nuevo elemento de distraccion para personas descupadas",
        }).then(() => {
          Navigate("/Administrador/Productos/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Acción Fallida",
          text: "No se agrego el producto",
        })
      }
    }
  }

  return (
    <main className="main_content">
      <h2 className="Titulo">{id ? "Editar" : "Añadir"} Juego</h2>
      <form onSubmit={Validar} method="post" encType="multipart/form-data">
        <div className="product-form">
          <VerImagenes id={id}
            setPortada={setPortada}
            setVisual1={setVisual1}
            setVisual2={setVisual2}
            setVisual3={setVisual3}
            setBanner={setBanner}
            setTrailer={setTrailer}
            Tipo="Juego" />
          <div className="product-details">
            <label htmlFor="product-type">Tipo de producto:</label>
            <select id="product-type" name="tipoproducto" value={tipo} onChange={handleTipoChange}>
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

            <label htmlFor="Cantidad">Cantidad:</label>
            <input type="number" value={cantidad} onChange={handleCantidadChange} />
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
        <section className="ButtonSubmit">
          <button className="button   ">{id ? "Editar" : "Agregar"} Producto</button>
        </section>
      </form>
    </main>
  )
}
export default AgregarJuegos;  