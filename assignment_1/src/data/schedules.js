// Local data for schedules
export const schedules = [
    {
        id: 1,
        name: "Monday Morning Schedule",
        dayOfWeek: "Monday",
        startTime: "08:00",
        endTime: "09:15",
        timeSlot: "08:00-09:15", // backward compatibility
        activities: [1, 2], // activity IDs - Morning Circle Time (30min) + Art and Craft (45min) = 75min
        classId: 1,
        createdDate: "2024-01-15",
        modifiedDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Tuesday Afternoon Schedule",
        dayOfWeek: "Tuesday",
        startTime: "13:00",
        endTime: "14:20",
        timeSlot: "13:00-14:20", // backward compatibility
        activities: [3, 4], // Story Time (20min) + Outdoor Play (60min) = 80min
        classId: 1,
        createdDate: "2024-01-16",
        modifiedDate: "2024-01-16"
    },
    {
        id: 3,
        name: "Wednesday Full Day",
        dayOfWeek: "Wednesday",
        startTime: "08:00",
        endTime: "09:35",
        timeSlot: "08:00-09:35", // backward compatibility
        activities: [1, 2, 3], // Morning Circle Time (30min) + Art and Craft (45min) + Story Time (20min) = 95min
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