import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper, Box,
} from '@mui/material';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import dashboardImage from "../../assets/images/dashboard.jpg";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface IEmployee {
    id: string;
    name: string;
    birthday: string;
}

interface IProject {
    id: string;
    name: string;
    status: string;
    employees: IEmployee[];
}

interface ILeave {
    employeeId: string;
    date: string;
}

const sampleEmployees: IEmployee[] = [
    {id: 'E001', name: 'John Doe', birthday: '1990-06-20'},
    {id: 'E002', name: 'Jane Smith', birthday: '1985-06-22'},
    {id: 'E003', name: 'Alice Johnson', birthday: '1992-06-25'},
    {id: 'E004', name: 'Bob Brown', birthday: '1988-06-29'}
];

const sampleProjects: IProject[] = [
    {id: 'P001', name: 'Project Alpha', status: 'In Progress', employees: [sampleEmployees[0], sampleEmployees[1]]},
    {id: 'P002', name: 'Project Beta', status: 'Not Started', employees: [sampleEmployees[2]]},
    {id: 'P003', name: 'Project Gamma', status: 'Completed', employees: [sampleEmployees[3]]}
];

const sampleLeaves: ILeave[] = [
    {employeeId: 'E001', date: dayjs().format('YYYY-MM-DD')}
];

const ManageProjectsDashboard = () => {
    const [projects, setProjects] = useState<IProject[]>(sampleProjects);
    const [employees, setEmployees] = useState<IEmployee[]>(sampleEmployees);
    const [leaves, setLeaves] = useState<ILeave[]>(sampleLeaves);

    const today = dayjs().format('YYYY-MM-DD');
    const todayBirthdays = employees.filter(emp => emp.birthday === today).length;
    const todayLeaves = leaves.filter(leave => leave.date === today).length;

    const projectStatusChartData = {
        labels: ['Not Started', 'In Progress', 'Completed'],
        datasets: [
            {
                label: 'Projects',
                data: [
                    projects.filter(p => p.status === 'Not Started').length,
                    projects.filter(p => p.status === 'In Progress').length,
                    projects.filter(p => p.status === 'Completed').length,
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <Box>
            <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="h6">Total Employees</Typography>
                        <Typography variant="h4">{employees.length}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="h6">Total Projects</Typography>
                        <Typography variant="h4">{projects.length}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="h6">Leaves Today</Typography>
                        <Typography variant="h4">{todayLeaves}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="h6">Birthdays Today</Typography>
                        <Typography variant="h4">{todayBirthdays}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} p={3} sx={{mt:10}}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{p: 3}}>
                        <Typography variant="h6">Project Status Overview</Typography>
                        <Bar data={projectStatusChartData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} sx={{
                    background: `url(${dashboardImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mt: 3,
                    ml: 10,
                    boxShadow: 3,
                }}>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ManageProjectsDashboard;
