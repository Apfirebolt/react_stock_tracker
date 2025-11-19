import React from 'react';
import { render, screen } from '@testing-library/react';
import AppFooter from '../components/Footer';

describe('AppFooter', () => {
    it('should render the footer component', () => {
        render(<AppFooter />);
        const footerElement = screen.getByText(/Stock Tracker App/i);
        expect(footerElement).toBeInTheDocument();
    });

    it('should display the current year', () => {
        render(<AppFooter />);
        const currentYear = new Date().getFullYear();
        const footerElement = screen.getByText(new RegExp(`Stock Tracker App ©${currentYear}`, 'i'));
        expect(footerElement).toBeInTheDocument();
    });

    it('should display the creator name', () => {
        render(<AppFooter />);
        const footerElement = screen.getByText(/Created by Amit/i);
        expect(footerElement).toBeInTheDocument();
    });

    it('should apply center text alignment style', () => {
        const { container } = render(<AppFooter />);
        const footer = container.querySelector('footer');
        expect(footer).toHaveStyle({ textAlign: 'center' });
    });

    it('should render with Ant Design Footer component', () => {
        const { container } = render(<AppFooter />);
        const footer = container.querySelector('footer');
        expect(footer).toBeInTheDocument();
        expect(footer?.className).toContain('ant-layout-footer');
    });
});