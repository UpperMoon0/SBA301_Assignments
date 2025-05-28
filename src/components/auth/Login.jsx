import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { School, AccountCircle } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Quick login presets for testing
  const quickLogins = [
    { label: 'Director', email: 'director@sunflowerpreschool.com', password: 'director123' },
    { label: 'Head Teacher', email: 'ms.emily@sunflowerpreschool.com', password: 'teacher123' },
    { label: 'Teacher', email: 'mr.david@sunflowerpreschool.com', password: 'teacher123' },
    { label: 'Parent', email: 'parent@example.com', password: 'parent123' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleQuickLogin = (preset) => {
    setFormData({
      email: preset.email,
      password: preset.password,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
                <School fontSize="large" />
              </Avatar>
              <Typography component="h1" variant="h4" color="primary" gutterBottom>
                🌻 Sunflower Preschool
              </Typography>
              <Typography variant="h6" color="text.secondary" align="center">
                Schedule & Activity Management
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: <AccountCircle sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Box>

            {/* Quick Login Section for Demo */}
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                Quick Login for Demo:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {quickLogins.map((preset) => (
                  <Button
                    key={preset.label}
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuickLogin(preset)}
                    disabled={loading}
                    sx={{ minWidth: 100 }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" align="center" display="block">
                💡 Demo Tip: Use the quick login buttons above or enter credentials manually
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;