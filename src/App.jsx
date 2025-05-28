import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import { Box } from '@mui/material';

// Preschool-themed color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB74D', // Warm orange - like sunflower petals
      light: '#FFE082',
      dark: '#F57F17',
    },
    secondary: {
      main: '#81C784', // Soft green - like leaves
      light: '#A5D6A7',
      dark: '#388E3C',
    },
    success: {
      main: '#66BB6A',
    },
    warning: {
      main: '#FFB74D',
    },
    error: {
      main: '#EF5350',
    },
    background: {
      default: '#FFF9C4', // Very light yellow - warm and welcoming
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2723', // Dark brown - friendly and readable
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Comic Sans MS", cursive',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#3E2723',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#3E2723',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#3E2723',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFB74D',
          color: '#3E2723',
        },
      },
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <Router>
            <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
              <Routes>
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/dashboard/*" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Box>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;