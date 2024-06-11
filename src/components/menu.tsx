import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box} from "@mui/material";

const MenuBar = () => {

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: 1}}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        BankDash
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                // className={classes.drawer}
                variant="permanent"
                // classes={{
                //     paper: classes.drawerPaper,
                // }}
            >
                <div/>
                <List>
                    {['Dashboard', 'Transactions', 'Accounts', 'Investments', 'Credit Cards', 'Loans', 'Services', 'My Privileges', 'Setting'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index === 0 && <DashboardIcon/>}
                                {index === 1 && <AccountBalanceIcon/>}
                                {index === 2 && <AccountBalanceIcon/>}
                                {index === 3 && <AttachMoneyIcon/>}
                                {index === 4 && <CreditCardIcon/>}
                                {index === 5 && <LocalAtmIcon/>}
                                {index === 6 && <SettingsIcon/>}
                                {index === 7 && <SettingsIcon/>}
                                {index === 8 && <SettingsIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main>
                <div/>
                {/* Add your main content here */}
            </main>
        </Box>
    );
};

export default MenuBar;
