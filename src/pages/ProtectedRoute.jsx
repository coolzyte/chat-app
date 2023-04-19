import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
  const { accountHolder } = useAppContext();
  if (!accountHolder) {
    return <Navigate to='/login' />;
  }
  return children;
};
export default ProtectedRoute;
