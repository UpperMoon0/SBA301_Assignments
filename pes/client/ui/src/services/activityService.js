import apiClient from './apiClient';
import { API_ENDPOINTS, handleApiResponse, handleApiError } from './index';

export const activityService = {
  async getAllActivities() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ACTIVITIES.LIST);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getActivityById(activityId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ACTIVITIES.GET_BY_ID(activityId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async createActivity(activityData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ACTIVITIES.CREATE, activityData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async updateActivity(activityId, activityData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.ACTIVITIES.UPDATE(activityId), activityData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async deleteActivity(activityId) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.ACTIVITIES.DELETE(activityId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getActivitiesByScheduleId(scheduleId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ACTIVITIES.BY_SCHEDULE(scheduleId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getActivitiesByClassId(classId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ACTIVITIES.BY_CLASS(classId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getActivitiesByClassAndDay(classId, dayOfWeek) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ACTIVITIES.BY_CLASS_AND_DAY(classId, dayOfWeek));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async assignActivityToClass(assignmentData) {
    try {
      const response = await apiClient.post('/activities/assign', assignmentData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
