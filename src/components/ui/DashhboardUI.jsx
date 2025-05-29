import {createTheme} from "@mui/material";
import {useState} from "react";
import { AppProvider as ReactRouterAppProvider, DashboardLayout } from '@toolpad/core';
import { Outlet } from 'react-router-dom';

export default function DashboardUI({navigate, homeUrl}) {
    const [session, setSession] = useState(
        localStorage.getItem("user") ?
            JSON.parse(localStorage.getItem("user"))
            : {user: {email: "", name: ""}}
    );
    const authen = {
        signIn: () => {
            setSession(session);
        },
        signOut: () => {
            setSession(null);
            window.location.href = "/login"
        }
    }

    const theme = createTheme({
        colorSchemes: { light: true, dark: false },
    });

    return (
        <ReactRouterAppProvider
            navigation={navigate}
            branding={
                {
                    title: "School Schedule Management",
                    homeUrl: homeUrl
                }
            }
            theme={theme}
            authentication={authen}
            session={session}
        >
            <DashboardLayout>
                <Outlet/>
            </DashboardLayout>
        </ReactRouterAppProvider>
    )
}