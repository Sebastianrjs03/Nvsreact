import FormaPago from '../../../pages/admin/Facturas/FormaPago';
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