// Reviews.test.jsx

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reviews, { Modal } from './Reviews';
import { supabase } from '../../utils';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock supabase and the navigate function
vi.mock('../../utils', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockResolvedValue({ data: [] }),
    insert: vi.fn().mockResolvedValue({}),
  },
  convertDate: (date) => date.toISOString().split('T')[0],
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Reviews Component', { timeout: 5000 }, () => {  // Adding options as second argument
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should match the snapshot', { timeout: 5000 }, async () => {
    const { container } = render(
      <Router>
        <Reviews />
      </Router>
    );
    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('should render loading state initially', { timeout: 5000 }, () => {
    render(
      <Router>
        <Reviews />
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should open and close the modal', { timeout: 5000 }, async () => {
    render(
      <Router>
        <Reviews />
      </Router>
    );

    // Open modal
    fireEvent.click(screen.getByText('Write A Review'));
    expect(screen.getByText('Leave A Review')).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByText('Close'));
    await waitFor(() => expect(screen.queryByText('Leave A Review')).not.toBeInTheDocument());
  });

  it('should handle form submission', { timeout: 5000 }, async () => {
    const navigate = vi.fn();
    render(
      <Router>
        <Reviews />
      </Router>
    );

    fireEvent.click(screen.getByText('Write A Review'));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter text..'), { target: { value: 'Great service!' } });
    fireEvent.change(screen.getByLabelText('Repeat Client?'), { target: { value: 'Yes' } });

    // Mock rating change
    const starRating = screen.getByRole('button', { name: /star/i });
    fireEvent.click(starRating);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('Reviews');
      expect(supabase.insert).toHaveBeenCalledWith([
        {
          stars: 0,
          name: 'John Doe',
          body: 'Great service!',
          repeat: 'Yes',
          via: 'zilllyandfriends.com',
        },
      ]);
      expect(navigate).toHaveBeenCalledWith('/Reviews');
    });
  });
});

describe('Modal Component', { timeout: 5000 }, () => {  // Adding options as second argument
  it('should render children when open', { timeout: 5000 }, () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render children when closed', { timeout: 5000 }, () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });
});
