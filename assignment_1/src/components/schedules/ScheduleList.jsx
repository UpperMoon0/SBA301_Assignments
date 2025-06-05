import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Button,
    IconButton,
    Chip,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useState } from "react";
import { Edit, Delete, Add, Visibility } from '@mui/icons-material';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function ScheduleList({ schedules, classes, activities, onEdit, onDelete, onCreate, onView, filterByClass = true }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedClass, setSelectedClass] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getClassName = (classId) => {
        const classObj = classes.find(cls => cls.id === classId);
        return classObj ? classObj.name : 'Unknown Class';
    };

    const getActivityNames = (activityIds) => {
        return activityIds.map(id => {
            const activity = activities.find(act => act.id === id);
            return activity ? activity.name : 'Unknown Activity';
        }).join(', ');
    };

    const calculateEndTime = (startTime, activityIds) => {
        if (!startTime || !activityIds || activityIds.length === 0) {
            return startTime || '';
        }
        
        // Calculate total duration of all activities
        const totalDuration = activityIds.reduce((total, activityId) => {
            const activity = activities.find(act => act.id === activityId);
            return total + (activity ? activity.duration : 0);
        }, 0);
        
        console.log('ScheduleList - calculateEndTime debug:');
        console.log('Start time:', startTime);
        console.log('Activity IDs:', activityIds);
        console.log('Available activities:', activities);
        console.log('Total duration calculated:', totalDuration);
        
        if (totalDuration === 0) {
            return startTime;
        }
        
        // Parse the start time
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        
        // Calculate total minutes from start of day
        let totalMinutes = (startHours * 60) + startMinutes + totalDuration;
        
        // Calculate end hours and minutes
        const endHours = Math.floor(totalMinutes / 60) % 24; // Handle day overflow
        const endMinutes = totalMinutes % 60;
        
        // Format with leading zeros
        const formattedHours = endHours.toString().padStart(2, '0');
        const formattedMinutes = endMinutes.toString().padStart(2, '0');
        
        const result = `${formattedHours}:${formattedMinutes}`;
        console.log('Calculated end time:', result);
        return result;
    };

    const getTimeSlot = (schedule) => {
        // Extract start time from either startTime field or timeSlot field
        let startTime = schedule.startTime;
        if (!startTime && schedule.timeSlot) {
            startTime = schedule.timeSlot.split('-')[0];
        }
        
        const endTime = calculateEndTime(startTime, schedule.activities);
        return startTime && endTime ? `${startTime}-${endTime}` : (schedule.timeSlot || '');
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

    // Filter schedules by selected class if filtering is enabled
    const filteredSchedules = filterByClass && selectedClass 
        ? schedules.filter(schedule => schedule.classId === parseInt(selectedClass))
        : schedules;

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Schedule Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onCreate}
                    sx={{ minWidth: 150 }}
                >
                    Create Schedule
                </Button>
            </Box>

            {filterByClass && (
                <Box mb={3}>
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
                </Box>
            )}

            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>No</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Schedule Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Day</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Time Slot</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Class</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Activities</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSchedules
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((schedule, index) => (
                                    <TableRow key={schedule.id} hover>
                                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2" fontWeight="medium">
                                                {schedule.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip 
                                                label={schedule.dayOfWeek} 
                                                color={getDayColor(schedule.dayOfWeek)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">{getTimeSlot(schedule)}</TableCell>
                                        <TableCell align="center">{getClassName(schedule.classId)}</TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2" sx={{ maxWidth: 200 }}>
                                                {getActivityNames(schedule.activities)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">{schedule.createdDate}</TableCell>
                                        <TableCell align="center">
                                            <IconButton 
                                                color="info" 
                                                onClick={() => onView && onView(schedule)}
                                                size="small"
                                            >
                                                <Visibility />
                                            </IconButton>
                                            <IconButton 
                                                color="primary" 
                                                onClick={() => onEdit(schedule)}
                                                size="small"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton 
                                                color="error" 
                                                onClick={() => onDelete(schedule.id)}
                                                size="small"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredSchedules.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default ScheduleList;