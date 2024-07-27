import React, { useState } from 'react';
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

interface IProject {
    id: string;
    name: string;
    status: string;
    employees: IEmployee[];
}

const sampleEmployees: IEmployee[] = [
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
    { id: 'E003', name: 'Alice Johnson' },
    { id: 'E004', name: 'Bob Brown' }
];

const ManageProjectsScreen = () => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
    const [open, setOpen] = useState(false);
    const [manageOpen, setManageOpen] = useState(false);
    const { control, handleSubmit, reset } = useForm<IProject>();

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

    const handleAddEmployee = (employee: IEmployee) => {
        if (selectedProject) {
            setSelectedProject({
                ...selectedProject,
                employees: [...selectedProject.employees, employee]
            });
        }
    };

    const handleRemoveEmployee = (employeeId: string) => {
        if (selectedProject) {
            setSelectedProject({
                ...selectedProject,
                employees: selectedProject.employees.filter(
                    (employee) => employee.id !== employeeId
                )
            });
        }
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
                        sx={{backgroundColor:'#16DBCC', color:'white'}}
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
                                    <Typography variant="h5" sx={{color:'#718EBF', mb:2}}>{project.name}</Typography>
                                    <Typography color="textSecondary">
                                        Status: <span style={{ color: getStatusColor(project.status) }}>{project.status}</span>
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Employees: {project.employees.length}
                                    </Typography>
                                </div>
                                <img src={projectImage} alt="Project" style={{ width: 100 }} />
                            </CardContent>
                            <CardActions>
                                <Button size="small" sx={{color:'#16DBCC'}} onClick={() => handleManageOpen(project)}>
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
                            <Button onClick={handleClose} sx={{background:'#FE5C73'}}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" sx={{background:'#16DBCC'}}>
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Manage Project Dialog */}
            {selectedProject && (
                <Dialog open={manageOpen} onClose={handleManageClose} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{color:'#718EBF'}}>Manage Project</DialogTitle>
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
                                    <ListItem key={employee.id} secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveEmployee(employee.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }>
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
                                        onClick={() => handleAddEmployee(employee)}
                                        disabled={selectedProject.employees.some((e) => e.id === employee.id)}
                                        sx={{ mr: 1, mb: 1 }}
                                    >
                                        {employee.name}
                                    </Button>
                                ))}
                            </Box>
                            <DialogActions>
                                <Button onClick={handleManageClose} variant="contained" sx={{background:'#FE5C73'}}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" sx={{background:'#16DBCC'}}>
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

export default ManageProjectsScreen;
