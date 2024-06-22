import React, { useState } from "react";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    FormControl,
    InputLabel, TextFieldProps
} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { IEmployees } from "../../core/interfaces/IEmployees";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ManageEmployeeScreen = () => {
    const [formData, setFormData] = useState<IEmployees>({
        employeeId: '',
        name: '',
        address: '',
        birthday: '',
        email: '',
        mobile: '',
        position: '',
        department: '',
        salary: 0,
        gender: '',
    });

    const [open, setOpen] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Dayjs | null) => {
        setFormData({ ...formData, birthday: date ? date.toISOString().split('T')[0] : '' });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/employees', formData);
            console.log('Form submitted successfully:', response.data);
            setOpen(false);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={12} component={Paper} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
                    <Typography variant="h5" textAlign="center" color="primary">
                        Manage Employee
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mt: 2 }}>
                        Add Employee
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Address</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Birthday</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Age</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Mobile</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Gender</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Position</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Salary</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Sample data to render in the table */}
                                {[1, 2, 3, 4].map((id) => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>Manila</TableCell>
                                        <TableCell>01/01/2000</TableCell>
                                        <TableCell>21</TableCell>
                                        <TableCell>09123456789</TableCell>
                                        <TableCell>Male</TableCell>
                                        <TableCell>Engineer</TableCell>
                                        <TableCell>50000</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>Add Employee</DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Employee Id"
                                    name="employeeId"
                                    margin="dense"
                                    fullWidth
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    margin="dense"
                                    fullWidth
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Address"
                                    name="address"
                                    margin="dense"
                                    fullWidth
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Birthday"
                                        value={formData.birthday ? dayjs(formData.birthday) : null}
                                        onChange={handleDateChange}
                                        // renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth margin="dense" sx={{ mb: 2 }} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    margin="dense"
                                    fullWidth
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Mobile"
                                    name="mobile"
                                    margin="dense"
                                    fullWidth
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Position"
                                    name="position"
                                    margin="dense"
                                    fullWidth
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Department"
                                    name="department"
                                    margin="dense"
                                    fullWidth
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Salary"
                                    name="salary"
                                    margin="dense"
                                    fullWidth
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ManageEmployeeScreen;
