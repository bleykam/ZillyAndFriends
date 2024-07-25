import { expect, test, describe, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Booking from './Booking';
import { it } from 'vitest'


// Mock the necessary functions
vi.mock('../../utils', () => ({
  supabase: vi.fn(),
  getProfile: vi.fn(),
  sendBookingEmail: vi.fn(),
  calculateTotalPrice: vi.fn(),
  sendConfEmail: vi.fn(),
}));
describe('LoginBooking', () => {
  beforeEach(() => {
    // Reset the mock functions before each test
    vi.clearAllMocks();
  });

  test('submitting the form should create a new booking', () => {
    // Mock the necessary functions
    const mockCreateBooking = vi.fn();
    vi.mock('../../utils', () => ({
      ...vi.importActual('../../utils'),
      mockCreateBooking,
    }));

    // Render the Booking component
    render(<Booking />);

    // Fill in the form fields
    userEvent.type(screen.getByLabelText('Start Date'), '2022-01-01');
    userEvent.type(screen.getByLabelText('Start Time'), '09:00 AM');
    userEvent.type(screen.getByLabelText('End Time'), '06:00 PM');
    userEvent.type(screen.getByLabelText('Message'), 'This is a test message');

    // Submit the form
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Assert that the form data is sent correctly
    expect(mockCreateBooking).toHaveBeenCalledWith({
      service: 'daycare',
      start_date: '2022-01-01',
      start_time: '09:00 AM',
      end_time: '06:00 PM',
      message: 'This is a test message',
      status: 'pending',
      dates: expect.any(Array),
      tot_amt: expect.any(Number),
    });
  });
});
