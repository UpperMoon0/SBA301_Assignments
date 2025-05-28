import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Fab,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as ActivityIcon,
  Assignment as AssignIcon,
  DateRange as DateIcon,
  Class as ClassIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';

const ActivityManagement = () => {
  const [activities, setActivities] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [activityToAssign, setActivityToAssign] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: dayjs(),
    endDate: dayjs(),
    location: '',
    type: 'INDOOR',
    status: 'ACTIVE',
  });

  const [assignData, setAssignData] = useState({
    classesId: '',
  });

  const activityTypes = [
    { value: 'INDOOR', label: '🏠 Indoor Activity' },
    { value: 'OUTDOOR', label: '🌳 Outdoor Activity' },
    { value: 'CREATIVE', label: '🎨 Creative Activity' },
    { value: 'PHYSICAL', label: '⚽ Physical Activity' },
    { value: 'EDUCATIONAL', label: '📚 Educational Activity' },
    { value: 'MUSIC', label: '🎵 Music Activity' },
  ];

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active', color: 'success' },
    { value: 'INACTIVE', label: 'Inactive', color: 'default' },
    { value: 'PLANNED', label: 'Planned', color: 'primary' },
    { value: 'COMPLETED', label: 'Completed', color: 'secondary' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [activitiesRes, classesRes] = await Promise.all([
        axios.get('/activities'),
        axios.get('/classes'),
      ]);

      if (activitiesRes.data.success) {
        setActivities(activitiesRes.data.data);
      }
      if (classesRes.data.success) {
        setClasses(classesRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (activity = null) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        name: activity.name || '',
        description: activity.description || '',
        startDate: dayjs(activity.startDate),
        endDate: dayjs(activity.endDate),
        location: activity.location || '',
        type: activity.type || 'INDOOR',
        status: activity.status || 'ACTIVE',
      });
    } else {
      setEditingActivity(null);
      setFormData({
        name: '',
        description: '',
        startDate: dayjs(),
        endDate: dayjs(),
        location: '',
        type: 'INDOOR',
        status: 'ACTIVE',
      });
    }
    setDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingActivity(null);
    setError('');
  };

  const handleOpenAssignDialog = (activity) => {
    setActivityToAssign(activity);
    setAssignData({ classesId: '' });
    setAssignDialogOpen(true);
    setError('');
  };

  const handleCloseAssignDialog = () => {
    setAssignDialogOpen(false);
    setActivityToAssign(null);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const activityData = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate.format('YYYY-MM-DD'),
        endDate: formData.endDate.format('YYYY-MM-DD'),
        location: formData.location,
        type: formData.type,
        status: formData.status,
      };

      let response;
      if (editingActivity) {
        response = await axios.put(`/activities/${editingActivity.id}`, activityData);
      } else {
        response = await axios.post('/activities', activityData);
      }

      if (response.data.success) {
        setSuccess(editingActivity ? 'Activity updated successfully!' : 'Activity created successfully!');
        handleCloseDialog();
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving activity:', error);
      setError(error.response?.data?.message || 'Failed to save activity');
    }
  };

  const handleAssignToClass = async () => {
    try {
      const response = await axios.post('/activities/assign-to-class', {
        activityId: activityToAssign.id,
        classesId: assignData.classesId,
      });

      if (response.data.success) {
        setSuccess('Activity assigned to class successfully!');
        handleCloseAssignDialog();
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Assignment failed');
      }
    } catch (error) {
      console.error('Error assigning activity:', error);
      setError(error.response?.data?.message || 'Failed to assign activity');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/activities/${activityToDelete.id}`);
      if (response.data.success) {
        setSuccess('Activity deleted successfully!');
        setDeleteDialogOpen(false);
        setActivityToDelete(null);
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
      setError(error.response?.data?.message || 'Failed to delete activity');
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = statusOptions.find(opt => opt.value === status) || statusOptions[0];
    return <Chip label={statusConfig.label} color={statusConfig.color} size="small" />;
  };

  const getTypeIcon = (type) => {
    const typeConfig = activityTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.label.split(' ')[0] : '📝';
  };

  const getActivityDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays === 1 ? '1 day' : `${diffDays} days`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🎨 Activity Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage educational and recreational activities for preschool
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Add Activity
        </Button>
      </Box>

      {/* Success/Error Messages */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Activities
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {activities.length}
                  </Typography>
                </Box>
                <ActivityIcon sx={{ fontSize: 40, color: 'primary.light' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Active Activities
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {activities.filter(a => a.status === 'ACTIVE').length}
                  </Typography>
                </Box>
                <ActivityIcon sx={{ fontSize: 40, color: 'success.light' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Planned Activities
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {activities.filter(a => a.status === 'PLANNED').length}
                  </Typography>
                </Box>
                <DateIcon sx={{ fontSize: 40, color: 'warning.light' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Completed
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {activities.filter(a => a.status === 'COMPLETED').length}
                  </Typography>
                </Box>
                <ActivityIcon sx={{ fontSize: 40, color: 'secondary.light' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Activities Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            All Activities
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Activity</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Date Range</strong></TableCell>
                  <TableCell><strong>Duration</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <TableRow key={activity.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {getTypeIcon(activity.type)} {activity.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.description?.length > 50 
                              ? `${activity.description.substring(0, 50)}...` 
                              : activity.description || 'No description'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={activityTypes.find(t => t.value === activity.type)?.label.split(' ')[1] || activity.type}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DateIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                          <Box>
                            <Typography variant="body2">
                              {new Date(activity.startDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              to {new Date(activity.endDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getActivityDuration(activity.startDate, activity.endDate)}
                          size="small"
                          color="info"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {activity.location || 'Not specified'}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(activity.status)}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenDialog(activity)}
                          color="primary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenAssignDialog(activity)}
                          color="secondary"
                          size="small"
                        >
                          <AssignIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setActivityToDelete(activity);
                            setDeleteDialogOpen(true);
                          }}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No activities found. Click "Add Activity" to create your first activity.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Activity Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingActivity ? 'Edit Activity' : 'Add New Activity'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Activity Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Activity Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {activityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the activity..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={(newValue) => setFormData({ ...formData, endDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Playground, Art Room, Garden"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingActivity ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign to Class Dialog */}
      <Dialog open={assignDialogOpen} onClose={handleCloseAssignDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Activity to Class</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Assign "{activityToAssign?.name}" to a class
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={assignData.classesId}
              label="Select Class"
              onChange={(e) => setAssignData({ ...assignData, classesId: e.target.value })}
            >
              {classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ClassIcon sx={{ mr: 1 }} />
                    {cls.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog}>Cancel</Button>
          <Button onClick={handleAssignToClass} variant="contained">
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{activityToDelete?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', sm: 'none' },
        }}
        onClick={() => handleOpenDialog()}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ActivityManagement;