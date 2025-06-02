// Local data for schedules
export const schedules = [
    {
        id: 1,
        name: "Monday Morning Schedule",
        dayOfWeek: "Monday",
        timeSlot: "08:00-12:00",
        activities: [1, 2], // activity IDs
        classId: 1,
        createdDate: "2024-01-15",
        modifiedDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Tuesday Afternoon Schedule",
        dayOfWeek: "Tuesday", 
        timeSlot: "13:00-17:00",
        activities: [3, 4],
        classId: 1,
        createdDate: "2024-01-16",
        modifiedDate: "2024-01-16"
    },
    {
        id: 3,
        name: "Wednesday Full Day",
        dayOfWeek: "Wednesday",
        timeSlot: "08:00-17:00", 
        activities: [1, 2, 3],
        classId: 2,
        createdDate: "2024-01-17",
        modifiedDate: "2024-01-17"
    }
];

export const weeklySchedules = [
    {
        id: 1,
        name: "Week 1 - Introduction Week",
        weekStartDate: "2024-01-15",
        weekEndDate: "2024-01-21",
        classId: 1,
        schedules: [1, 2], // schedule IDs
        createdDate: "2024-01-15",
        modifiedDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Week 2 - Learning Activities",
        weekStartDate: "2024-01-22",
        weekEndDate: "2024-01-28",
        classId: 2,
        schedules: [3],
        createdDate: "2024-01-22",
        modifiedDate: "2024-01-22"
    }
];