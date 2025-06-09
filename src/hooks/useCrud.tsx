//librerias
import Swal from 'sweetalert2';

//Types
import { ModelBase } from '../components/Admin/Types/TypesDatos';

//hooks
 import { ApiPrivate } from './UseFetch';
 
 export const Delete = ( id: string | number, nombre: string, get: () => void, endpoint: string, id2?: string | number, nombre2?: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if(id2 && nombre2){
          const PK:ModelBase = {
          id1: id,
          nombre1: nombre,
          id2: id2,
          nombre2: nombre2};
          deleteFetch(PK , get, endpoint);
          } else {
            const PK:ModelBase = {
            id1: id,
            nombre1: nombre,
          }
          deleteFetch(PK , get, endpoint);
        }
        
      }
    });
  };

  const deleteFetch = async (PK: ModelBase, get: () => void, endpoint: string) => {
      const nombre = PK.nombre1;
      const response = await ApiPrivate(endpoint, PK);
      if (response?.error) {
        Swal.fire({
          icon: "error",
          title: "Acción fallida",
          text: response.mensaje,
        });
      } else {
        Swal.fire('Eliminado', `Se elimino el ${nombre} correctamente` , 'success');
        get();
      }
    }
  