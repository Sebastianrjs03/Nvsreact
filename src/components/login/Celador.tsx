// src/components/RutaProtegida.jsx
import { Navigate } from 'react-router-dom';

interface CeladorProps {
    children: React.ReactNode;
    rolPermitido: string;
    }   

const Celador = ({ children, rolPermitido}: CeladorProps) => {
  const token = sessionStorage.getItem('token');
  const rol = sessionStorage.getItem('rol');

  if (!token || rol !== rolPermitido) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Celador;
