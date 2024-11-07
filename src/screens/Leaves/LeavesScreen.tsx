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
    TextField,
} from "@mui/material";
import axios from "axios";
import leaveImage from "../../assets/images/leave.jpg";

interface IEmployee {
    id: string;
    name: string;
}

interface ILeave {
    id: string;
    employeeId: string;
    startDate: string;
    endDate: string;
    status: string;
}

const ManageLeavesScreen = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [leaves, setLeaves] = useState<any[]>([]);

    // Fetch employees from the backend
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Fetch leaves from the backend
    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leaves');
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    // Accept leave (PATCH request)
    const handleAcceptLeave = async (leaveId: string) => {
        try {
            await axios.patch(`http://localhost:5000/leaves/${leaveId}`, { status: 'Approved' });
            fetchLeaves(); // Refetch leaves after update
        } catch (error) {
            console.error('Error accepting leave:', error);
        }
    };

    // Reject leave (PATCH request)
    const handleRejectLeave = async (leaveId: string) => {
        try {
            await axios.patch(`http://localhost:5000/leaves/${leaveId}`, { status: 'Rejected' });
            fetchLeaves(); // Refetch leaves after update
        } catch (error) {
            console.error('Error rejecting leave:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchLeaves();
    }, []);

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={4} elevation={0} component={Paper} sx={{ mb: 2, borderRadius: 100 }}>
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
                <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 8 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Employee Name</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Reason</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Date</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Day Count</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Status</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaves.map((leave) => (
                                    <TableRow key={leave._id}>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{(employees.find(_id => leave.user_id))?.name }</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{leave.reason}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{leave.date.split('T')[0] }</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{leave.day_count }</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{leave.status }</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    background: "white",
                                                    color: "#16DBCC",
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    borderRadius: 100,
                                                    border: 1,
                                                    borderColor: "#16DBCC",
                                                    boxShadow: 0
                                                }}
                                                onClick={() => handleAcceptLeave(leave._id)}
                                            >
                                                Accept Leave
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                sx={{
                                                    background: "white",
                                                    color: "#FE5C73",
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    borderRadius: 100,
                                                    border: 1,
                                                    borderColor: "#FE5C73",
                                                    boxShadow: 0,
                                                    ml: 2
                                                }}
                                                onClick={() => handleRejectLeave(leave._id)}
                                            >
                                                Reject Leave
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={3}
                      sx={{
                          background: `url(${leaveImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: 500,
                      }}>
                </Grid>
            </Grid>
        </>
    );
};

export default ManageLeavesScreen;

