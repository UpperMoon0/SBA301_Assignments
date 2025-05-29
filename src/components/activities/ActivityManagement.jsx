import { useState, useEffect } from 'react';
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import ActivityList from './ActivityList';
import ActivityForm from './ActivityForm';
import { ActivityService } from '../../services/DataService';

function ActivityManagement() {
    const [activities, setActivities] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState(null);

    useEffect(() => {
        loadActivities();
    }, []);

    const loadActivities = () => {
        const data = ActivityService.getAll();
        setActivities(data);
    };

    const handleCreate = () => {
        setSelectedActivity(null);
        setFormOpen(true);
    };

    const handleEdit = (activity) => {
        setSelectedActivity(activity);
        setFormOpen(true);
    };

    const handleDelete = (activityId) => {
        setActivityToDelete(activityId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (activityToDelete) {
            ActivityService.delete(activityToDelete);
            loadActivities();
            enqueueSnackbar('Activity deleted successfully', { variant: 'success' });
        }
        setDeleteDialogOpen(false);
        setActivityToDelete(null);
    };

    const handleSave = (activityData) => {
        try {
            if (selectedActivity) {
                ActivityService.update(selectedActivity.id, activityData);
                enqueueSnackbar('Activity updated successfully', { variant: 'success' });
            } else {
                ActivityService.create(activityData);
                enqueueSnackbar('Activity created successfully', { variant: 'success' });
            }
            loadActivities();
            setFormOpen(false);
            setSelectedActivity(null);
        } catch (error) {
            enqueueSnackbar('Error saving activity', { variant: 'error' });
        }
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setSelectedActivity(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <ActivityList
                activities={activities}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
            />

            <ActivityForm
                open={formOpen}
                onClose={handleCloseForm}
                onSave={handleSave}
                activity={selectedActivity}
            />

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this activity? This action cannot be undone.
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

export default ActivityManagement;