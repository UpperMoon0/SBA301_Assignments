import DashboardUI from "../components/ui/DashhboardUI.jsx";
import {
    InsertDriveFile,
    CalendarToday,
    Schedule,
    Event,
    ViewWeek,
    Assignment
} from "@mui/icons-material";

function ParentLayout() {
    const navigate = [
        {
            segment: 'parent/form',
            title: 'Admission Form',
            icon: <InsertDriveFile/>
        },
        {
            segment: 'parent/activities',
            title: 'Activity Management',
            icon: <Assignment/>
        },
        {
            segment: 'parent/schedules',
            title: 'Schedule Management',
            icon: <Schedule/>
        },
        {
            segment: 'parent/weekly-schedules',
            title: 'Weekly Schedules',
            icon: <ViewWeek/>
        }
    ]
    return (
        <DashboardUI
            navigate={navigate}
            homeUrl={'/parent/form'}
        />
    )
}

export default ParentLayout;