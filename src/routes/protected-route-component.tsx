import {Navigate} from 'react-router-dom';
import {useAuthContext} from '../providers';


export const ProtectedRoute = ({element}) => {
  const {isAuthenticated} = useAuthContext();

  return isAuthenticated ? element : <Navigate to="/sign-in"/>;
};