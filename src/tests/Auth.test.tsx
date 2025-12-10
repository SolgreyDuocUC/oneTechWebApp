import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { AuthService } from '../service/AuthService';

// Mock AuthService
jest.mock('../service/AuthService');
const mockedAuthService = AuthService as jest.Mocked<typeof AuthService>;

describe('AuthContext', () => {
  it('should login, logout, and handle authentication state', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });

    // Initial state
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();

    // Login
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
    mockedAuthService.login.mockResolvedValue(mockUser);

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);

    // Logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(mockedAuthService.logout).toHaveBeenCalled();
  });
});
