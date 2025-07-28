import type { JSX } from "react";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.vai_tro !== "quan_tri") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequireAdminAuth;
