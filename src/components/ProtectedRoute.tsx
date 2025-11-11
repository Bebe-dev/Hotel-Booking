import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
//import type { JSX } from "react";
import React from "react";

type Props = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {

    const [user, loading] = useAuthState(auth)

    if (loading) return <p>Loading...</p>
    if (!user) return <Navigate to="/login" replace/>


    return children
}