import { render, screen } from '@test/__tests__/testUtils';
import '@testing-library/jest-dom';
import Loading from './index';
import React from 'react';

describe('Loading', () => {
    it('renders correctly', () => {
        render(<Loading />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with custom size', () => {
        render(<Loading size={40} />);
        const loader = screen.getByRole('progressbar');
        expect(loader).toHaveStyle({ width: '40px', height: '40px' });
    });

    it('renders with custom color', () => {
        render(<Loading color="secondary" />);
        const loader = screen.getByRole('progressbar');
        expect(loader).toHaveClass('MuiCircularProgress-colorSecondary');
    });

    it('applies custom className', () => {
        render(<Loading className="custom-loader" />);
        expect(screen.getByRole('progressbar').parentElement).toHaveClass('custom-loader');
    });

    it('renders with overlay when specified', () => {
        render(<Loading overlay />);
        expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
        expect(screen.getByTestId('loading-overlay')).toHaveStyle({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        });
    });

    it('centers content when centered prop is true', () => {
        render(<Loading centered />);
        expect(screen.getByTestId('loading-container')).toHaveStyle({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        });
    });
}); 