import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Bar } from 'react-chartjs-2';
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
    { id: 'E001', name: 'John Doe', birthday: '1990-06-20' },
    { id: 'E002', name: 'Jane Smith', birthday: '1985-06-22' },
    { id: 'E003', name: 'Alice Johnson', birthday: '1992-06-25' },
    { id: 'E004', name: 'Bob Brown', birthday: '1988-06-29' }
];

const sampleProjects: IProject[] = [
    { id: 'P001', name: 'Project Alpha', status: 'In Progress', employees: [sampleEmployees[0], sampleEmployees[1]] },
    { id: 'P002', name: 'Project Beta', status: 'Not Started', employees: [sampleEmployees[2]] },
    { id: 'P003', name: 'Project Gamma', status: 'Completed', employees: [sampleEmployees[3]] }
];

const sampleLeaves: ILeave[] = [
    { employeeId: 'E001', date: dayjs().format('YYYY-MM-DD') }
];

const ManageProjectsDashboard = () => {
    const [projects, setProjects] = useState<IProject[]>(sampleProjects);
    const [employees, setEmployees] = useState<IEmployee[]>(sampleEmployees);
    const [leaves, setLeaves] = useState<ILeave[]>(sampleLeaves);
    const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
    const [open, setOpen] = useState(false);
    const [manageOpen, setManageOpen] = useState(false);
    const { control, handleSubmit, reset } = useForm<IProject>();

    useEffect(() => {
        // Fetch or compute statistics here if needed
    }, []);

    const handleOpen = () => {
        reset({ id: uuidv4(), name: '', status: '', employees: [] });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleManageOpen = (project: IProject) => {
        setSelectedProject(project);
        setManageOpen(true);
    };

    const handleManageClose = () => {
        setManageOpen(false);
        setSelectedProject(null);
    };

    const onSubmit = (data: IProject) => {
        setProjects([...projects, data]);
        setOpen(false);
    };

    const handleUpdate = (data: IProject) => {
        setProjects(
            projects.map((project) =>
                project.id === data.id ? { ...data } : project
            )
        );
        setManageOpen(false);
    };

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
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Employee Management System
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container spacing={3} p={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6">Total Employees</Typography>
                            <Typography variant="h4">{employees.length}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6">Total Projects</Typography>
                            <Typography variant="h4">{projects.length}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6">Leaves Today</Typography>
                            <Typography variant="h4">{todayLeaves}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6">Birthdays Today</Typography>
                            <Typography variant="h4">{todayBirthdays}</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={3} p={3}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                            onClick={handleOpen}
                        >
                            Create Project
                        </Button>
                    </Grid>
                    {projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{project.name}</Typography>
                                    <Typography color="textSecondary">Status: {project.status}</Typography>
                                    <Typography color="textSecondary">
                                        Employees: {project.employees.length}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleManageOpen(project)}>
                                        Manage
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3} p={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6">Project Status Overview</Typography>
                            <Bar data={projectStatusChartData} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Create Project Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create Project</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Project Name"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                        <Controller
                            name="status"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Status</InputLabel>
                                    <Select {...field}>
                                        <MenuItem value="Not Started">Not Started</MenuItem>
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Manage Project Dialog */}
            {selectedProject && (
                <Dialog open={manageOpen} onClose={handleManageClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Manage Project</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={selectedProject.name}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Project Name"
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                            />
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={selectedProject.status}
                                render={({ field }) => (
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Status</InputLabel>
                                        <Select {...field}>
                                            <MenuItem value="Not Started">Not Started</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Typography variant="h6" gutterBottom>
                                Employees
                            </Typography>
                            <List>
                                {selectedProject.employees.map((employee) => (
                                    <ListItem key={employee.id}>
                                        <ListItemText primary={employee.name} />
                                    </ListItem>
                                ))}
                            </List>
                            <Box my={2}>
                                <Typography variant="h6">Add Employee</Typography>
                                {sampleEmployees.map((employee) => (
                                    <Button
                                        key={employee.id}
                                        variant="outlined"
                                        size="small"
                                        // onClick={() => handleAddEmployee(employee)}
                                        disabled={selectedProject.employees.some((e) => e.id === employee.id)}
                                        sx={{ mr: 1, mb: 1 }}
                                    >
                                        {employee.name}
                                    </Button>
                                ))}
                            </Box>
                            <DialogActions>
                                <Button onClick={handleManageClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default ManageProjectsDashboard;
