import React, { useState } from 'react';
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
import { Box, Toolbar as MuiToolbar } from "@mui/material";
import ManageEmployeeScreen from "../../screens/Employee/ManageEmployeeScreen";
import ManageAttendanceScreen from "../../screens/Attendance/ManageAttendanceScreen";
import BirthdayReminderScreen from "../../screens/BirthdayReminder/BirthdayReminderScreen";
import LocationTrackerScreen from "../../screens/LocationTracker/LocationTrackerScreen";

const drawerWidth = 240;

export const MenuBar = () => {
    const [currentScreen, setCurrentScreen] = useState('Dashboard');

    const handleMenuItemClick = (screen: string) => {
        setCurrentScreen(screen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar elevation={0} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        HRES
                    </Typography>
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
                <MuiToolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            { text: 'Dashboard', icon: <DashboardIcon />, screen: 'Dashboard' },
                            { text: 'Manage Employees', icon: <AccountBalanceIcon />, screen: 'Manage Employees' },
                            { text: 'Attendance', icon: <AccountBalanceIcon />, screen: 'Attendance' },
                            { text: 'Birthdays', icon: <AttachMoneyIcon />, screen: 'Birthdays' },
                            { text: 'Location Tracker', icon: <CreditCardIcon />, screen: 'Location Tracker' },
                            { text: 'Loans', icon: <LocalAtmIcon />, screen: 'Loans' },
                            { text: 'Services', icon: <SettingsIcon />, screen: 'Services' },
                            { text: 'My Privileges', icon: <SettingsIcon />, screen: 'My Privileges' },
                            { text: 'Setting', icon: <SettingsIcon />, screen: 'Setting' }
                        ].map(({ text, icon, screen }) => (
                            <ListItem button key={text} onClick={() => handleMenuItemClick(screen)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
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
                }}
            >
                {currentScreen === 'Dashboard' && <DashboardIcon />}
                {currentScreen === 'Manage Employees' && <ManageEmployeeScreen />}
                {currentScreen === 'Attendance' && <ManageAttendanceScreen />}
                {currentScreen === 'Birthdays' && <BirthdayReminderScreen />}
                {currentScreen === 'Location Tracker' && <LocationTrackerScreen />}
            </Box>
        </Box>
    );
};

// export default MenuBar;
