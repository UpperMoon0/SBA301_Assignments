import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Box,
    Typography,
    Grid,
    Autocomplete
} from "@mui/material";
import { useState, useEffect } from "react";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeOptions = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
];

function ScheduleForm({ open, onClose, onSave, schedule = null, classes, activities }) {
    const [formData, setFormData] = useState({
        name: '',
        dayOfWeek: '',
        startTime: '',
        classId: '',
        activities: []
    });

    useEffect(() => {
        if (schedule) {
            // Handle both old timeSlot format and new startTime format
            let startTime = '';
            if (schedule.startTime) {
                startTime = schedule.startTime;
            } else if (schedule.timeSlot) {
                // Extract start time from old timeSlot format (e.g., "08:00-12:00" -> "08:00")
                startTime = schedule.timeSlot.split('-')[0];
            }
            
            setFormData({
                name: schedule.name || '',
                dayOfWeek: schedule.dayOfWeek || '',
                startTime: startTime,
                classId: schedule.classId || '',
                activities: schedule.activities || []
            });
        } else {
            setFormData({
                name: '',
                dayOfWeek: '',
                startTime: '',
                classId: '',
                activities: []
            });
        }
    }, [schedule, open]);

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleActivitiesChange = (event, newValue) => {
        setFormData({
            ...formData,
            activities: newValue.map(activity => activity.id)
        });
    };

    const handleSubmit = () => {
        if (formData.name && formData.dayOfWeek && formData.startTime && formData.classId && formData.activities.length > 0) {
            const submitData = {
                ...formData,
                timeSlot: getTimeSlot(), // Include calculated timeSlot for backward compatibility
                endTime: calculateEndTime() // Include calculated end time
            };
            onSave(submitData);
            onClose();
        }
    };

    const getActivityOptions = () => {
        return activities.map(activity => ({
            id: activity.id,
            label: activity.name,
            type: activity.type,
            duration: activity.duration
        }));
    };

    const getSelectedActivities = () => {
        return activities.filter(activity => formData.activities.includes(activity.id))
            .map(activity => ({
                id: activity.id,
                label: activity.name,
                type: activity.type,
                duration: activity.duration
            }));
    };

    const getTotalDuration = () => {
        return formData.activities.reduce((total, activityId) => {
            const activity = activities.find(act => act.id === activityId);
            return total + (activity ? activity.duration : 0);
        }, 0);
    };

    const calculateEndTime = () => {
        if (!formData.startTime || formData.activities.length === 0) {
            return '';
        }
        
        const totalDuration = getTotalDuration();
        const [hours, minutes] = formData.startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes, 0, 0);
        
        const endDate = new Date(startDate.getTime() + totalDuration * 60000);
        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
        
        return `${endHours}:${endMinutes}`;
    };

    const getTimeSlot = () => {
        const endTime = calculateEndTime();
        return endTime ? `${formData.startTime}-${endTime}` : '';
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle sx={{ pb: 1, fontWeight: 'bold' }}>
                {schedule ? 'Edit Schedule' : 'Create New Schedule'}
            </DialogTitle>
            
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                    {/* Class */}
                    <FormControl fullWidth required sx={{ mb: 1 }}>
                        <InputLabel>Class</InputLabel>
                        <Select
                            value={formData.classId}
                            onChange={handleInputChange('classId')}
                            label="Class"
                        >
                            {classes.map((cls) => (
                                <MenuItem key={cls.id} value={cls.id}>
                                    {cls.name} ({cls.ageGroup})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Schedule Name */}
                    <TextField
                        fullWidth
                        label="Schedule Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        required
                        variant="outlined"
                        sx={{ mb: 1 }}
                    />
                    
                    {/* Day of Week */}
                    <FormControl fullWidth required sx={{ mb: 1 }}>
                        <InputLabel>Day of Week</InputLabel>
                        <Select
                            value={formData.dayOfWeek}
                            onChange={handleInputChange('dayOfWeek')}
                            label="Day of Week"
                        >
                            {daysOfWeek.map((day) => (
                                <MenuItem key={day} value={day}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    {/* Start Time */}
                    <FormControl fullWidth required sx={{ mb: 1 }}>
                        <InputLabel>Start Time</InputLabel>
                        <Select
                            value={formData.startTime}
                            onChange={handleInputChange('startTime')}
                            label="Start Time"
                        >
                            {timeOptions.map((time) => (
                                <MenuItem key={time} value={time}>
                                    {time}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Calculated End Time Display */}
                    {formData.startTime && formData.activities.length > 0 && (
                        <Box sx={{ mb: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Calculated Schedule:
                            </Typography>
                            <Typography variant="h6" color="primary">
                                {formData.startTime} - {calculateEndTime()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Duration: {getTotalDuration()} minutes
                            </Typography>
                        </Box>
                    )}
                    
                    {/* Activities Section */}
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                            Activities
                        </Typography>
                        <Autocomplete
                            multiple
                            options={getActivityOptions()}
                            value={getSelectedActivities()}
                            onChange={handleActivitiesChange}
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                    <Box>
                                        <Typography variant="body2">{option.label}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {option.type} • {option.duration} min
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={option.id}
                                        label={`${option.label} (${option.duration}min)`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Activities"
                                    placeholder="Choose activities for this schedule"
                                />
                            )}
                        />
                        
                        {/* Activity Selection Info */}
                        <Box mt={2}>
                            {formData.activities.length > 0 ? (
                                <Typography variant="body2" color="success.main">
                                    ✓ {formData.activities.length} activities selected • Total Duration: {getTotalDuration()} minutes
                                </Typography>
                            ) : (
                                <Typography variant="body2" color="warning.main">
                                    ⚠ Please select at least one activity to calculate schedule end time
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 1 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!formData.name || !formData.dayOfWeek || !formData.startTime || !formData.classId || formData.activities.length === 0}
                >
                    {schedule ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScheduleForm;