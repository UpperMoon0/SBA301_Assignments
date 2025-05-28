import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  Paper,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Event as ActivityIcon,
  Class as ClassIcon,
  TrendingUp,
  Today,
  CalendarMonth,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSchedules: 0,
    totalActivities: 0,
    todaySchedules: 0,
    upcomingActivities: 0,
  });
  const [recentSchedules, setRecentSchedules] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch schedules and activities
      const [schedulesRes, activitiesRes] = await Promise.all([
        axios.get('/schedules'),
        axios.get('/activities'),
      ]);

      if (schedulesRes.data.success) {
        const schedules = schedulesRes.data.data;
        setRecentSchedules(schedules.slice(0, 5));
        setStats(prev => ({
          ...prev,
          totalSchedules: schedules.length,
          todaySchedules: schedules.filter(s => 
            new Date(s.date).toDateString() === new Date().toDateString()
          ).length,
        }));
      }

      if (activitiesRes.data.success) {
        const activities = activitiesRes.data.data;
        setRecentActivities(activities.slice(0, 5));
        setStats(prev => ({
          ...prev,
          totalActivities: activities.length,
          upcomingActivities: activities.filter(a => 
            new Date(a.endDate) > new Date()
          ).length,
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Schedules',
      value: stats.totalSchedules,
      icon: <ScheduleIcon />,
      color: 'primary',
      action: () => navigate('/dashboard/schedules'),
    },
    {
      title: 'Total Activities',
      value: stats.totalActivities,
      icon: <ActivityIcon />,
      color: 'secondary',
      action: () => navigate('/dashboard/activities'),
    },
    {
      title: "Today's Schedules",
      value: stats.todaySchedules,
      icon: <Today />,
      color: 'warning',
      action: () => navigate('/dashboard/schedules'),
    },
    {
      title: 'Upcoming Activities',
      value: stats.upcomingActivities,
      icon: <CalendarMonth />,
      color: 'success',
      action: () => navigate('/dashboard/activities'),
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getRoleEmoji = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return '👩‍💼';
      case 'teacher': return '👩‍🏫';
      case 'user': return '👨‍👩‍👧‍👦';
      default: return '👤';
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Paper 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #FFE082 0%, #FFB74D 100%)',
          color: 'text.primary',
          borderRadius: 3,
        }}
      >
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'white',
                color: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {getRoleEmoji(user?.role)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 🌻
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, mb: 1 }}>
              Welcome to Sunflower Preschool Management System
            </Typography>
            <Chip 
              label={`${user?.role || 'USER'} Access`}
              sx={{ 
                backgroundColor: 'white', 
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
              onClick={stat.action}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color={`${stat.color}.main`}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: `${stat.color}.light`,
                      color: `${stat.color}.main`,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📅 Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<ScheduleIcon />}
                  onClick={() => navigate('/dashboard/schedules')}
                  fullWidth
                  size="large"
                >
                  Manage Schedules
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ActivityIcon />}
                  onClick={() => navigate('/dashboard/activities')}
                  fullWidth
                  size="large"
                >
                  Manage Activities
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🎯 System Overview
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Active Schedules
                  </Typography>
                  <Chip label={stats.totalSchedules} color="primary" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Active Activities
                  </Typography>
                  <Chip label={stats.totalActivities} color="secondary" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Today's Schedule Items
                  </Typography>
                  <Chip label={stats.todaySchedules} color="warning" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Items */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📋 Recent Schedules
              </Typography>
              {recentSchedules.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {recentSchedules.map((schedule, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        backgroundColor: 'background.default',
                        borderRadius: 1,
                        borderLeft: 4,
                        borderLeftColor: 'primary.main',
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {schedule.title || `Schedule ${schedule.id}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {schedule.date} • {schedule.startTime} - {schedule.endTime}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                  No schedules available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🎨 Recent Activities
              </Typography>
              {recentActivities.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {recentActivities.map((activity, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        backgroundColor: 'background.default',
                        borderRadius: 1,
                        borderLeft: 4,
                        borderLeftColor: 'secondary.main',
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {activity.name || `Activity ${activity.id}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.startDate} - {activity.endDate}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                  No activities available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;