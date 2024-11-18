import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button, Grid, Card, CardContent, CardActions, Typography, Dialog, DialogActions,
    DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import projectImage from '../../assets/images/project.jpg';
import { toast } from 'react-toastify';

interface IEmployee {
    id: string;
    name: string;
}

const ManageProjectsScreen = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [open, setOpen] = useState(false);
    const [manageOpen, setManageOpen] = useState(false);
    const { control, handleSubmit, reset } = useForm<any>();
    const [employees, setEmployees] = useState<any[]>([]);
    const [assignedEmployees, setAssignedEmployees] = useState<IEmployee[]>([]);

    // Fetch all projects
    const fetchProjects = async () => {
        const toastId = toast.loading("Loading Projects Data..!", { autoClose: 15000 });
        try {
            const response = await axios.get('http://localhost:5000/projects');
            setProjects(response.data);
            toast.dismiss(toastId);
        } catch (error) {
            toast.dismiss(toastId);
            console.error('Error fetching projects:', error);
        }
    };

    // Fetch all employees from backend
    const fetchEmployees = async () => {
        const toastId = toast.loading("Loading Employee Data..!", { autoClose: 15000 });
        try {
            const response = await fetch('http://localhost:5000/users');
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            } else {
                console.error("Failed to fetch employees");
            }
            toast.dismiss(toastId);
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.dismiss(toastId);
        }
    };

    // Fetch employees assigned to a project
    const fetchAssignedEmployees = async (userIds: string[]) => {
        const assigned = employees.filter(employee => userIds.includes(employee.id));
        setAssignedEmployees(assigned);
    };

    // Create a new project
    const createProject = async (data: any) => {
        const toastId = toast.loading("Submitting..!", { autoClose: 15000 });
        try {
            const response = await axios.post('http://localhost:5000/projects', data);
            toast.dismiss(toastId);
            setProjects([...projects, response.data]);
            toast.success("Successfully Created..!");
        } catch (error) {
            toast.dismiss(toastId);
            console.error('Error creating project:', error);
            toast.error("Something Went Wrong..!");
        }
    };

    // Update an existing project
    const handleUpdate = async (updatedProject: any) => {
        const toastId = toast.loading("Submitting..!", { autoClose: 15000 });
        try {
            const response = await axios.patch(`http://localhost:5000/projects/${updatedProject._id}`, updatedProject);
            fetchProjects();
            toast.dismiss(toastId);
            setManageOpen(false);
            toast.success("Successfully Updated..!");
        } catch (error) {
            toast.dismiss(toastId);
            console.error('Error updating project:', error);
            toast.error("Something Went Wrong..!");
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchEmployees();
    }, []);

    const handleOpen = () => {
        reset({ id: uuidv4(), name: '', status: '', users: [] });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleManageOpen = (project: any) => {
        setSelectedProject(project);
        fetchAssignedEmployees(project.users);  // Load assigned employees by user IDs
        setManageOpen(true);
    };

    const handleManageClose = () => {
        setManageOpen(false);
        setSelectedProject(null);
        setAssignedEmployees([]);
    };

    const onSubmit = (data: any) => {
        const newProject = { ...data, created_at: new Date() };
        createProject(newProject);
        setOpen(false);
    };

    const getStatusColor = (status: any) => {
        switch (status) {
            case 'Completed':
                return 'green';
            case 'In Progress':
                return 'orange';
            case 'Not Started':
                return 'red';
            default:
                return 'black';
        }
    };

    return (
        <>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#16DBCC', color: 'white' }}
                        startIcon={<AddCircleIcon />}
                        onClick={handleOpen}
                    >
                        Create Project
                    </Button>
                </Grid>
                {projects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography variant="h5" sx={{ color: '#718EBF', mb: 2 }}>{project.name}</Typography>
                                    <Typography color="textSecondary">
                                        Status: <span style={{ color: getStatusColor(project.status) }}>{project.status}</span>
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Employees: {project.users.length}
                                    </Typography>
                                </div>
                                <img src={projectImage} alt="Project" style={{ width: 100 }} />
                            </CardContent>
                            <CardActions>
                                <Button size="small" sx={{ color: '#16DBCC' }} onClick={() => handleManageOpen(project)}>
                                    Manage
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

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
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Project Description"
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
                        <Controller
                            name="users"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Assign Employees</InputLabel>
                                    <Select
                                        {...field}
                                        multiple
                                        value={field.value || []}
                                        renderValue={(selected) =>
                                            (selected as string[]).map((id) => {
                                                const employee = employees.find(emp => emp.id === id);
                                                return employee ? employee.name : '';
                                            }).join(', ')
                                        }
                                    >
                                        {employees.map((employee) => (
                                            <MenuItem key={employee.id} value={employee.id}>
                                                {employee.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <DialogActions>
                            <Button onClick={handleClose} sx={{ background: '#FE5C73' }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" sx={{ background: '#16DBCC' }}>
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Manage Project Dialog */}
<Dialog open={manageOpen} onClose={handleManageClose} maxWidth="sm" fullWidth>
    <DialogTitle>Manage Project</DialogTitle>
    <DialogContent>
        {selectedProject && (
            <>
                <Typography variant="h6">{selectedProject.name}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {selectedProject.description}
                </Typography>

                {/* Project Status */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={selectedProject.status || ''}
                        onChange={(e) => {
                            setSelectedProject({ ...selectedProject, status: e.target.value });
                        }}
                    >
                        <MenuItem value="Not Started">Not Started</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>

                {/* Assign Employees */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Assign Employees</InputLabel>
                    <Select
                        multiple
                        value={selectedProject.users || []}
                        onChange={(e) => {
                            const newEmployees = e.target.value as string[];
                            setSelectedProject({ ...selectedProject, users: newEmployees });
                        }}
                        renderValue={(selected) => (selected as string[]).map((id) => {
                            const employee = employees.find(emp => emp._id === id);
                            return employee ? employee.employee.name : '';
                        }).join(', ')}
                    >
                        {employees.map((employee) => (
                            <MenuItem key={employee._id} value={employee._id}>
                                {employee.employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleManageClose} sx={{ background: '#FE5C73' }}>
            Cancel
        </Button>
        <Button onClick={() => handleUpdate(selectedProject)} variant="contained" sx={{ background: '#16DBCC' }}>
            Save Changes
        </Button>
    </DialogActions>
</Dialog>

        </>
    );
};

export default ManageProjectsScreen;

