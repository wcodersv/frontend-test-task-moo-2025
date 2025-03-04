import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from './modal.component.tsx';


describe('Modal component', () => {
  const onCloseMock = jest.fn();
  const onCancelMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });


  test('should render with completed steps when data is not loading', () => {
    render(
      <Modal
        open={true}
        onClose={onCloseMock}
        onCancel={onCancelMock}
        loadingAuthorData={false}
        loadingQuoteData={false}
      />
    );

    expect(screen.getByText('Requesting the quote')).toBeInTheDocument();

    expect(screen.getByText(/Step 1: Requesting author/)).toBeInTheDocument();
    expect(screen.getByText(/Step 2: Requesting quote/)).toBeInTheDocument();

    const completedElements = screen.getAllByText(/Completed/);
    expect(completedElements.length).toBe(2);

    expect(completedElements[0]).toHaveTextContent('Completed');
    expect(completedElements[1]).toHaveTextContent('Completed');
  });

  test('should call onCancel when the cancel button is clicked', () => {
    render(
      <Modal
        open={true}
        onClose={onCloseMock}
        onCancel={onCancelMock}
        loadingAuthorData={false}
        loadingQuoteData={false}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test('should not show loading indicators if not in loading state', () => {
    render(
      <Modal
        open={true}
        onClose={onCloseMock}
        onCancel={onCancelMock}
        loadingAuthorData={false}
        loadingQuoteData={false}
      />
    );


    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('should render correct title based on loading state loadingAuthorData', () => {
    render(
      <Modal
        open={true}
        onClose={onCloseMock}
        onCancel={onCancelMock}
        loadingAuthorData={true}
        loadingQuoteData={false}
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should render correct title based on loading state loadingQuoteData', () => {
    render(
      <Modal
        open={true}
        onClose={onCloseMock}
        onCancel={onCancelMock}
        loadingAuthorData={false}
        loadingQuoteData={true}
      />
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should render correct status and progress bar in the correct positions', () => {
    render(
      <Modal
        open={true}
        onClose={onCloseMock}
        onCancel={onCancelMock}
        loadingAuthorData={false}
        loadingQuoteData={true}
      />
    );

    expect(screen.getByText(/Step 1: Requesting author/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();

    expect(screen.getByText(/Step 2: Requesting quote/)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});