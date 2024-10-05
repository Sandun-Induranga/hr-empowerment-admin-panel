import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import projectImage from '../../assets/images/project.jpg';

interface IEmployee {
    id: string;
    name: string;
}

// interface any {
//     id: string;
//     name: string;
//     description: string;
//     status: string;
//     employees: string[];
//     created_at: Date;
// }

const sampleEmployees: IEmployee[] = [
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
    { id: 'E003', name: 'Alice Johnson' },
    { id: 'E004', name: 'Bob Brown' }
];

const ManageProjectsScreen = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [open, setOpen] = useState(false);
    const [manageOpen, setManageOpen] = useState(false);
    const { control, handleSubmit, reset } = useForm<any>();

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            const response: any = await axios.get('http://localhost:5000/projects');
            console.log('Projects:', response.data);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // Create a new project
    const createProject = async (data: any) => {
        try {
            const response: any = await axios.post('http://localhost:5000/projects', data);
            setProjects([...projects, response]);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpen = () => {
        reset({ id: uuidv4(), name: '', status: '', employees: [] });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleManageOpen = (project: any) => {
        setSelectedProject(project);
        setManageOpen(true);
    };

    const handleManageClose = () => {
        setManageOpen(false);
        setSelectedProject(null);
    };

    const onSubmit = (data: any) => {
        const newProject = { ...data, created_at: new Date(), users: [] };
        createProject(newProject);
        setOpen(false);
    };

    const handleUpdate = (data: any) => {
        // Implement update logic with API
    };

    const handleAddEmployee = (employee: IEmployee) => {
        // if (selectedProject) {
        //     setSelectedProject({
        //         ...selectedProject,
        //         employees: [...selectedProject.employees, employee]
        //     });
        // }
    };

    const handleRemoveEmployee = (employeeId: string) => {
        // if (selectedProject) {
        //     setSelectedProject({
        //         ...selectedProject,
        //         employees: selectedProject.employees.filter(
        //             (employee) => employee !== employeeId
        //         )
        //     });
        // }
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
                {(projects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography variant="h5" sx={{ color: '#718EBF', mb: 2 }}>{project.name}</Typography>
                                    <Typography color="textSecondary">
                                        Status: <span style={{ color: getStatusColor(project.status) }}>{project.status}</span>
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Employees: 0
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
                )))}
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
        </>
    );
};

export default ManageProjectsScreen;
