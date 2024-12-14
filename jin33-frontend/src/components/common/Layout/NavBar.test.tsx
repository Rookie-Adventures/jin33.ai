import { render, screen, fireEvent } from '@test/__tests__/testUtils';
import '@testing-library/jest-dom';
import NavBar from './NavBar';
import React from 'react';

describe('NavBar', () => {
    it('renders correctly', () => {
        render(<NavBar />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders logo/brand name', () => {
        render(<NavBar />);
        expect(screen.getByRole('link', { name: /jin33/i })).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<NavBar />);
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /chat/i })).toBeInTheDocument();
    });

    it('handles mobile menu toggle', () => {
        render(<NavBar />);
        const menuButton = screen.getByRole('button', { name: /menu/i });
        expect(menuButton).toBeInTheDocument();

        fireEvent.click(menuButton);
        // 检查移动菜单是否显示
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
        render(<NavBar className="custom-nav" />);
        expect(screen.getByRole('navigation')).toHaveClass('custom-nav');
    });

    it('handles user menu interactions', () => {
        render(<NavBar />);
        const userButton = screen.getByRole('button', { name: /user menu/i });

        fireEvent.click(userButton);
        expect(screen.getByRole('menu')).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    });
}); 