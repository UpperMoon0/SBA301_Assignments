import DashboardUI from "../components/ui/DashhboardUI.jsx";
import { 
    Assignment,
    Schedule, 
    ViewWeek
} from "@mui/icons-material";

function StaffLayout() {
    const navigate = [
        {
            segment: 'staff/activities',
            title: 'Activity Management',
            icon: <Assignment/>
        },
        {
            segment: 'staff/schedules',
            title: 'Schedule Management',
            icon: <Schedule/>
        },
        {
            segment: 'staff/weekly-schedules',
            title: 'Weekly Schedules',
            icon: <ViewWeek/>
        }
    ]
    return (
        <DashboardUI
            navigate={navigate}
            homeUrl={'/staff/activities'}
        />
    )
}

export default StaffLayout;