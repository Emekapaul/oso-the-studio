// Simple auth utilities for WebContainer compatibility

// Client-side auth utilities (browser only)
export const clientAuth = {
  // Set authentication token in localStorage and cookies
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      try {
        // Set in cookies
        document.cookie = `admin_token=${token}; path=/; max-age=${24 * 60 * 60}; SameSite=Strict`;
        // Fallback to localStorage
        localStorage.setItem('admin_token', token);
      } catch (error) {
        console.error('Error setting token:', error);
      }
    }
  },

  // Get authentication token
  getToken: () => {
    if (typeof window !== 'undefined') {
      try {
        // Try cookies first
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('admin_token='));
        if (tokenCookie) {
          return tokenCookie.split('=')[1];
        }
        
        // Fallback to localStorage
        return localStorage.getItem('admin_token');
      } catch (error) {
        console.error('Error getting token:', error);
        return null;
      }
    }
    return null;
  },

  // Remove authentication token
  removeToken: () => {
    if (typeof window !== 'undefined') {
      try {
        // Remove from cookies
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        // Remove from localStorage
        localStorage.removeItem('admin_token');
      } catch (error) {
        console.error('Error removing token:', error);
      }
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = clientAuth.getToken();
    if (!token) return false;

    try {
      const decoded = JSON.parse(atob(token));
      if (!decoded || !decoded.exp) return false;
      
      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },

  // Logout user
  logout: () => {
    clientAuth.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  }
};

// Server-side token verification for middleware
export function verifyToken(token) {
  try {
    if (!token) return null;
    
    // Simple base64 decoding for WebContainer compatibility
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}