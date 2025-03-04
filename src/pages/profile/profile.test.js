import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Profile } from './profile.component.tsx';
import '@testing-library/jest-dom';


jest.mock('js-cookie', () => ({
  get: jest.fn(() => 'test-token')
}));


describe('Profile component', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProfileData = {
    success: true,
    data: {
      fullname: 'John Doe'
    }
  };
  const mockAuthorData = { success: true, data: { authorId: '1', name: 'Walt Disney' } };
  const mockQuoteData = {
    success: true,
    data: {
      quote: 'The more you like yourself, the less you are like anyone else, which makes you unique.',
      quoteId: 1,
      authorId: 1
    }
  };


  test('renders the profile and greeting', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProfileData)
    });

    render(<Profile />);
    await waitFor(() => screen.getByText('Welcome, John Doe!'));

    expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });


  test('handleUpdateClick fetches author and quote data and updates UI', async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockProfileData)
    });
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockAuthorData)
    });
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockQuoteData)
    });

    render(<Profile />);
    expect(await screen.findByText(`Welcome, ${mockProfileData.data.fullname}!`)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Update'));

    expect(await screen.findByText(`"${mockQuoteData.data.quote}"`)).toBeInTheDocument();
    expect(await screen.findByText(`- ${mockAuthorData.data.name}`)).toBeInTheDocument();
  });


  test('handleCancel aborts requests and closes modal', async () => {
    const abortMock = jest.fn();
    const mockAbortController = {
      abort: abortMock,
      signal: { aborted: false }
    };

    globalThis.AbortController = jest.fn(() => mockAbortController);

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockProfileData)
    });
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockAuthorData)
    });
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockQuoteData)
    });

    render(<Profile />);
    expect(await screen.findByText(`Welcome, ${mockProfileData.data.fullname}!`)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/cancel/i));

    await waitFor(() => {
      expect(abortMock).toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

});