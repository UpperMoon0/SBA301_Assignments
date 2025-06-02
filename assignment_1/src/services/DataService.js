import { activities as initialActivities } from '../data/activities.js';
import { schedules as initialSchedules, weeklySchedules as initialWeeklySchedules } from '../data/schedules.js';
import { classes as initialClasses } from '../data/classes.js';

// Local storage keys
const STORAGE_KEYS = {
    ACTIVITIES: 'pes_activities',
    SCHEDULES: 'pes_schedules',
    WEEKLY_SCHEDULES: 'pes_weekly_schedules',
    CLASSES: 'pes_classes'
};

// Initialize data in localStorage if not exists
const initializeData = () => {
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
        localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(initialActivities));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SCHEDULES)) {
        localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(initialSchedules));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WEEKLY_SCHEDULES)) {
        localStorage.setItem(STORAGE_KEYS.WEEKLY_SCHEDULES, JSON.stringify(initialWeeklySchedules));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLASSES)) {
        localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(initialClasses));
    }
};

// Generic CRUD operations
const getData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const generateId = (data) => {
    return data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
};

// Activity Services
export const ActivityService = {
    getAll: () => {
        initializeData();
        return getData(STORAGE_KEYS.ACTIVITIES);
    },

    getById: (id) => {
        const activities = ActivityService.getAll();
        return activities.find(activity => activity.id === parseInt(id));
    },

    create: (activityData) => {
        const activities = ActivityService.getAll();
        const newActivity = {
            ...activityData,
            id: generateId(activities),
            createdDate: new Date().toISOString().split('T')[0],
            modifiedDate: new Date().toISOString().split('T')[0]
        };
        activities.push(newActivity);
        saveData(STORAGE_KEYS.ACTIVITIES, activities);
        return newActivity;
    },

    update: (id, activityData) => {
        const activities = ActivityService.getAll();
        const index = activities.findIndex(activity => activity.id === parseInt(id));
        if (index !== -1) {
            activities[index] = {
                ...activities[index],
                ...activityData,
                modifiedDate: new Date().toISOString().split('T')[0]
            };
            saveData(STORAGE_KEYS.ACTIVITIES, activities);
            return activities[index];
        }
        return null;
    },

    delete: (id) => {
        const activities = ActivityService.getAll();
        const filteredActivities = activities.filter(activity => activity.id !== parseInt(id));
        saveData(STORAGE_KEYS.ACTIVITIES, filteredActivities);
        return true;
    }
};

// Schedule Services
export const ScheduleService = {
    getAll: () => {
        initializeData();
        return getData(STORAGE_KEYS.SCHEDULES);
    },

    getById: (id) => {
        const schedules = ScheduleService.getAll();
        return schedules.find(schedule => schedule.id === parseInt(id));
    },

    getByClass: (classId) => {
        const schedules = ScheduleService.getAll();
        return schedules.filter(schedule => schedule.classId === parseInt(classId));
    },

    create: (scheduleData) => {
        const schedules = ScheduleService.getAll();
        const newSchedule = {
            ...scheduleData,
            id: generateId(schedules),
            createdDate: new Date().toISOString().split('T')[0],
            modifiedDate: new Date().toISOString().split('T')[0]
        };
        schedules.push(newSchedule);
        saveData(STORAGE_KEYS.SCHEDULES, schedules);
        return newSchedule;
    },

    update: (id, scheduleData) => {
        const schedules = ScheduleService.getAll();
        const index = schedules.findIndex(schedule => schedule.id === parseInt(id));
        if (index !== -1) {
            schedules[index] = {
                ...schedules[index],
                ...scheduleData,
                modifiedDate: new Date().toISOString().split('T')[0]
            };
            saveData(STORAGE_KEYS.SCHEDULES, schedules);
            return schedules[index];
        }
        return null;
    },

    delete: (id) => {
        const schedules = ScheduleService.getAll();
        const filteredSchedules = schedules.filter(schedule => schedule.id !== parseInt(id));
        saveData(STORAGE_KEYS.SCHEDULES, filteredSchedules);
        return true;
    }
};

// Weekly Schedule Services
export const WeeklyScheduleService = {
    getAll: () => {
        initializeData();
        return getData(STORAGE_KEYS.WEEKLY_SCHEDULES);
    },

    getById: (id) => {
        const weeklySchedules = WeeklyScheduleService.getAll();
        return weeklySchedules.find(schedule => schedule.id === parseInt(id));
    },

    getByClass: (classId) => {
        const weeklySchedules = WeeklyScheduleService.getAll();
        return weeklySchedules.filter(schedule => schedule.classId === parseInt(classId));
    },

    create: (scheduleData) => {
        const weeklySchedules = WeeklyScheduleService.getAll();
        const newSchedule = {
            ...scheduleData,
            id: generateId(weeklySchedules),
            createdDate: new Date().toISOString().split('T')[0],
            modifiedDate: new Date().toISOString().split('T')[0]
        };
        weeklySchedules.push(newSchedule);
        saveData(STORAGE_KEYS.WEEKLY_SCHEDULES, weeklySchedules);
        return newSchedule;
    },

    update: (id, scheduleData) => {
        const weeklySchedules = WeeklyScheduleService.getAll();
        const index = weeklySchedules.findIndex(schedule => schedule.id === parseInt(id));
        if (index !== -1) {
            weeklySchedules[index] = {
                ...weeklySchedules[index],
                ...scheduleData,
                modifiedDate: new Date().toISOString().split('T')[0]
            };
            saveData(STORAGE_KEYS.WEEKLY_SCHEDULES, weeklySchedules);
            return weeklySchedules[index];
        }
        return null;
    },

    delete: (id) => {
        const weeklySchedules = WeeklyScheduleService.getAll();
        const filteredSchedules = weeklySchedules.filter(schedule => schedule.id !== parseInt(id));
        saveData(STORAGE_KEYS.WEEKLY_SCHEDULES, filteredSchedules);
        return true;
    }
};

// Class Services
export const ClassService = {
    getAll: () => {
        initializeData();
        return getData(STORAGE_KEYS.CLASSES);
    },

    getById: (id) => {
        const classes = ClassService.getAll();
        return classes.find(cls => cls.id === parseInt(id));
    }
};