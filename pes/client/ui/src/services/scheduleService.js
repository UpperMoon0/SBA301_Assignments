import apiClient from './apiClient';
import { API_ENDPOINTS, handleApiResponse, handleApiError } from './index';

export const scheduleService = {
  async getAllSchedules() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SCHEDULES.LIST);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getScheduleById(scheduleId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SCHEDULES.GET_BY_ID(scheduleId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async createSchedule(scheduleData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.SCHEDULES.CREATE, scheduleData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async updateSchedule(scheduleId, scheduleData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.SCHEDULES.UPDATE(scheduleId), scheduleData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async deleteSchedule(scheduleId) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.SCHEDULES.DELETE(scheduleId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getSchedulesByClassId(classId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SCHEDULES.BY_CLASS(classId));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getSchedulesByDate(date) {
    try {
      const response = await apiClient.get(`/schedules/date/${date}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
