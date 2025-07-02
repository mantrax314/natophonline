import { render, screen, fireEvent } from '@testing-library/react';
import NatoPhoneticAlphabet from '@/components/NatoPhoneticAlphabet';
import '@testing-library/jest-dom';

describe('NatoPhoneticAlphabet', () => {
  // Mock clipboard API
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(),
      readText: jest.fn(),
    },
  });

  beforeEach(() => {
    (navigator.clipboard.writeText as jest.Mock).mockClear();
    (navigator.clipboard.readText as jest.Mock).mockClear();
  });

  it('renders the component', () => {
    render(<NatoPhoneticAlphabet />);
    expect(screen.getByText('ONLINE NATO PHONETIC ALPHABET')).toBeInTheDocument();
  });

  it('converts text to NATO phonetic alphabet', () => {
    render(<NatoPhoneticAlphabet />);
    const textarea = screen.getByPlaceholderText('Enter text to convert');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(screen.getByText('Hotel Echo Lima Lima Oscar')).toBeInTheDocument();
  });

  it('clears the text when the clear button is clicked', () => {
    render(<NatoPhoneticAlphabet />);
    const textarea = screen.getByPlaceholderText('Enter text to convert');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    const clearButton = screen.getByText('X');
    fireEvent.click(clearButton);
    expect(textarea).toHaveValue('');
    expect(screen.queryByText('Hotel Echo Lima Lima Oscar')).not.toBeInTheDocument();
  });

  it('copies the phonetic text to the clipboard', () => {
    render(<NatoPhoneticAlphabet />);
    const textarea = screen.getByPlaceholderText('Enter text to convert');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    const copyButton = screen.getByText('COPY');
    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hotel Echo Lima Lima Oscar');
  });
});