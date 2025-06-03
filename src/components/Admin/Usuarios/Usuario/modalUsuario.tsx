//hooks
import { useState, useEffect } from "react";
import { ApiPrivate, ApiPublic } from '../../../../hooks/UseFetch';
//librerias
import Swal from "sweetalert2";
//types
import { Usuario, Cliente, Rol, Administrador, TipoDoc } from "./../../Types/TypesDatos";

interface MyModalProps {
  get: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsuarioB?: React.Dispatch<React.SetStateAction<Usuario | null>>;
  idUsuario?: number;
  modal: string;
}
const ExampleModal: React.FC<MyModalProps> = ({ idUsuario, setIsOpen, setUsuarioB, modal, get }) => {

  const [Usuario, setUsuario] = useState<Usuario | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [Administrador, setAdministrador] = useState<Administrador | null>(null);
  const [tipoDoc, setTipoDoc] = useState<TipoDoc[]>([]);
  const [Rol, setRol] = useState<Rol[]>([]);
  const [nombre, setNombre] = useState("");
  const [seNombre, setSeNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [seApellido, setSeApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [Ccontrasena, setCcontrasena] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [documentoA, setDocumentoA] = useState("");
  const [direccion, setDireccion] = useState("");
  const [complemento, setComplemento] = useState("");
  const [tipoDocSeleccionado, setTipoDocSeleccionado] = useState<string | undefined>("");
  const [RolSeleccionado, setRolSeleccionado] = useState<number | undefined>(0);


  useEffect(() => {
    const FetchUsuario = async () => {
      try {
        const resultT = await ApiPublic("Consultar_TipoDoc");

        if (resultT) {
          setTipoDoc(resultT);
        } else {
          console.error('No se recibieron datos o los datos están en un formato inesperado');
        }
        if (modal === "Editar") {
          const resultU = await ApiPublic("ConsultarPorID_UsuarioAdmin",
            {
              id1: idUsuario,
              nombre1: "idUsuario",
            }
          )
          if (resultU) {
            setUsuario(resultU[0]);
          }
        } else {
          const result = await ApiPublic("Consultar_Rol");

          if (result) {
            setRol(result[0]);
          } else {
            console.error('No se recibieron datos o los datos están en un formato inesperado');
          }
        }
      } catch (error) {
        console.error('Error cargando Usuarios, clientes y Administradores:', error);
      }
    };
    FetchUsuario();
  }, []);

  useEffect(() => {
    const FetchUsu = async () => {
      if (Usuario) {
        setNombre(Usuario.nombreUsuario);
        setSeNombre(Usuario.senombreUsuario);
        setApellido(Usuario.apellidoUsuario);
        setSeApellido(Usuario.seapellidoUsuario);
        setCorreo(Usuario.correoUsuario);
        setCelular(Usuario.celularUsuario);
        setContrasena(Usuario.contrasenaUsuario);
        setRolSeleccionado(Usuario.idRol);
        if (Usuario.idRol == 1) {
          const resultC = await ApiPublic("ConsultarPorID_Cliente",
            {
              id1: idUsuario,
              nombre1: "idCliente",
            }
          )
          if (resultC) {
            setCliente(resultC[0]);
          }
        } else {
          const resultA = await ApiPublic("ConsultarPorID_Administrador",
            {
              id1: idUsuario,
              nombre1: "idAdministrador",
            }
          )
          if (resultA) {
            setAdministrador(resultA[0]);
          }
        }
      }
    };
    FetchUsu();
  }, [Usuario]);

  useEffect(() => {
    if (cliente) {
      setDireccion(cliente.direccion)
      setComplemento(cliente.complemento)
    }

    if (Administrador) {
      setDocumentoA(Administrador.documentoAdministrador)
      setTipoDocSeleccionado(Administrador.pf_fk_tdoc)
    }
  }, [cliente, Administrador]);

  const handleRolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRolSeleccionado(Number(e.target.value));
  };

  const handleTipoDocChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoDocSeleccionado(e.target.value);
  };

  const Validar = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(contrasena)
    console.log(Ccontrasena)
    e.preventDefault();
    const data = {
      id: idUsuario,
      nombre: nombre,
      segundoNombre: seNombre,
      apellido: apellido,
      segundoApellido: seApellido,
      correo: correo,
      celular: celular,
      contrasena: contrasena,
      idRol: RolSeleccionado,
    };

    if (nombre == "" || seNombre == "" || apellido == "" || seApellido == "" || correo == "" || celular == "" || RolSeleccionado == 0) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "complete todos los campos",
      });
      return;
    } else if (modal === "Agregar") {
      if (contrasena == "" || Ccontrasena == "" ) {
        Swal.fire({
          icon: "error",
          title: "Acción fallida",
          text: "complete todos los campos",
        });
        return;
      } else if (contrasena !== Ccontrasena) {
        Swal.fire({
          icon: "error",
          title: "Acción fallida",
          text: "Contraseñas no coinciden",
        });
        return;
      }
    }
    if (RolSeleccionado == 1) {
      if (direccion == "") {
        Swal.fire({
          icon: "error",
          title: "Acción fallida",
          text: "direccion o complemento en blanco",
        }); return;
      }
      const actualizado = { ...data, direccion: direccion, complemento: complemento };
      if (modal === "Agregar") {
        Agregar(actualizado);
      } else if (modal === "Editar") {
        Editar(actualizado);
      }
    } else {
      if (documentoA == "" || tipoDocSeleccionado == "") {
        Swal.fire({
          icon: "error",
          title: "Acción fallida",
          text: "documento en blanco o tipo de documento sin seleccionar",
        }); return;
      }
      const actualizado = { ...data, documentoAdministrador: documentoA, tipoDoc: tipoDocSeleccionado };
      if (modal === "Agregar") {
        Agregar(actualizado);
      } else if (modal === "Editar") {
        Editar(actualizado);
      }
    }
  };

  const Agregar = async (data: any) => {
    const response = await ApiPrivate("Crear_UsuarioAdmin", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Usuario registrada",
      }).then(async () => {
        get();
        if (setUsuarioB) {
          setUsuarioB(null);
        }
        setIsOpen(false);
      });
    } else if (!response) {
      if (setUsuarioB) {
        setUsuarioB(null);
      }
      setIsOpen(false);
      get();
    }
  }

  const Editar = async (data: any) => {
    const response = await ApiPrivate("Editar_UsuarioAdmin", data);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Acción exitosa",
        text: "Usuario Editada",
      }).then(async () => {
        if (setUsuarioB) {
          setUsuarioB(null);
        }
        setIsOpen(false);
        get();
      });
    } else if (!response) {
      Swal.fire({
        icon: "error",
        title: "Acción fallida",
        text: "Usuario no Editada",
      }).then(() => {
        if (setUsuarioB) {
          setUsuarioB(null);
        }
        setIsOpen(false);
      });
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal_content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: "5px" }}>{modal} Usuario</h1>
          <button type="button" className="btn-close" onClick={() => { setIsOpen(false); if (setUsuarioB) { setUsuarioB(null) } }} aria-label="Close" style={{ marginLeft: "53%" }}></button>
        </div>
        <hr />
        <div className="modal-body" style={{ marginLeft: "15px" }}>
          <form onSubmit={Validar} encType="multipart/form-data">
            <div className="form-group row">
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Nombre Usuario</label>
                  <input type="text" className="form-control shadow-none" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Segundo Nombre</label>
                  <input type="text" className="form-control shadow-none" value={seNombre} onChange={(e) => setSeNombre(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Apellido Usuario</label>
                  <input type="text" className="form-control shadow-none" value={apellido} onChange={(e) => setApellido(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Segundo Apellido</label>
                  <input type="text" className="form-control shadow-none" value={seApellido} onChange={(e) => setSeApellido(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Correo Usuario</label>
                  <input type="email" className="form-control shadow-none" value={correo} onChange={(e) => setCorreo(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Celular Usuario</label>
                  <input type="number" className="form-control shadow-none" value={celular} onChange={(e) => setCelular(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
              </div>
              {modal === "Agregar" && <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Contraseña Usuario</label>
                  <input type="password" className="form-control shadow-none" value={contrasena} onChange={(e) => setContrasena(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label htmlFor="formGroupExampleInput">Confirmar Contraseña</label>
                  <input type="password" className="form-control shadow-none" value={Ccontrasena} onChange={(e) => setCcontrasena(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                </div>
              </div>}
              <div className="row" style={{ marginBottom: "12px" }}>
                <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center", marginBottom: "10px" }} value={RolSeleccionado ?? ''} onChange={handleRolChange}>
                    {RolSeleccionado == 0 ? <option value="">Seleccione un Rol</option> : <option value={RolSeleccionado}>{RolSeleccionado == 1 ? <p>Usuario</p> : <p>Administrador</p>}</option>}
                    {RolSeleccionado
                      ? Rol
                        .filter((rol) => rol.idRol !== RolSeleccionado)
                        .map((rol) => (
                          <option key={rol.idRol} value={rol.idRol}>
                            {rol.descRol}
                          </option>
                        )) : Rol.map((rol) => (
                          <option key={rol.idRol} value={rol.idRol}>
                            {rol.descRol}
                          </option>
                        ))
                    }
                  </select>
                </div>
              </div>
              {RolSeleccionado == 1 ?
                <div className="row" style={{ marginBottom: "12px" }}>
                  <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label htmlFor="formGroupExampleInput">Direccion Cliente</label>
                    <input type="text" className="form-control shadow-none" value={direccion} onChange={(e) => setDireccion(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                  </div>
                  <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label htmlFor="formGroupExampleInput">Complemento Direccion</label>
                    <input type="text" className="form-control shadow-none" value={complemento} onChange={(e) => setComplemento(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                  </div>
                </div>
                : RolSeleccionado == 2 ?
                  <div className="row" style={{ marginBottom: "12px" }}>
                    <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <label htmlFor="formGroupExampleInput">Numero de Documento</label>
                      <input type="number" className="form-control shadow-none" value={documentoA} onChange={(e) => setDocumentoA(e.target.value)} onFocus={(e) => { if (e.target.value === "0") { e.target.value = ""; } }} />
                    </div>
                    <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "end", marginBottom: "3px" }}>
                      <label htmlFor="formGroupExampleInput">Seleccione</label>
                      <select className="form-select" aria-label="Default select example" style={{ backgroundColor: "lightgray", alignItems: "center" }} value={tipoDocSeleccionado ?? ''} onChange={handleTipoDocChange}>
                        {tipoDocSeleccionado == "" ? <option value="">Tipo Documento</option> : <option value={tipoDocSeleccionado}>{tipoDocSeleccionado}</option>}
                        {tipoDocSeleccionado
                          ? tipoDoc
                            .filter((tipo) => tipo.t_doc !== tipoDocSeleccionado)
                            .map((tipo) => (
                              <option key={tipo.t_doc} value={tipo.t_doc}>
                                {tipo.desc_tdoc}
                              </option>
                            )) :
                          tipoDoc
                            .map((tipo) => (
                              <option key={tipo.t_doc} value={tipo.t_doc}>
                                {tipo.desc_tdoc}
                              </option>
                            ))
                        }
                      </select>
                    </div>
                  </div>
                  :
                  <div className="row" style={{ marginBottom: "12px" }}>
                    <div className="col" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p>Escoge un rol</p>
                    </div>
                  </div>
              }
              <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center", gap: "35px" }}>
                  <button type="button" onClick={() => { setIsOpen(false); if (setUsuarioB) { setUsuarioB(null) } }}>Cerrar</button>
                  <button type="submit" className="btn btn-primary btn-ms">Guardar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExampleModal