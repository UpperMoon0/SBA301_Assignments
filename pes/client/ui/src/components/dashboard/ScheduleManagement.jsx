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
  Schedule as ScheduleIcon,
  Class as ClassIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    date: dayjs(),
    startTime: dayjs(),
    endTime: dayjs(),
    classesId: '',
    lessonId: '',
    note: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [schedulesRes, classesRes, lessonsRes] = await Promise.all([
        axios.get('/schedules'),
        axios.get('/classes'),
        axios.get('/lessons'),
      ]);

      if (schedulesRes.data.success) {
        setSchedules(schedulesRes.data.data);
      }
      if (classesRes.data.success) {
        setClasses(classesRes.data.data);
      }
      if (lessonsRes.data.success) {
        setLessons(lessonsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (schedule = null) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setFormData({
        date: dayjs(schedule.date),
        startTime: dayjs(`2024-01-01T${schedule.startTime}`),
        endTime: dayjs(`2024-01-01T${schedule.endTime}`),
        classesId: schedule.classes?.id || '',
        lessonId: schedule.lesson?.id || '',
        note: schedule.note || '',
      });
    } else {
      setEditingSchedule(null);
      setFormData({
        date: dayjs(),
        startTime: dayjs(),
        endTime: dayjs(),
        classesId: '',
        lessonId: '',
        note: '',
      });
    }
    setDialogOpen(true);
    setError('');
    setSuccess('');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingSchedule(null);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const scheduleData = {
        date: formData.date.format('YYYY-MM-DD'),
        startTime: formData.startTime.format('HH:mm:ss'),
        endTime: formData.endTime.format('HH:mm:ss'),
        classesId: formData.classesId,
        lessonId: formData.lessonId,
        note: formData.note,
      };

      let response;
      if (editingSchedule) {
        response = await axios.put(`/schedules/${editingSchedule.id}`, scheduleData);
      } else {
        response = await axios.post('/schedules', scheduleData);
      }

      if (response.data.success) {
        setSuccess(editingSchedule ? 'Schedule updated successfully!' : 'Schedule created successfully!');
        handleCloseDialog();
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      setError(error.response?.data?.message || 'Failed to save schedule');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/schedules/${scheduleToDelete.id}`);
      if (response.data.success) {
        setSuccess('Schedule deleted successfully!');
        setDeleteDialogOpen(false);
        setScheduleToDelete(null);
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      setError(error.response?.data?.message || 'Failed to delete schedule');
    }
  };

  const getClassName = (classObj) => {
    return classObj?.name || 'Unknown Class';
  };

  const getLessonName = (lessonObj) => {
    return lessonObj?.topic || 'Unknown Lesson';
  };

  const getStatusChip = (schedule) => {
    const scheduleDate = new Date(schedule.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (scheduleDate < today) {
      return <Chip label="Completed" color="success" size="small" />;
    } else if (scheduleDate.toDateString() === today.toDateString()) {
      return <Chip label="Today" color="warning" size="small" />;
    } else {
      return <Chip label="Upcoming" color="primary" size="small" />;
    }
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
            📅 Schedule Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage daily schedules for preschool classes
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Add Schedule
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
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Schedules
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {schedules.length}
                  </Typography>
                </Box>
                <ScheduleIcon sx={{ fontSize: 40, color: 'primary.light' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Today's Schedules
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {schedules.filter(s => 
                      new Date(s.date).toDateString() === new Date().toDateString()
                    ).length}
                  </Typography>
                </Box>
                <CalendarIcon sx={{ fontSize: 40, color: 'warning.light' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Active Classes
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {classes.length}
                  </Typography>
                </Box>
                <ClassIcon sx={{ fontSize: 40, color: 'secondary.light' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Schedules Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            All Schedules
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                  <TableCell><strong>Class</strong></TableCell>
                  <TableCell><strong>Lesson</strong></TableCell>
                  <TableCell><strong>Note</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.length > 0 ? (
                  schedules.map((schedule) => (
                    <TableRow key={schedule.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          {new Date(schedule.date).toLocaleDateString()}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          {schedule.startTime} - {schedule.endTime}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getClassName(schedule.classes)} 
                          color="primary" 
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{getLessonName(schedule.lesson)}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {schedule.note || 'No note'}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(schedule)}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenDialog(schedule)}
                          color="primary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setScheduleToDelete(schedule);
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
                        No schedules found. Click "Add Schedule" to create your first schedule.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Schedule Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newValue) => setFormData({ ...formData, startTime: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TimePicker
                label="End Time"
                value={formData.endTime}
                onChange={(newValue) => setFormData({ ...formData, endTime: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={formData.classesId}
                  label="Class"
                  onChange={(e) => setFormData({ ...formData, classesId: e.target.value })}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Lesson</InputLabel>
                <Select
                  value={formData.lessonId}
                  label="Lesson"
                  onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                >
                  {lessons.map((lesson) => (
                    <MenuItem key={lesson.id} value={lesson.id}>
                      {lesson.topic}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Note"
                multiline
                rows={3}
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Add any additional notes about this schedule..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSchedule ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this schedule? This action cannot be undone.
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

export default ScheduleManagement;