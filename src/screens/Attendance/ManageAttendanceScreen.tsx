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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    TextField,
    Box
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';

interface IEmployee {
    id: string;
    name: string;
}

interface IAttendance {
    employeeId: string;
    date: string;
    status: string;
}

const sampleEmployees: IEmployee[] = [
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
    { id: 'E003', name: 'Alice Johnson' },
    { id: 'E004', name: 'Bob Brown' },
];

const sampleAttendanceData: IAttendance[] = [
    { employeeId: 'E001', date: '2024-06-01', status: 'Present' },
    { employeeId: 'E002', date: '2024-06-01', status: 'Absent' },
    { employeeId: 'E003', date: '2024-06-01', status: 'Leave' },
    { employeeId: 'E004', date: '2024-06-01', status: 'Present' },
    { employeeId: 'E001', date: '2024-06-02', status: 'Present' },
    { employeeId: 'E002', date: '2024-06-02', status: 'Present' },
    { employeeId: 'E003', date: '2024-06-02', status: 'Absent' },
    { employeeId: 'E004', date: '2024-06-02', status: 'Leave' },
];

const ManageAttendanceScreen = () => {
    const [employees, setEmployees] = useState<IEmployee[]>(sampleEmployees);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
    const [attendanceData, setAttendanceData] = useState<IAttendance[]>(sampleAttendanceData);
    const [date, setDate] = useState<Dayjs>(dayjs());
    const [status, setStatus] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);

    const handleOpen = (employee: IEmployee) => {
        setSelectedEmployee(employee);
        setDate(dayjs());
        setStatus('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const handleHistoryOpen = (employee: IEmployee) => {
        setSelectedEmployee(employee);
        setHistoryOpen(true);
    };

    const handleHistoryClose = () => {
        setHistoryOpen(false);
        setSelectedEmployee(null);
    };

    const handleSubmit = () => {
        if (selectedEmployee) {
            const attendanceRecord: IAttendance = {
                employeeId: selectedEmployee.id,
                date: date.toISOString().split('T')[0],
                status
            };

            setAttendanceData([...attendanceData, attendanceRecord]);
            setOpen(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Present':
                return 'green';
            case 'Absent':
                return 'red';
            case 'Leave':
                return 'yellow';
            default:
                return 'gray';
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
                                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleOpen(employee)}
                                            >
                                                Mark Attendance
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleHistoryOpen(employee)}
                                                sx={{ ml: 2 }}
                                            >
                                                View History
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    Mark Attendance
                </DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Employee ID"
                                    value={selectedEmployee?.id || ''}
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date"
                                        value={date}
                                        onChange={(newDate) => setDate(newDate || dayjs())}
                                        // renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth margin="dense" sx={{ mb: 2 }} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Absent">Absent</MenuItem>
                                        <MenuItem value="Leave">Leave</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={historyOpen} onClose={handleHistoryClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    Attendance History for {selectedEmployee?.name}
                </DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {attendanceData
                            .filter(record => record.employeeId === selectedEmployee?.id)
                            .map((record, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        // width: 50,
                                        height: 50,
                                        backgroundColor: getStatusColor(record.status),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        borderRadius: 1
                                    }}
                                >
                                    {record.date}
                                </Box>
                            ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHistoryClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageAttendanceScreen;