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
const timeSlots = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
    '16:00-17:00', '08:00-12:00', '13:00-17:00', '08:00-17:00'
];

function ScheduleForm({ open, onClose, onSave, schedule = null, classes, activities }) {
    const [formData, setFormData] = useState({
        name: '',
        dayOfWeek: '',
        timeSlot: '',
        classId: '',
        activities: []
    });

    useEffect(() => {
        if (schedule) {
            setFormData({
                name: schedule.name || '',
                dayOfWeek: schedule.dayOfWeek || '',
                timeSlot: schedule.timeSlot || '',
                classId: schedule.classId || '',
                activities: schedule.activities || []
            });
        } else {
            setFormData({
                name: '',
                dayOfWeek: '',
                timeSlot: '',
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
        if (formData.name && formData.dayOfWeek && formData.timeSlot && formData.classId) {
            onSave(formData);
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
                    
                    {/* Time Slot */}
                    <FormControl fullWidth required sx={{ mb: 1 }}>
                        <InputLabel>Time Slot</InputLabel>
                        <Select
                            value={formData.timeSlot}
                            onChange={handleInputChange('timeSlot')}
                            label="Time Slot"
                        >
                            {timeSlots.map((slot) => (
                                <MenuItem key={slot} value={slot}>
                                    {slot}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
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
                        
                        {/* Total Duration Display */}
                        {formData.activities.length > 0 && (
                            <Box mt={2}>
                                <Typography variant="body2" color="text.secondary">
                                    Total Duration: {getTotalDuration()} minutes
                                </Typography>
                            </Box>
                        )}
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
                    disabled={!formData.name || !formData.dayOfWeek || !formData.timeSlot || !formData.classId}
                >
                    {schedule ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScheduleForm;