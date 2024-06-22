import React, { useState, useEffect } from "react";
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography
} from "@mui/material";
import axios from "axios";

interface IEmployee {
    id: string;
    name: string;
}

interface IAttendance {
    employeeId: string;
    date: string;
    status: string;
}

const ManageAttendanceScreen = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [attendanceData, setAttendanceData] = useState<IAttendance[]>([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleStatusChange = (employeeId: string, status: string) => {
        setAttendanceData(prevData => {
            const existingRecordIndex = prevData.findIndex(record => record.employeeId === employeeId);
            if (existingRecordIndex >= 0) {
                const updatedData = [...prevData];
                updatedData[existingRecordIndex].status = status;
                return updatedData;
            } else {
                return [...prevData, { employeeId, date, status }];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/attendance', attendanceData);
            console.log('Attendance submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={12} component={Paper} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
                    <Typography variant="h5" textAlign="center" color="primary">
                        Manage Attendance
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'white' }}>Employee ID</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>
                                            <FormControl fullWidth margin="dense">
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    value={
                                                        attendanceData.find(record => record.employeeId === employee.id)?.status || ''
                                                    }
                                                    onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                                                >
                                                    <MenuItem value="Present">Present</MenuItem>
                                                    <MenuItem value="Absent">Absent</MenuItem>
                                                    <MenuItem value="Leave">Leave</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Attendance
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default ManageAttendanceScreen;

