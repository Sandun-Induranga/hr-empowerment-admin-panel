import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TableChartIcon from '@mui/icons-material/TableChart';
import CakeIcon from '@mui/icons-material/Cake';
import PlaceIcon from '@mui/icons-material/Place';
import DevicesIcon from '@mui/icons-material/Devices';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Avatar, IconButton, Toolbar as MuiToolbar } from "@mui/material";
import ManageEmployeeScreen from "../../screens/Employee/ManageEmployeeScreen";
import ManageAttendanceScreen from "../../screens/Attendance/ManageAttendanceScreen";
import BirthdayReminderScreen from "../../screens/BirthdayReminder/BirthdayReminderScreen";
import LocationTrackerScreen from "../../screens/LocationTracker/LocationTrackerScreen";
import ManageProjectsScreen from "../../screens/ManageProjects/ManageProjects";
import DashboardScreen from "../../screens/Dashboard/DashboardScreen";
import {Feedback, NoteAddTwoTone} from "@mui/icons-material";
import ManageLeavesScreen from "../../screens/Leaves/LeavesScreen";
import {useNavigate} from "react-router-dom";
import FeedbackScreen from '../../screens/Feedback/FeedbackScreen';

const drawerWidth = 240;

export const MenuBar = () => {
    const [currentScreen, setCurrentScreen] = useState('Dashboard');
    const navigate = useNavigate();

    const handleMenuItemClick = (screen: string) => {
        setCurrentScreen(screen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', fontFamily: "inter" }}>
            <CssBaseline />
            <AppBar elevation={0} position="fixed" sx={{ background: "white" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" noWrap sx={{ color: "#343C6A", fontSize: 24 }}>
                        HRES
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ color: "#343C6A", fontSize: 16, marginRight: 2 }}>
                            Admin
                        </Typography>
                        <Avatar alt="Admin" src="https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png" sx={{ marginRight: 2 }} />
                        <IconButton onClick={handleLogout} color="inherit">
                            <LogoutIcon sx={{ color: "#343C6A" }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ color: "#343C6A", fontSize: 24 }}>
                        HRES
                    </Typography>
                </Toolbar>
                <MuiToolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List sx={{ color: "#B1B1B1", fontSize: 18 }}>
                        {[
                            {
                                text: 'Dashboard',
                                icon: <HomeIcon sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Dashboard'
                            },
                            {
                                text: 'Manage Employees',
                                icon: <Diversity3Icon sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Manage Employees'
                            },
                            {
                                text: 'Attendance',
                                icon: <TableChartIcon sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Attendance'
                            },
                            {
                                text: 'Leaves',
                                icon: <NoteAddTwoTone sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Leaves'
                            },
                            {
                                text: 'Birthdays',
                                icon: <CakeIcon sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Birthdays'
                            },
                            {
                                text: 'Location Tracker',
                                icon: <PlaceIcon sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Location Tracker'
                            },
                            ...(localStorage.getItem('role') === 'Head' ? [{
                                text: 'Projects',
                                icon: <DevicesIcon sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Projects'
                            }] : []),
                            {
                                text: 'Feedback',
                                icon: <Feedback sx={{ color: "#B1B1B1", fontSize: 18 }} />,
                                screen: 'Feedback'
                            }
                        ].map(({ text, icon, screen }) => (
                            <ListItem button key={text} onClick={() => handleMenuItemClick(screen)}>
                                <ListItemIcon sx={currentScreen === screen ?  {color: '#343C6A', fontWeight: 'bold' } : { color: '#B1B1B1' }}>{icon}</ListItemIcon>
                                <ListItemText sx={currentScreen === screen ?  {color: '#343C6A', fontWeight: 'bold' } : { color: '#B1B1B1' }} primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 6,
                    backgroundColor: "#E6EFF5",
                    minHeight: '94vh',
                }}
            >
                {currentScreen === 'Dashboard' && <DashboardScreen />}
                {currentScreen === 'Manage Employees' && <ManageEmployeeScreen />}
                {currentScreen === 'Attendance' && <ManageAttendanceScreen />}
                {currentScreen === 'Leaves' && <ManageLeavesScreen />}
                {currentScreen === 'Birthdays' && <BirthdayReminderScreen />}
                {currentScreen === 'Location Tracker' && <LocationTrackerScreen />}
                {currentScreen === 'Projects' && <ManageProjectsScreen />}
                {currentScreen === 'Feedback' && <FeedbackScreen />}
            </Box>
        </Box>
    );
};

// export default MenuBar;
