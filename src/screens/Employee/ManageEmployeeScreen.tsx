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
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {IEmployees} from "../../core/interfaces/IEmployees";

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

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/employees', formData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={12} component={Paper} sx={{p: 3, mb: 2, borderRadius: 2}}>
                    <Typography variant="h5" textAlign="center" color="primary">
                        Manage Employee
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} mt={2}>
                            {['Employee Id', 'Name', 'Address', 'Birthday', 'Email', 'Mobile', 'Position', 'Department', 'Salary', 'Gender'].map((label, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <TextField
                                        label={label}
                                        name={index === 0 ? 'employeeId' :
                                            index === 1 ? 'name' :
                                                index === 2 ? 'address' :
                                                    index === 3 ? 'birthday' :
                                                        index === 4 ? 'email' :
                                                            index === 5 ? 'mobile' :
                                                                index === 6 ? 'position' :
                                                                    index === 7 ? 'department' :
                                                                        index === 8 ? 'salary' :
                                                                            'gender'}
                                        margin="dense"
                                        fullWidth
                                        value={index === 0 ? formData.employeeId :
                                            index === 1 ? formData.name :
                                                index === 2 ? formData.address :
                                                    index === 3 ? formData.birthday :
                                                        index === 4 ? formData.email :
                                                            index === 5 ? formData.mobile :
                                                                index === 6 ? formData.position :
                                                                    index === 7 ? formData.department :
                                                                        index === 8 ? formData.salary :
                                                                            formData.gender}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} sx={{borderRadius: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: 'primary.main'}}>
                                    <TableCell sx={{color: 'white'}}>ID</TableCell>
                                    <TableCell sx={{color: 'white'}}>Name</TableCell>
                                    <TableCell sx={{color: 'white'}}>Address</TableCell>
                                    <TableCell sx={{color: 'white'}}>Birthday</TableCell>
                                    <TableCell sx={{color: 'white'}}>Age</TableCell>
                                    <TableCell sx={{color: 'white'}}>Mobile</TableCell>
                                    <TableCell sx={{color: 'white'}}>Gender</TableCell>
                                    <TableCell sx={{color: 'white'}}>Position</TableCell>
                                    <TableCell sx={{color: 'white'}}>Salary</TableCell>
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
        </>
    );
}

export default ManageEmployeeScreen;
