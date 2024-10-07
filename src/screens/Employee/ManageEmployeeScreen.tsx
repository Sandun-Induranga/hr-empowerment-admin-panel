import React, {useEffect, useState} from "react";
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
    InputLabel,
    Typography,
    IconButton,
    Box
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IEmployees } from "../../core/interfaces/IEmployees";

const ManageEmployeeScreen = () => {
    const [employees, setEmployees] = useState<IEmployees[]>([]);
    const [formData, setFormData] = useState<IEmployees>({
        employeeId: '',
        name: '',
        address: '',
        birthday: '',
        email: '',
        password: '',
        mobile: '',
        position: '',
        department: '',
        salary: 0,
        gender: '',
        photo: '',
        role: 'EMPLOYEE',
    });

    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployees | null>(null);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name == 'salary'? parseFloat(value): value });
    };

    const handleDateChange = (date: Dayjs | null) => {
        setFormData({ ...formData, birthday: date ? date.toISOString().split('T')[0] : '' });
    };

    const handlePhotoChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (upload: any) => {
                setFormData({ ...formData, photo: upload.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);


    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/employees', formData);
    //         console.log('Form submitted successfully:', response.data);
    //         setEmployees([...employees, formData]);
    //         setOpen(false);
    //     } catch (error) {
    //         console.error('Error submitting the form:', error);
    //     }
    // };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/employees', formData);
            setEmployees([...employees, response.data]); // Assuming backend returns the created employee
            setOpen(false);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    const handleClickOpen = () => {
        setFormData({
            employeeId: '',
            name: '',
            address: '',
            birthday: '',
            email: '',
            password: '',
            mobile: '',
            position: '',
            department: '',
            salary: 0,
            gender: '',
            photo: '',
            role: 'EMPLOYEE'
        });
        setOpen(true);
    };

    const handleViewOpen = (employee: IEmployees) => {
        setSelectedEmployee(employee);
        setViewOpen(true);
    };

    const handleViewClose = () => {
        setViewOpen(false);
        setSelectedEmployee(null);
    };

    const handleEditOpen = (employee: IEmployees) => {
        setFormData(employee);
        setOpen(true);
    };

    // const handleDelete = (employeeId: string) => {
    //     setEmployees(employees.filter(employee => employee.employeeId !== employeeId));
    // };

    const handleDelete = async (employeeId: string) => {
        try {
            await axios.delete(`http://localhost:5000/employees/${employeeId}`);
            setEmployees(employees.filter(employee => employee.employeeId !== employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };


    // const handleUpdate = (e: any) => {
    //     e.preventDefault();
    //     setEmployees(employees.map(employee => employee.employeeId === formData.employeeId ? formData : employee));
    //     setOpen(false);
    // };

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/employees/${formData.employeeId}`, formData);
            setEmployees(employees.map(employee => employee.employeeId === formData.employeeId ? response.data : employee));
            setOpen(false);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={4} elevation={0} component={Paper} sx={{ mb: 2, borderRadius: 100 }}>
                    {/* Search bar */}
                    <TextField
                        label={'Search Employee'}
                        variant="outlined"
                        fullWidth
                        sx={{ borderRadius: 100 }}
                        InputProps={{
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button variant="contained" sx={{background:'#16DBCC'}} onClick={handleClickOpen}>
                        Add Employee
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 8 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>ID</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Name</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Address</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Birthday</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Age</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Mobile</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Gender</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Position</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Salary</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.employeeId}>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.employeeId}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.name}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.address}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.birthday}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16
                                        }}>{dayjs().year() - dayjs(employee.birthday).year()}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.mobile}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.gender}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.position}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.salary}</TableCell>
                                        <TableCell>
                                            <IconButton sx={{ color: "#FFBB38" }}
                                                        onClick={() => handleViewOpen(employee)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton sx={{ color: "#16DBCC" }}
                                                        onClick={() => handleEditOpen(employee)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton sx={{ color: "#FE5C73" }}
                                                        onClick={() => handleDelete(employee.employeeId)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    {selectedEmployee ? "Edit Employee" : "Add Employee"}
                </DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                    <form onSubmit={selectedEmployee ? handleUpdate : handleSubmit}>
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
                                    disabled={!!selectedEmployee}
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
                                        // renderInput={(params) =>
                                        //     <TextField {...params} fullWidth margin="dense"
                                        //                                     sx={{ mb: 2 }} />}
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
                                    label="Password"
                                    name="password"
                                    margin="dense"
                                    fullWidth
                                    value={formData.password}
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
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ mb: 2 }}
                                >
                                    Upload Photo
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handlePhotoChange}
                                    />
                                </Button>
                                {formData.photo && (
                                    <img src={formData.photo} alt="Employee"
                                         style={{ maxWidth: '100px', maxHeight: '100px', display: 'block' }} />
                                )}
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {selectedEmployee ? "Update" : "Submit"}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {selectedEmployee && (
                <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="md" fullWidth>
                    <DialogTitle
                        sx={{ color: '#333B69', textAlign: "center", fontWeight: 500, bgcolor: '#f5f5f5', pb: 2 }}>
                        View Employee
                    </DialogTitle>
                    <DialogContent sx={{ py: 3, px: 4, bgcolor: '#fafafa' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                {selectedEmployee.photo && (
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                        {/*<Box sx={{ border: '1px solid #ddd', p: 1, borderRadius: 1, display: 'flex', justifyContent: 'center' }}>*/}
                                        <img src={selectedEmployee.photo} alt="Employee"
                                             style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                        {/*</Box>*/}
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Employee ID</Typography>
                                <Typography variant="body1"
                                            sx={{ color: '#555' }}>{selectedEmployee.employeeId}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Name</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>{selectedEmployee.name}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Address</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>{selectedEmployee.address}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Birthday</Typography>
                                <Typography variant="body1"
                                            sx={{ color: '#555' }}>{selectedEmployee.birthday}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Email</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>{selectedEmployee.email}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Mobile</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>{selectedEmployee.mobile}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Position</Typography>
                                <Typography variant="body1"
                                            sx={{ color: '#555' }}>{selectedEmployee.position}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Department</Typography>
                                <Typography variant="body1"
                                            sx={{ color: '#555' }}>{selectedEmployee.department}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Salary</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>{selectedEmployee.salary}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Gender</Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>{selectedEmployee.gender}</Typography>
                            </Grid>
                        </Grid>
                        <DialogActions sx={{ pt: 3 }}>
                            <Button onClick={handleViewClose} color="secondary" variant="outlined">
                                Close
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>

            )}
        </>
    );
};

export default ManageEmployeeScreen;
