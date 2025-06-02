import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService.js';

function ProtectedRoute({ children, allowedRoles = [] }) {
    const currentUser = getCurrentUser();
    
    // If no user is logged in, redirect to login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    
    // If allowedRoles is specified and user's role is not in the list, redirect to login
    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/login" replace />;
    }
    
    // User is authenticated and authorized
    return children;
}

export default ProtectedRoute;