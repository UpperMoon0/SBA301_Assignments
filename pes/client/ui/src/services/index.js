// Central export point for all services
export { authService } from './authService';
export { activityService } from './activityService';
export { scheduleService } from './scheduleService';
export { default as apiClient } from './apiClient';

// API Endpoints configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  
  // Activity endpoints
  ACTIVITIES: {
    LIST: '/activities',
    CREATE: '/activities',
    GET_BY_ID: (id) => `/activities/${id}`,
    UPDATE: (id) => `/activities/${id}`,
    DELETE: (id) => `/activities/${id}`,
    BY_SCHEDULE: (scheduleId) => `/activities/schedule/${scheduleId}`,
    BY_CLASS: (classId) => `/activities/class/${classId}`,
    BY_CLASS_AND_DAY: (classId, dayOfWeek) => `/activities/class/${classId}/day/${dayOfWeek}`,
  },
  
  // Schedule endpoints
  SCHEDULES: {
    LIST: '/schedules',
    CREATE: '/schedules',
    GET_BY_ID: (id) => `/schedules/${id}`,
    UPDATE: (id) => `/schedules/${id}`,
    DELETE: (id) => `/schedules/${id}`,
    BY_CLASS: (classId) => `/schedules/class/${classId}`,
  },
};

// Common API response handler
export const handleApiResponse = (response) => {
  if (response.data.success) {
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } else {
    return {
      success: false,
      message: response.data.message || 'Operation failed',
      data: null,
    };
  }
};

// Common API error handler
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    return {
      success: false,
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      success: false,
      message: 'Network error - please check your connection',
    };
  } else {
    // Something else happened
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
    };
  }
};
