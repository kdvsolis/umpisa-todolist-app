import { render, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '../pages/ProfilePage';
import account from '../services/account-service';

jest.mock('../services/account-service');

describe('ProfilePage', () => {
  beforeEach(() => {
    account.getUser.mockResolvedValue({ success: true, result: { user: { username: 'johndoe' } } });
    account.updateUser.mockResolvedValue({ success: true });
  });

  it('renders without crashing', () => {
    render(<ProfilePage />);
  });

  it('updates the profile successfully when passwords match', async () => {
    const { getByLabelText, getByText } = render(<ProfilePage />);

    fireEvent.change(getByLabelText(/Change Password/i), { target: { value: 'newpassword' } });
    fireEvent.change(getByLabelText(/Confirm Password/i), { target: { value: 'newpassword' } });
    
    fireEvent.click(getByText(/Save/i));

    await waitFor(() => expect(account.updateUser).toHaveBeenCalledWith({ password: 'newpassword' }));
  });

  it('does not update the profile when passwords do not match', async () => {
    const { getByLabelText, getByText } = render(<ProfilePage />);

    fireEvent.change(getByLabelText(/Change Password/i), { target: { value: 'newpassword' } });
    fireEvent.change(getByLabelText(/Confirm Password/i), { target: { value: 'wrongpassword' } });
    
    fireEvent.click(getByText(/Save/i));

    await waitFor(() => expect(account.updateUser).not.toHaveBeenCalled());
  });
});
