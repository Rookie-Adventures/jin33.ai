import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@test/__tests__/testUtils';
import Button from './index';

describe('Button', () => {
    // 基本渲染测试
    it('renders correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    // 点击事件测试
    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByRole('button', { name: /click me/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // 禁用状态测试
    it('can be disabled', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
    });

    // variant属性测试
    it('applies variant correctly', () => {
        const { rerender } = render(<Button variant="primary">Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle({ backgroundColor: '#1976d2' }); // primary color

        rerender(<Button variant="secondary">Button</Button>);
        expect(button).toHaveStyle({ backgroundColor: '#dc004e' }); // secondary color
    });

    // className属性测试
    it('accepts custom className', () => {
        render(<Button className="custom-class">Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
}); 