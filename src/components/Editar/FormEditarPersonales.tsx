import "../../styles/Perfil/FormEditarPersonales.css";

type FormEditarPersonalesProps = {
  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;
  value5?: string;
};


function FormEditarPersonales({value1, value2, value3, value4, value5}: FormEditarPersonalesProps) {
  return (
    <div className="formEditarPersonales-container">
      <form className="formEditarPersonales-form">
        <input type="" placeholder="Nombre" name="" defaultValue={value1}/>
        <input type="" placeholder="Segundo Nombre" name="" defaultValue={value2}/>
        <input type="" placeholder="Apellido" name="" defaultValue={value3} />
        <input type="" placeholder="Segundo Apellido" name="" defaultValue={value4} />
        
        <input className="form-password" type="number" placeholder="Numero de Celular" name="contrasena" defaultValue={value5} />
        <input className="form-password" type="password" placeholder="Contraseña" name="contrasena" />
      </form>

      <button className="formEditarPersonales-button">Aceptar</button>
    </div>
  );
}

export default FormEditarPersonales;
