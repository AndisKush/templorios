import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Button } from '@andisds/ui';
import { LayoutDashboard, Users, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

const UserInfo = styled.div`
  text-align: right;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const getMenuItems = () => {
        // Itens comuns ou baseados em role
        if (user?.role === UserRole.ADMIN) {
            return [
                {
                    id: 'admin-dashboard',
                    label: 'Dashboard',
                    icon: <LayoutDashboard size={20} />,
                    path: '/admin/dashboard',
                },
                {
                    id: 'users',
                    label: 'Usuários',
                    icon: <Users size={20} />,
                    path: '/admin/users',
                },
            ];
        }

        return [
            {
                id: 'user-dashboard',
                label: 'Dashboard',
                icon: <LayoutDashboard size={20} />,
                path: '/dashboard',
            },
            {
                id: 'events',
                label: 'Eventos',
                icon: <Calendar size={20} />,
                path: '/events',
            },
        ];
    };

    const menuItems = getMenuItems();

    const handleNavigate = (item: any) => {
        if (item.path) {
            navigate(item.path);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const HeaderContent = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>LinkService</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{user?.role === UserRole.ADMIN ? 'Administração' : 'Portal do Usuário'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <UserInfo>
                    <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7 }}>{user?.email}</span>
                </UserInfo>

                <Button variant="ghost" onClick={handleLogout} style={{ padding: 8 }}>
                    <LogOut size={18} />
                </Button>
            </div>
        </div>
    );

    return (
        <AppShell
            menuItems={menuItems}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            onNavigate={handleNavigate}
            headerContent={HeaderContent}
        >
            <Outlet />
        </AppShell>
    );
};
