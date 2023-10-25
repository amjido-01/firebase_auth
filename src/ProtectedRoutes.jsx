import { Outlet, Navigate} from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';

export const ProtectedRoutes = () => {
    const {currentUser} = useAuth()
    return  currentUser ? <Outlet/> : <Navigate to="/login" />;
}
