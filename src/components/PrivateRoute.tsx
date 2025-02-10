import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SimpleLoader from './SimpleLoader/SimpleLoader';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SimpleLoader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 