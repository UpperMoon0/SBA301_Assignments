import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import {Home} from "./page/Home.jsx";
import {SnackbarProvider} from "notistack";
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ParentLayout from "./layouts/ParentLayout.jsx";
import ProtectRouter from "./config/ProtectRouter.jsx";
import AdmissionForm from "./components/parent/Form.jsx";
import ActivityManagement from "./components/activities/ActivityManagement.jsx";
import ScheduleManagement from "./components/schedules/ScheduleManagement.jsx";
import WeeklyScheduleManagement from "./components/schedules/WeeklyScheduleManagement.jsx";


const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: "/home",
        element: <Home/>
    },
    {
        path: '*',
        element: <Navigate to='/home'/>
    },
    {
        path: "/parent",
        element: (
            <ProtectRouter allowedRoles={["PARENT"]}>
                <ParentLayout/>
            </ProtectRouter>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/parent/form"/>
            },
            {
                path: 'form',
                element: <AdmissionForm/>
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
