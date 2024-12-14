import {
    isValidEmail,
    isValidPassword,
    isValidUsername,
    isValidPhone,
    getValidationError,
    validateLoginForm,
    validateRegisterForm
} from '../validation';

describe('Validation Utils', () => {
    describe('isValidEmail', () => {
        it('should validate correct email addresses', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
            expect(isValidEmail('user+tag@example.com')).toBe(true);
        });

        it('should invalidate incorrect email addresses', () => {
            expect(isValidEmail('')).toBe(false);
            expect(isValidEmail('test@')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('test@example')).toBe(false);
            expect(isValidEmail('test.example.com')).toBe(false);
        });
    });

    describe('isValidPassword', () => {
        it('should validate correct passwords', () => {
            expect(isValidPassword('Password123')).toBe(true);
            expect(isValidPassword('StrongP@ss1')).toBe(true);
        });

        it('should invalidate incorrect passwords', () => {
            expect(isValidPassword('')).toBe(false);
            expect(isValidPassword('password')).toBe(false); // no uppercase, no number
            expect(isValidPassword('PASSWORD123')).toBe(false); // no lowercase
            expect(isValidPassword('Password')).toBe(false); // no number
            expect(isValidPassword('pass123')).toBe(false); // no uppercase
            expect(isValidPassword('Pa1')).toBe(false); // too short
        });
    });

    describe('isValidUsername', () => {
        it('should validate correct usernames', () => {
            expect(isValidUsername('user123')).toBe(true);
            expect(isValidUsername('john_doe')).toBe(true);
            expect(isValidUsername('test_user_123')).toBe(true);
        });

        it('should invalidate incorrect usernames', () => {
            expect(isValidUsername('')).toBe(false);
            expect(isValidUsername('ab')).toBe(false); // too short
            expect(isValidUsername('user@name')).toBe(false); // invalid character
            expect(isValidUsername('a'.repeat(21))).toBe(false); // too long
        });
    });

    describe('isValidPhone', () => {
        it('should validate correct phone numbers', () => {
            expect(isValidPhone('13800138000')).toBe(true);
            expect(isValidPhone('15912345678')).toBe(true);
            expect(isValidPhone('18612345678')).toBe(true);
        });

        it('should invalidate incorrect phone numbers', () => {
            expect(isValidPhone('')).toBe(false);
            expect(isValidPhone('1234567890')).toBe(false); // invalid prefix
            expect(isValidPhone('138001380001')).toBe(false); // too long
            expect(isValidPhone('1380013800')).toBe(false); // too short
            expect(isValidPhone('12345678901')).toBe(false); // invalid prefix
        });
    });

    describe('getValidationError', () => {
        it('should return appropriate error messages for invalid values', () => {
            expect(getValidationError('email', 'invalid')).toBe('请输入有效的邮箱地址');
            expect(getValidationError('password', 'weak')).toBe('密码至少8位，需包含大小写字母和数字');
            expect(getValidationError('username', 'a')).toBe('用户名3-20位，只能包含字母、数字、下划线');
            expect(getValidationError('phone', '1234')).toBe('请输入有效的手机号码');
        });

        it('should return null for valid values', () => {
            expect(getValidationError('email', 'test@example.com')).toBeNull();
            expect(getValidationError('password', 'Password123')).toBeNull();
            expect(getValidationError('username', 'user123')).toBeNull();
            expect(getValidationError('phone', '13800138000')).toBeNull();
        });

        it('should return null for unknown fields', () => {
            expect(getValidationError('unknown', 'value')).toBeNull();
        });
    });

    describe('validateLoginForm', () => {
        it('should validate complete login data', () => {
            expect(validateLoginForm({
                email: 'test@example.com',
                password: 'Password123'
            })).toBeNull();
        });

        it('should invalidate incomplete login data', () => {
            expect(validateLoginForm({
                email: '',
                password: 'Password123'
            })).toBe('请填写所有必填字段');

            expect(validateLoginForm({
                email: 'test@example.com',
                password: ''
            })).toBe('请填写所有必填字段');
        });
    });

    describe('validateRegisterForm', () => {
        it('should validate complete register data', () => {
            expect(validateRegisterForm({
                email: 'test@example.com',
                password: 'Password123',
                confirmPassword: 'Password123',
                name: 'Test User',
                agreement: true
            })).toBeNull();
        });

        it('should invalidate incomplete register data', () => {
            expect(validateRegisterForm({
                email: '',
                password: 'Password123',
                confirmPassword: 'Password123',
                name: 'Test User',
                agreement: true
            })).toBe('请填写所有必填字段');
        });

        it('should invalidate mismatched passwords', () => {
            expect(validateRegisterForm({
                email: 'test@example.com',
                password: 'Password123',
                confirmPassword: 'Password456',
                name: 'Test User',
                agreement: true
            })).toBe('两次输入的密码不一致');
        });

        it('should invalidate short passwords', () => {
            expect(validateRegisterForm({
                email: 'test@example.com',
                password: '12345',
                confirmPassword: '12345',
                name: 'Test User',
                agreement: true
            })).toBe('密码长度不能少于6位');
        });

        it('should invalidate invalid email', () => {
            expect(validateRegisterForm({
                email: 'invalid-email',
                password: 'Password123',
                confirmPassword: 'Password123',
                name: 'Test User',
                agreement: true
            })).toBe('请输入有效的邮箱地址');
        });

        it('should invalidate empty password', () => {
            expect(validateRegisterForm({
                email: 'test@example.com',
                password: '',
                confirmPassword: '',
                name: 'Test User',
                agreement: true
            })).toBe('请填写所有必填字段');
        });
    });
}); 