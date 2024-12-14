import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterPage } from './RegisterPage';

describe('RegisterPage', () => {
    it('renders register form', () => {
        render(<RegisterPage />);
        expect(screen.getByLabelText(/邮箱/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/用户名/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/密码/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/确认密码/i)).toBeInTheDocument();
    });

    it('displays error message on registration failure', async () => {
        const mockOnError = jest.fn();
        render(<RegisterPage onError={mockOnError} />);

        fireEvent.change(screen.getByLabelText(/邮箱/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/用户名/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/密码/i), { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/确认密码/i), { target: { value: 'differentpassword' } });
        fireEvent.click(screen.getByText(/注册/i));

        // 这里需要模拟 API 调用失败的情况
        expect(await screen.findByText(/注册失败/i)).toBeInTheDocument();
    });
}); 