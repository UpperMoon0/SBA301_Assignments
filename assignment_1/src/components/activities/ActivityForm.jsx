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
    Grid
} from "@mui/material";
import { useState, useEffect } from "react";

const activityTypes = ['Social', 'Creative', 'Educational', 'Physical', 'Routine'];
const ageGroups = ['2-3 years', '3-4 years', '4-5 years', '3-5 years', '2-5 years'];

function ActivityForm({ open, onClose, onSave, activity = null }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: '',
        type: '',
        materials: [],
        ageGroup: ''
    });
    const [materialInput, setMaterialInput] = useState('');

    useEffect(() => {
        if (activity) {
            setFormData({
                name: activity.name || '',
                description: activity.description || '',
                duration: activity.duration || '',
                type: activity.type || '',
                materials: activity.materials || [],
                ageGroup: activity.ageGroup || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                duration: '',
                type: '',
                materials: [],
                ageGroup: ''
            });
        }
    }, [activity, open]);

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleAddMaterial = () => {
        if (materialInput.trim() && !formData.materials.includes(materialInput.trim())) {
            setFormData({
                ...formData,
                materials: [...formData.materials, materialInput.trim()]
            });
            setMaterialInput('');
        }
    };

    const handleRemoveMaterial = (materialToRemove) => {
        setFormData({
            ...formData,
            materials: formData.materials.filter(material => material !== materialToRemove)
        });
    };

    const handleSubmit = () => {
        if (formData.name && formData.type && formData.duration && formData.ageGroup) {
            onSave(formData);
            onClose();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddMaterial();
        }
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
                {activity ? 'Edit Activity' : 'Create New Activity'}
            </DialogTitle>
            
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                    {/* Activity Name */}
                    <TextField
                        fullWidth
                        label="Activity Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        required
                        variant="outlined"
                        sx={{ mb: 1 }}
                    />
                    
                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        value={formData.description}
                        onChange={handleInputChange('description')}
                        multiline
                        rows={3}
                        variant="outlined"
                        sx={{ mb: 1 }}
                    />
                    
                    {/* Activity Type */}
                    <FormControl fullWidth required sx={{ mb: 1 }}>
                        <InputLabel>Activity Type</InputLabel>
                        <Select
                            value={formData.type}
                            onChange={handleInputChange('type')}
                            label="Activity Type"
                        >
                            {activityTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    {/* Duration */}
                    <TextField
                        fullWidth
                        label="Duration (minutes)"
                        type="number"
                        value={formData.duration}
                        onChange={handleInputChange('duration')}
                        required
                        variant="outlined"
                        inputProps={{ min: 1, max: 120 }}
                        sx={{ mb: 1 }}
                    />
                    
                    {/* Age Group */}
                    <FormControl fullWidth required sx={{ mb: 1 }}>
                        <InputLabel>Age Group</InputLabel>
                        <Select
                            value={formData.ageGroup}
                            onChange={handleInputChange('ageGroup')}
                            label="Age Group"
                        >
                            {ageGroups.map((group) => (
                                <MenuItem key={group} value={group}>
                                    {group}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 1 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    disabled={!formData.name || !formData.type || !formData.duration || !formData.ageGroup}
                >
                    {activity ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ActivityForm;