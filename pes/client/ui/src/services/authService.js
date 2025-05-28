import apiClient from './apiClient';

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      
      if (response.data.success) {
        // Store credentials for basic auth
        const credentials = btoa(`${email}:${password}`);
        localStorage.setItem('authCredentials', credentials);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        
        // Set default header for future requests
        apiClient.defaults.headers.common['Authorization'] = `Basic ${credentials}`;
        
        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authCredentials');
    delete apiClient.defaults.headers.common['Authorization'];
  },

  setAuthHeader(credentials) {
    apiClient.defaults.headers.common['Authorization'] = `Basic ${credentials}`;
  },

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  isAuthenticated() {
    const user = this.getCurrentUser();
    const credentials = localStorage.getItem('authCredentials');
    return !!(user && credentials);
  },
};
