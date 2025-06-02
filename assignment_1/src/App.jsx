import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import {SnackbarProvider} from "notistack";
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import StaffLayout from "./layouts/StaffLayout.jsx";
import ProtectedRoute from "./config/ProtectedRoute.jsx";
import ActivityManagement from "./components/activities/ActivityManagement.jsx";
import ScheduleManagement from "./components/schedules/ScheduleManagement.jsx";
import WeeklyScheduleManagement from "./components/schedules/WeeklyScheduleManagement.jsx";


const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '*',
        element: <Navigate to='/staff/activities'/>
    },
    {
        path: "/staff",
        element: (
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
                <StaffLayout/>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/staff/activities"/>
            },
            {
                path: 'activities',
                element: <ActivityManagement/>
            },
            {
                path: 'schedules',
                element: <ScheduleManagement/>
            },
            {
                path: 'weekly-schedules',
                element: <WeeklyScheduleManagement/>
            }
        ]
    },
])

function App() {

    return (
        <>
            <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                              autoHideDuration={3000}>
                <RouterProvider router={router}/>
            </SnackbarProvider>
        </>
    )
}

export default App
