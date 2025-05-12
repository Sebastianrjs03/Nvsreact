import React from 'react';

const Form = () => {
  return (
    <form>
      <input 
        type="email" 
        placeholder="Email" 
        id="mail" 
        name="mail" 
      />
      <button className="buttom" type="submit">
        Recuperar contraseña
      </button>
    </form>
  );
};

export default Form;
