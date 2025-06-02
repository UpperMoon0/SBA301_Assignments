import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    IconButton,
    Chip,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Grid
} from "@mui/material";
import { useState } from "react";
import { Edit, Delete, Add, Visibility } from '@mui/icons-material';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function WeeklyScheduleView({ weeklySchedules, schedules, classes, activities, onEdit, onDelete, onCreate, onView }) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');

    const getClassName = (classId) => {
        const classObj = classes.find(cls => cls.id === classId);
        return classObj ? classObj.name : 'Unknown Class';
    };

    const getSchedulesByWeek = (weeklySchedule) => {
        return schedules.filter(schedule => weeklySchedule.schedules.includes(schedule.id));
    };

    const getActivityNames = (activityIds) => {
        return activityIds.map(id => {
            const activity = activities.find(act => act.id === id);
            return activity ? activity.name : 'Unknown Activity';
        });
    };

    const getDayColor = (day) => {
        const colors = {
            'Monday': 'primary',
            'Tuesday': 'secondary',
            'Wednesday': 'success',
            'Thursday': 'warning',
            'Friday': 'error',
            'Saturday': 'info',
            'Sunday': 'default'
        };
        return colors[day] || 'default';
    };

    // Filter weekly schedules
    const filteredWeeklySchedules = weeklySchedules.filter(ws => {
        const classMatch = !selectedClass || ws.classId === parseInt(selectedClass);
        const weekMatch = !selectedWeek || ws.id === parseInt(selectedWeek);
        return classMatch && weekMatch;
    });

    const renderWeeklyScheduleCard = (weeklySchedule) => {
        const weekSchedules = getSchedulesByWeek(weeklySchedule);
        
        return (
            <Card key={weeklySchedule.id} sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {weeklySchedule.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {getClassName(weeklySchedule.classId)} • {weeklySchedule.weekStartDate} to {weeklySchedule.weekEndDate}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton color="info" onClick={() => onView && onView(weeklySchedule)} size="small">
                                <Visibility />
                            </IconButton>
                            <IconButton color="primary" onClick={() => onEdit(weeklySchedule)} size="small">
                                <Edit />
                            </IconButton>
                            <IconButton color="error" onClick={() => onDelete(weeklySchedule.id)} size="small">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Box>

                    <Grid container spacing={1}>
                        {daysOfWeek.map(day => {
                            const daySchedules = weekSchedules.filter(schedule => schedule.dayOfWeek === day);
                            
                            return (
                                <Grid item xs={12/7} key={day}>
                                    <Paper 
                                        sx={{ 
                                            p: 1, 
                                            minHeight: 120, 
                                            backgroundColor: daySchedules.length > 0 ? 'grey.50' : 'grey.100',
                                            border: '1px solid',
                                            borderColor: 'grey.300'
                                        }}
                                    >
                                        <Typography variant="caption" fontWeight="bold" display="block">
                                            {day}
                                        </Typography>
                                        {daySchedules.map(schedule => (
                                            <Box key={schedule.id} mt={1}>
                                                <Chip 
                                                    label={schedule.timeSlot}
                                                    size="small"
                                                    color={getDayColor(day)}
                                                    sx={{ mb: 0.5, fontSize: '0.6rem' }}
                                                />
                                                <Typography variant="caption" display="block" sx={{ fontSize: '0.65rem' }}>
                                                    {schedule.name}
                                                </Typography>
                                                <Box sx={{ mt: 0.5 }}>
                                                    {getActivityNames(schedule.activities).map((actName, idx) => (
                                                        <Typography 
                                                            key={idx}
                                                            variant="caption" 
                                                            display="block" 
                                                            sx={{ 
                                                                fontSize: '0.6rem', 
                                                                color: 'text.secondary',
                                                                lineHeight: 1.2
                                                            }}
                                                        >
                                                            • {actName}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Weekly Schedule View
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onCreate}
                    sx={{ minWidth: 180 }}
                >
                    Create Weekly Schedule
                </Button>
            </Box>

            <Box display="flex" gap={2} mb={3}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        label="Filter by Class"
                    >
                        <MenuItem value="">All Classes</MenuItem>
                        {classes.map((cls) => (
                            <MenuItem key={cls.id} value={cls.id}>
                                {cls.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Select Week</InputLabel>
                    <Select
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                        label="Select Week"
                    >
                        <MenuItem value="">All Weeks</MenuItem>
                        {weeklySchedules.map((ws) => (
                            <MenuItem key={ws.id} value={ws.id}>
                                {ws.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {filteredWeeklySchedules.length > 0 ? (
                filteredWeeklySchedules.map(renderWeeklyScheduleCard)
            ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        No weekly schedules found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        Create a new weekly schedule to get started
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}

export default WeeklyScheduleView;