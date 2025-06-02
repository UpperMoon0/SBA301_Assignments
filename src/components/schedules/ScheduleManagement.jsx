import { useState, useEffect } from 'react';
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import ScheduleList from './ScheduleList';
import ScheduleForm from './ScheduleForm';
import { ScheduleService, ClassService, ActivityService } from '../../services/DataService';

function ScheduleManagement() {
    const [schedules, setSchedules] = useState([]);
    const [classes, setClasses] = useState([]);
    const [activities, setActivities] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const schedulesData = ScheduleService.getAll();
        const classesData = ClassService.getAll();
        const activitiesData = ActivityService.getAll();
        
        setSchedules(schedulesData);
        setClasses(classesData);
        setActivities(activitiesData);
    };

    const handleCreate = () => {
        setSelectedSchedule(null);
        setFormOpen(true);
    };

    const handleEdit = (schedule) => {
        setSelectedSchedule(schedule);
        setFormOpen(true);
    };

    const handleDelete = (scheduleId) => {
        setScheduleToDelete(scheduleId);
        setDeleteDialogOpen(true);
    };

    const handleView = (schedule) => {
        // For now, just edit - you could create a separate view modal
        handleEdit(schedule);
    };

    const confirmDelete = () => {
        if (scheduleToDelete) {
            ScheduleService.delete(scheduleToDelete);
            loadData();
            enqueueSnackbar('Schedule deleted successfully', { variant: 'success' });
        }
        setDeleteDialogOpen(false);
        setScheduleToDelete(null);
    };

    const handleSave = (scheduleData) => {
        try {
            if (selectedSchedule) {
                ScheduleService.update(selectedSchedule.id, scheduleData);
                enqueueSnackbar('Schedule updated successfully', { variant: 'success' });
            } else {
                ScheduleService.create(scheduleData);
                enqueueSnackbar('Schedule created successfully', { variant: 'success' });
            }
            loadData();
            setFormOpen(false);
            setSelectedSchedule(null);
        } catch (error) {
            enqueueSnackbar('Error saving schedule', { variant: 'error' });
        }
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setSelectedSchedule(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <ScheduleList
                schedules={schedules}
                classes={classes}
                activities={activities}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
                onView={handleView}
            />

            <ScheduleForm
                open={formOpen}
                onClose={handleCloseForm}
                onSave={handleSave}
                schedule={selectedSchedule}
                classes={classes}
                activities={activities}
            />

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this schedule? This action cannot be undone.
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

export default ScheduleManagement;