import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import TodosPage from "../features/todos/pages/TodosPage";
import AuthCallback from "../features/auth/pages/AuthCallback";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import { Toaster } from "sonner";

export default function AppRoutes() {
    return (
        <>
        <Toaster position="top-center" richColors />
        <Routes>

        {/* Forgot Password and Reset Password Routes */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
            <Route path="/todos" element={<TodosPage />} />
            {/* Add more protected pages here later */}
        </Route>

        {/* OAuth redirect callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </>
    );
}
