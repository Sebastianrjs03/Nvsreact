import FormaPago from '../../../pages/admin/Facturas/FormaPago';
import Usuario from '../../../pages/admin/Usuarios/Usuario';
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
    ivaProducto: number;
    garantiaProducto: string;
    idTipoProducto: string;
    idAdministrador_crear: number;
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