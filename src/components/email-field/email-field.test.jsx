import { render, screen, fireEvent } from '@testing-library/react';
import { EmailField } from './email-field.component.tsx';

describe('EmailField component', () => {
  const mockSetEmail = jest.fn();
  const email = 'test@example.com';

  test('renders email input and displays placeholder', () => {
    render(<EmailField email={email} setEmail={mockSetEmail} />);

    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();

    expect(input).toHaveValue(email);
  });

  test('calls setEmail when typing into the input field', () => {
    render(<EmailField email={email} setEmail={mockSetEmail} />);

    const input = screen.getByPlaceholderText('Enter email');
    fireEvent.change(input, { target: { value: 'newemail@example.com' } });

    expect(mockSetEmail).toHaveBeenCalledWith('newemail@example.com');
  });
});