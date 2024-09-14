import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthType } from '../Context/AuthContext'

export const ProtectedRoute = () => {
    const { auth } = useContext(AuthContext)as { auth: AuthType | null };
    return auth?.role ? <Outlet /> : <Navigate to="/login" />;
};

export const LogedUsers = () => {
    const { auth } = useContext(AuthContext)as { auth: AuthType | null };
    return !auth?.role ? <Outlet /> : <Navigate to="/" />;
};

export const AdminRoutes = () => {
    const { auth } = useContext(AuthContext) as { auth: AuthType | null };
    console.log(auth)
    return auth?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};