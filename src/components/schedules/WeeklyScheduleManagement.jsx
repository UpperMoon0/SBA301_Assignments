import { useState, useEffect } from 'react';
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import WeeklyScheduleView from './WeeklyScheduleView';
import WeeklyScheduleForm from './WeeklyScheduleForm';
import { WeeklyScheduleService, ScheduleService, ClassService } from '../../services/DataService';

function WeeklyScheduleManagement() {
    const [weeklySchedules, setWeeklySchedules] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [classes, setClasses] = useState([]);
    const [activities, setActivities] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedWeeklySchedule, setSelectedWeeklySchedule] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const weeklySchedulesData = WeeklyScheduleService.getAll();
        const schedulesData = ScheduleService.getAll();
        const classesData = ClassService.getAll();
        
        setWeeklySchedules(weeklySchedulesData);
        setSchedules(schedulesData);
        setClasses(classesData);
    };

    const handleCreate = () => {
        setSelectedWeeklySchedule(null);
        setFormOpen(true);
    };

    const handleEdit = (weeklySchedule) => {
        setSelectedWeeklySchedule(weeklySchedule);
        setFormOpen(true);
    };

    const handleDelete = (weeklyScheduleId) => {
        setScheduleToDelete(weeklyScheduleId);
        setDeleteDialogOpen(true);
    };

    const handleView = (weeklySchedule) => {
        // For now, just edit - you could create a separate detailed view modal
        handleEdit(weeklySchedule);
    };

    const confirmDelete = () => {
        if (scheduleToDelete) {
            WeeklyScheduleService.delete(scheduleToDelete);
            loadData();
            enqueueSnackbar('Weekly schedule deleted successfully', { variant: 'success' });
        }
        setDeleteDialogOpen(false);
        setScheduleToDelete(null);
    };

    const handleSave = (weeklyScheduleData) => {
        try {
            if (selectedWeeklySchedule) {
                WeeklyScheduleService.update(selectedWeeklySchedule.id, weeklyScheduleData);
                enqueueSnackbar('Weekly schedule updated successfully', { variant: 'success' });
            } else {
                WeeklyScheduleService.create(weeklyScheduleData);
                enqueueSnackbar('Weekly schedule created successfully', { variant: 'success' });
            }
            loadData();
            setFormOpen(false);
            setSelectedWeeklySchedule(null);
        } catch (error) {
            enqueueSnackbar('Error saving weekly schedule', { variant: 'error' });
        }
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setSelectedWeeklySchedule(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <WeeklyScheduleView
                weeklySchedules={weeklySchedules}
                schedules={schedules}
                classes={classes}
                activities={activities}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
                onView={handleView}
            />

            <WeeklyScheduleForm
                open={formOpen}
                onClose={handleCloseForm}
                onSave={handleSave}
                weeklySchedule={selectedWeeklySchedule}
                classes={classes}
                schedules={schedules}
            />

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this weekly schedule? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default WeeklyScheduleManagement;