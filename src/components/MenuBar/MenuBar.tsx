import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box, Toolbar as MuiToolbar} from "@mui/material";
import ManageEmployeeScreen from "../../screens/Employee/ManageEmployeeScreen";
import ManageAttendanceScreen from "../../screens/Attendance/ManageAttendanceScreen";
import BirthdayReminderScreen from "../../screens/BirthdayReminder/BirthdayReminderScreen";
import LocationTrackerScreen from "../../screens/LocationTracker/LocationTrackerScreen";
import ManageProjectsScreen from "../../screens/ManageProjects/ManageProjects";
import DashboardScreen from "../../screens/Dashboard/DashboardScreen";

const drawerWidth = 240;

export const MenuBar = () => {
    const [currentScreen, setCurrentScreen] = useState('Dashboard');

    const handleMenuItemClick = (screen: string) => {
        setCurrentScreen(screen);
    };

    return (
        <Box sx={{display: 'flex', fontFamily: "inter"}}>
            <CssBaseline/>
            <AppBar elevation={0} position="fixed"
                    sx={{background: "white"}}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{color: "#343C6A", fontSize: 24}}>
                        HRES
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{color: "#343C6A", fontSize: 24}}>
                        HRES
                    </Typography>
                </Toolbar>
                <MuiToolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List sx={{color: "#B1B1B1", fontSize: 18}}>
                        {[
                            {
                                text: 'Dashboard',
                                icon: <DashboardIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Dashboard'
                            },
                            {
                                text: 'Manage Employees',
                                icon: <AccountBalanceIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Manage Employees'
                            },
                            {
                                text: 'Attendance',
                                icon: <AccountBalanceIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Attendance'
                            },
                            {
                                text: 'Birthdays',
                                icon: <AttachMoneyIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Birthdays'
                            },
                            {
                                text: 'Location Tracker',
                                icon: <CreditCardIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Location Tracker'
                            },
                            {
                                text: 'Projects',
                                icon: <LocalAtmIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Projects'
                            },
                            {
                                text: 'Services',
                                icon: <SettingsIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Services'
                            },
                            {
                                text: 'My Privileges',
                                icon: <SettingsIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'My Privileges'
                            },
                            {
                                text: 'Setting',
                                icon: <SettingsIcon sx={{color: "#B1B1B1", fontSize: 18}}/>,
                                screen: 'Setting'
                            }
                        ].map(({text, icon, screen}) => (
                            <ListItem button key={text} onClick={() => handleMenuItemClick(screen)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text}/>
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
                {currentScreen === 'Dashboard' && <DashboardScreen/>}
                {currentScreen === 'Manage Employees' && <ManageEmployeeScreen/>}
                {currentScreen === 'Attendance' && <ManageAttendanceScreen/>}
                {currentScreen === 'Birthdays' && <BirthdayReminderScreen/>}
                {currentScreen === 'Location Tracker' && <LocationTrackerScreen/>}
                {currentScreen === 'Projects' && <ManageProjectsScreen/>}
            </Box>
        </Box>
    );
};

// export default MenuBar;
