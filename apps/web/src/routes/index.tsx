import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../types';

// Layouts
import { DashboardLayout } from '../layouts/DashboardLayout';

// Components
import { PrivateRoute } from '../components/PrivateRoute';

// Auth Pages
import { Login } from '../pages/auth/Login';

// Admin Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { UsersList } from '../pages/admin/Users';
import { UserForm } from '../pages/admin/UserForm';

// User Pages
import { UserDashboard } from '../pages/user/Dashboard';
import { EventsList } from '../pages/user/Events';
import { EventForm } from '../pages/user/EventForm';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UsersList />} />
                <Route path="users/new" element={<UserForm />} />
                <Route path="users/:id/edit" element={<UserForm />} />
                {/* Redirecionar /admin para dashboard */}
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            {/* User Routes */}
            <Route
                path="/"
                element={
                    <PrivateRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]}>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="events" element={<EventsList />} />
                <Route path="events/new" element={<EventForm />} />
                <Route path="events/:id/edit" element={<EventForm />} />

                {/* Rota raiz autenticada redireciona baseada no role - isso já é tratado no PrivateRoute se acessar direto
            Mas se cair aqui com path="/" e for USER...
        */}
                <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
