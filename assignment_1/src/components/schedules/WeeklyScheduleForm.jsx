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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function WeeklyScheduleForm({ open, onClose, onSave, weeklySchedule = null, classes, schedules }) {
    const [formData, setFormData] = useState({
        name: '',
        weekStartDate: null,
        weekEndDate: null,
        classId: '',
        schedules: []
    });

    useEffect(() => {
        if (weeklySchedule) {
            setFormData({
                name: weeklySchedule.name || '',
                weekStartDate: weeklySchedule.weekStartDate ? dayjs(weeklySchedule.weekStartDate) : null,
                weekEndDate: weeklySchedule.weekEndDate ? dayjs(weeklySchedule.weekEndDate) : null,
                classId: weeklySchedule.classId || '',
                schedules: weeklySchedule.schedules || []
            });
        } else {
            setFormData({
                name: '',
                weekStartDate: null,
                weekEndDate: null,
                classId: '',
                schedules: []
            });
        }
    }, [weeklySchedule, open]);

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleDateChange = (field) => (newValue) => {
        setFormData({
            ...formData,
            [field]: newValue
        });
        
        // Auto-calculate end date if start date is selected
        if (field === 'weekStartDate' && newValue) {
            const endDate = newValue.add(6, 'day');
            setFormData(prev => ({
                ...prev,
                [field]: newValue,
                weekEndDate: endDate
            }));
        }
    };

    const handleSchedulesChange = (event, newValue) => {
        setFormData({
            ...formData,
            schedules: newValue.map(schedule => schedule.id)
        });
    };

    const handleSubmit = () => {
        if (formData.name && formData.weekStartDate && formData.weekEndDate && formData.classId) {
            const submitData = {
                ...formData,
                weekStartDate: formData.weekStartDate.format('YYYY-MM-DD'),
                weekEndDate: formData.weekEndDate.format('YYYY-MM-DD')
            };
            onSave(submitData);
            onClose();
        }
    };

    const getScheduleOptions = () => {
        // Filter schedules by selected class
        const filteredSchedules = formData.classId 
            ? schedules.filter(schedule => schedule.classId === parseInt(formData.classId))
            : schedules;
            
        return filteredSchedules.map(schedule => ({
            id: schedule.id,
            label: `${schedule.name} (${schedule.dayOfWeek} ${schedule.timeSlot})`,
            dayOfWeek: schedule.dayOfWeek,
            timeSlot: schedule.timeSlot
        }));
    };

    const getSelectedSchedules = () => {
        return schedules.filter(schedule => formData.schedules.includes(schedule.id))
            .map(schedule => ({
                id: schedule.id,
                label: `${schedule.name} (${schedule.dayOfWeek} ${schedule.timeSlot})`,
                dayOfWeek: schedule.dayOfWeek,
                timeSlot: schedule.timeSlot
            }));
    };

    const getSelectedClassName = () => {
        const selectedClass = classes.find(cls => cls.id === parseInt(formData.classId));
        return selectedClass ? selectedClass.name : '';
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
                {weeklySchedule ? 'Edit Weekly Schedule' : 'Create New Weekly Schedule'}
            </DialogTitle>
            
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                    {/* Weekly Schedule Name */}
                    <TextField
                        fullWidth
                        label="Weekly Schedule Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        required
                        variant="outlined"
                        placeholder="e.g., Week 1 - Introduction Activities"
                        sx={{ mb: 1 }}
                    />
                    
                    {/* Week Start Date */}
                    <Box sx={{ mb: 1 }}>
                        <DatePicker
                            label="Week Start Date"
                            value={formData.weekStartDate}
                            onChange={handleDateChange('weekStartDate')}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true
                                }
                            }}
                        />
                    </Box>
                    
                    {/* Week End Date */}
                    <Box sx={{ mb: 1 }}>
                        <DatePicker
                            label="Week End Date"
                            value={formData.weekEndDate}
                            onChange={handleDateChange('weekEndDate')}
                            disabled={!formData.weekStartDate}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true
                                }
                            }}
                        />
                    </Box>
                    
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
                    
                    {/* Schedules Section */}
                    {formData.classId && (
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                                Select Schedules for {getSelectedClassName()}
                            </Typography>
                            <Autocomplete
                                multiple
                                options={getScheduleOptions()}
                                value={getSelectedSchedules()}
                                onChange={handleSchedulesChange}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        <Box>
                                            <Typography variant="body2">{option.label}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {option.dayOfWeek} • {option.timeSlot}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            key={option.id}
                                            label={option.label}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Schedules"
                                        placeholder="Choose daily schedules for this week"
                                    />
                                )}
                            />
                            
                            {/* Selected Schedules Count */}
                            {formData.schedules.length > 0 && (
                                <Box mt={2}>
                                    <Typography variant="body2" color="text.secondary">
                                        {formData.schedules.length} schedule(s) selected
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 1 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    disabled={!formData.name || !formData.weekStartDate || !formData.weekEndDate || !formData.classId}
                >
                    {weeklySchedule ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default WeeklyScheduleForm;