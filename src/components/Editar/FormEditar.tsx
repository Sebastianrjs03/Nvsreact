import "../../styles/Perfil/FormEditar.css";

type FormEditarProps = {
  tipoBotones: string;
  placeholder1: string;
  name1: string;
  placeholder2: string;
  name2: string;
};

function FormEditar( {tipoBotones, placeholder1, name1, placeholder2, name2}: FormEditarProps) {
  return (
    <div className="formEditar-container">
      <form className="formEditar-form">
        <input type={tipoBotones} placeholder={placeholder1} name={name1} />
        <input type={tipoBotones} placeholder={placeholder2} name={name2} />
        <input type="password" placeholder="Contraseña" name="contrasena" />
      </form>

      <button className="formEditar-button">Aceptar</button>
    </div>
  );
}

export default FormEditar;
