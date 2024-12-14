import { render, screen, fireEvent } from '@test/__tests__/testUtils';
import '@testing-library/jest-dom';
import Input from './index';
import React from 'react';

describe('Input', () => {
    it('renders correctly with default props', () => {
        render(<Input label="Username" />);
        const input = screen.getByLabelText(/username/i);
        expect(input).toBeInTheDocument();
        expect(input.closest('.MuiTextField-root')).toHaveClass('MuiTextField-root');
        // 默认应该是outlined variant
        expect(input.closest('.MuiTextField-root')).toHaveClass('MuiOutlinedInput-root');
    });

    it('handles value changes', () => {
        const handleChange = jest.fn();
        render(<Input label="Username" onChange={handleChange} />);
        const input = screen.getByLabelText(/username/i);
        fireEvent.change(input, { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalled();
        expect((input as HTMLInputElement).value).toBe('test');
    });

    it('shows error message when error prop is provided', () => {
        const errorMessage = 'This field is required';
        render(<Input label="Username" error helperText={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i).closest('.MuiFormControl-root')).toHaveClass('Mui-error');
    });

    it('can be disabled', () => {
        render(<Input label="Username" disabled />);
        expect(screen.getByLabelText(/username/i)).toBeDisabled();
    });

    it('handles placeholder text', () => {
        render(<Input label="Username" placeholder="Enter username" />);
        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    });

    it('handles required field', () => {
        render(<Input label="Username" required />);
        expect(screen.getByLabelText(/username \*/i)).toBeInTheDocument();
    });

    it('handles different input types', () => {
        render(<Input label="Password" type="password" />);
        expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
    });

    it('handles different variants', () => {
        render(<Input label="Username" variant="filled" />);
        expect(screen.getByLabelText(/username/i).closest('.MuiTextField-root')).toHaveClass('MuiFilledInput-root');
    });

    it('handles focus and blur events', () => {
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        render(<Input label="Username" onFocus={handleFocus} onBlur={handleBlur} />);
        const input = screen.getByLabelText(/username/i);

        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalled();

        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalled();
    });

    it('applies custom styles through className', () => {
        render(<Input label="Username" className="custom-input" />);
        expect(screen.getByLabelText(/username/i).closest('.MuiTextField-root')).toHaveClass('custom-input');
    });

    it('forwards other props to TextField', () => {
        render(
            <Input
                label="Test Input"
                data-testid="test-input"
                inputProps={{ 'aria-label': 'test input' }}
                size="small"
            />
        );
        const input = screen.getByTestId('test-input');
        expect(input).toHaveClass('MuiTextField-sizeSmall');
        expect(screen.getByLabelText('test input')).toBeInTheDocument();
    });
});