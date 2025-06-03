export interface ModelBase {
  id1: string | number;
  nombre1: string;
  id2?: string | number;
  nombre2?: string;
}

export interface Calificacion {
    idCliente: number;
    idProducto: number;
    numeroCalificacion: number;
    comentarioCalificacion: string;
  }

export interface Cliente {
    idCliente: number;
    direccion: string;
    complemento: string;
  }

export interface ProductoA {
    idProducto: number;
    nombreProducto: string;
    precioProducto: number;
    garantiaProducto: string;
    idTipoProducto: string;
    idAdministrador_crear: number;
    cantidad: number;
    stock: number;
  }

export interface FormaPago {
  idFormaPago: string,
  estadoMetodoPago: number;
}

export interface Factura {
  idFactura: number,
  fechaFactura: Date,
  iva: number,
  base: number,
  totalCompra: number,
  idCliente: number,
  idFormaPago: string,
}

export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  senombreUsuario: string;
  apellidoUsuario: string;
  seapellidoUsuario: string;
  correoUsuario: string;
  celularUsuario: string;
  contrasenaUsuario: string;
  idRol: number;
}

export interface Administrador {
  idAdministrador: number;
  documentoAdministrador: string;
  pf_fk_tdoc: string;
}

export interface Rol {
  idRol: number;
  descRol: string;
}

export interface TipoDoc {
  t_doc: string;
  desc_tdoc: string;
  estado_tdoc: number;
}

export interface DetaFactura {
  fk_pk_Factura : number,
  fk_pk_Producto: number,
  cantidadProducto: number,
  valorUnitarioProducto: number,
  totalProducto: number,
}

export interface Genero {
  idGeneroJuego: string,
  estadoGeneroJuego: number;
}

export interface Plataforma {
  idPlataforma: string,
  estadoPlataforma: number,
}

export interface Juego {
  idJuego: number;
  anoLanzamiento: string;
  descripcionJuego: string;
}

export interface Consola {
  idConsola: number,
  sobreConsola: string,
}

export interface Marca {
  idMarca: string,
  estado_marca: number,
}

export interface AdministradorCon {
  idAdministrador: number;
  documentoAdministrador: string;
  pf_fk_tdoc: string;
  nombreUsuario: string;
  apellidoUsuario: string;
}

export interface Aux_Marca {
  fk_pk_producto: number,
  fk_pk_marca: string,
}

export interface Aux_Plataforma {
  idJuego: number,
  idPlataforma: string,
}

export interface Aux_Genero {
  fk_pk_juego: number,
  fk_pk_genero: string,
}