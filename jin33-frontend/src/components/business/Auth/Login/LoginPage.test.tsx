import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
    it('renders login form', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/邮箱/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/密码/i)).toBeInTheDocument();
    });

    it('displays error message on login failure', async () => {
        const mockOnError = jest.fn();
        render(<LoginPage onError={mockOnError} />);

        fireEvent.change(screen.getByLabelText(/邮箱/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/密码/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText(/登录/i));

        // 这里需要模拟 API 调用失败的情况
        expect(await screen.findByText(/登录失败/i)).toBeInTheDocument();
    });
}); 