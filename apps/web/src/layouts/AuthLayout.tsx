import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  max-width: 480px;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing[6]};
    border: none;
    box-shadow: none;
    background: transparent;
  }
`;

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Card><>{children}</></Card>
    </Container>
  );
};
