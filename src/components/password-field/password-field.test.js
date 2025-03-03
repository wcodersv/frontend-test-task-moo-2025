import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PasswordField } from './password-field.component.tsx';


describe('PasswordField component', () => {
  const mockSetPassword = jest.fn();
  const password = 'test@example.com';

  test('renders password input and displays placeholder', () => {
    render(<PasswordField password={password} setPassword={mockSetPassword} />);
    const input = screen.getByPlaceholderText(/password/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(password);
  });

  test('updates password on input change', async () => {
    render(<PasswordField password="" setPassword={mockSetPassword} />);

    const input = screen.getByPlaceholderText(/password/i);
    fireEvent.change(input, { target: { value: 'mySecret123' } });

    expect(mockSetPassword).toHaveBeenCalledWith('mySecret123');
  });

  test('input type should be password', () => {
    render(<PasswordField password="" setPassword={() => {}} />);

    const input = screen.getByPlaceholderText(/password/i);
    expect(input).toHaveAttribute('type', 'password');
  });
});