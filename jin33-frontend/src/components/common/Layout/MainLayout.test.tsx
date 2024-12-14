import { render, screen } from '@test/__tests__/testUtils';
import '@testing-library/jest-dom';
import MainLayout from './MainLayout';
import React from 'react';

describe('MainLayout', () => {
    it('renders children correctly', () => {
        render(
            <MainLayout>
                <div data-testid="test-content">Test Content</div>
            </MainLayout>
        );
        expect(screen.getByTestId('test-content')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders with correct structure', () => {
        render(
            <MainLayout>
                <div>Content</div>
            </MainLayout>
        );
        // 检查主要容器是否存在
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
        render(
            <MainLayout className="custom-layout">
                <div>Content</div>
            </MainLayout>
        );
        expect(screen.getByRole('main')).toHaveClass('custom-layout');
    });
}); 