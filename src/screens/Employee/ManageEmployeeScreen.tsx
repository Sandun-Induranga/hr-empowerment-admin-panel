import React, {useState} from "react";
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
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {IEmployees} from "../../core/interfaces/IEmployees";

const sampleEmployees: IEmployees[] = [
    {
        employeeId: "1",
        name: "John Doe",
        address: "Manila",
        birthday: "2000-01-01",
        email: "john@example.com",
        mobile: "09123456789",
        position: "Engineer",
        department: "Engineering",
        salary: 50000,
        gender: "Male",
        photo: "https://via.placeholder.com/150"
    },
    {
        employeeId: "2",
        name: "Jane Smith",
        address: "Cebu",
        birthday: "1992-02-02",
        email: "jane@example.com",
        mobile: "09123456780",
        position: "Manager",
        department: "Management",
        salary: 60000,
        gender: "Female",
        photo: "https://via.placeholder.com/150"
    }
];

const ManageEmployeeScreen = () => {
    const [employees, setEmployees] = useState<IEmployees[]>(sampleEmployees);
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
        photo: ''
    });

    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployees | null>(null);

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleDateChange = (date: Dayjs | null) => {
        setFormData({...formData, birthday: date ? date.toISOString().split('T')[0] : ''});
    };

    const handlePhotoChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (upload: any) => {
                setFormData({...formData, photo: upload.target.result});
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/employees', formData);
            console.log('Form submitted successfully:', response.data);
            setEmployees([...employees, formData]);
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
            mobile: '',
            position: '',
            department: '',
            salary: 0,
            gender: '',
            photo: ''
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

    const handleDelete = (employeeId: string) => {
        setEmployees(employees.filter(employee => employee.employeeId !== employeeId));
    };

    const handleUpdate = (e: any) => {
        e.preventDefault();
        setEmployees(employees.map(employee => employee.employeeId === formData.employeeId ? formData : employee));
        setOpen(false);
    };

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={12} component={Paper} sx={{p: 3, mb: 2, borderRadius: 2}}>
                    <Typography variant="h5" textAlign="center" color="primary">
                        Manage Employee
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{mt: 2}}>
                        Add Employee
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} sx={{borderRadius: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>ID</TableCell>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Name</TableCell>
                                    <TableCell
                                        sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Address</TableCell>
                                    <TableCell
                                        sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Birthday</TableCell>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Age</TableCell>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Mobile</TableCell>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Gender</TableCell>
                                    <TableCell
                                        sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Position</TableCell>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Salary</TableCell>
                                    <TableCell
                                        sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Actions</TableCell>
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
                                        <TableCell
                                            sx={{
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
                                            <IconButton sx={{color: "#FFBB38"}}
                                                        onClick={() => handleViewOpen(employee)}>
                                                <VisibilityIcon/>
                                            </IconButton>
                                            <IconButton sx={{color: "#16DBCC"}}
                                                        onClick={() => handleEditOpen(employee)}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton sx={{color: "#FE5C73"}}
                                                        onClick={() => handleDelete(employee.employeeId)}>
                                                <DeleteIcon/>
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
                <DialogTitle sx={{bgcolor: 'primary.main', color: 'white'}}>Add Employee</DialogTitle>
                <DialogContent sx={{py: 3}}>
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
                                    sx={{mb: 2}}
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
                                    sx={{mb: 2}}
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
                                    sx={{mb: 2}}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Birthday"
                                        value={formData.birthday ? dayjs(formData.birthday) : null}
                                        onChange={handleDateChange}
                                        // renderInput={(params) => <TextField {...params} fullWidth margin="dense"
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
                                    sx={{mb: 2}}
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
                                    sx={{mb: 2}}
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
                                    sx={{mb: 2}}
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
                                    sx={{mb: 2}}
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
                                    sx={{mb: 2}}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin="dense" sx={{mb: 2}}>
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
                            <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{mb: 2}}
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
                                         style={{maxWidth: '100px', maxHeight: '100px', display: 'block'}}/>
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
                        sx={{color: '#333B69', textAlign: "center", fontWeight: 500, bgcolor: '#f5f5f5', pb: 2}}>
                        View Employee
                    </DialogTitle>
                    <DialogContent sx={{py: 3, px: 4, bgcolor: '#fafafa'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                {selectedEmployee.photo && (
                                    <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
                                        {/*<Box sx={{ border: '1px solid #ddd', p: 1, borderRadius: 1, display: 'flex', justifyContent: 'center' }}>*/}
                                        <img src={selectedEmployee.photo} alt="Employee"
                                             style={{maxWidth: '100px', maxHeight: '100px'}}/>
                                        {/*</Box>*/}
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Employee ID</Typography>
                                <Typography variant="body1"
                                            sx={{color: '#555'}}>{selectedEmployee.employeeId}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Name</Typography>
                                <Typography variant="body1" sx={{color: '#555'}}>{selectedEmployee.name}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Address</Typography>
                                <Typography variant="body1" sx={{color: '#555'}}>{selectedEmployee.address}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Birthday</Typography>
                                <Typography variant="body1"
                                            sx={{color: '#555'}}>{selectedEmployee.birthday}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Email</Typography>
                                <Typography variant="body1" sx={{color: '#555'}}>{selectedEmployee.email}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Mobile</Typography>
                                <Typography variant="body1" sx={{color: '#555'}}>{selectedEmployee.mobile}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Position</Typography>
                                <Typography variant="body1"
                                            sx={{color: '#555'}}>{selectedEmployee.position}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Department</Typography>
                                <Typography variant="body1"
                                            sx={{color: '#555'}}>{selectedEmployee.department}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Salary</Typography>
                                <Typography variant="body1" sx={{color: '#555'}}>{selectedEmployee.salary}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 500}}>Gender</Typography>
                                <Typography variant="body1" sx={{color: '#555'}}>{selectedEmployee.gender}</Typography>
                            </Grid>
                        </Grid>
                        <DialogActions sx={{pt: 3}}>
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
