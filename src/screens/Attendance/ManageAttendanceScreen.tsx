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
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import attendanceImage from "../../assets/images/attendance.jpg";

interface IEmployee {
  _id: string;
  name: string;
}

interface IAttendance {
  user_id: string;
  date: string;
  status: string;
}

const ManageAttendanceScreen = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [attendanceData, setAttendanceData] = useState<IAttendance[]>([]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Fetch employees from the API (GET)
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch attendance data from the API (GET)
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/attendance");
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendanceData();
  }, []);

  const handleOpen = (employee: IEmployee) => {
    setSelectedEmployee(employee);
    setDate(dayjs());
    setStatus("");
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

  // Submit new attendance (POST)
  const handleSubmit = async () => {
    if (selectedEmployee) {
      const attendanceRecord: IAttendance = {
        user_id: selectedEmployee._id,
        date: date.toISOString().split("T")[0],
        status,
      };

      try {
        await axios.post("http://localhost:5000/attendance", attendanceRecord);
        setAttendanceData([...attendanceData, attendanceRecord]);
        setOpen(false);
      } catch (error) {
        console.error("Error submitting attendance record:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "#16DBCC";
      case "Absent":
        return "#FE5C73";
      case "Leave":
        return "#FFBB38";
      default:
        return "gray";
    }
  };

  return (
    <>
      <Grid container gap={2} p={2}>
        <Grid
          item
          xs={12}
          md={4}
          elevation={0}
          component={Paper}
          sx={{ mb: 2, borderRadius: 100 }}
        >
          <TextField
            label={"Search Employee"}
            variant="outlined"
            fullWidth
            sx={{ borderRadius: 100 }}
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 8 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                  >
                    Employee ID
                  </TableCell>
                  <TableCell
                    sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell
                      sx={{
                        color: "#232323",
                        fontSize: 16,
                        fontWeight: 400,
                      }}
                    >
                      {employee._id}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#232323",
                        fontSize: 16,
                        fontWeight: 400,
                      }}
                    >
                      {employee.employee.name}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          textTransform: "capitalize",
                          textAlign: "center",
                          fontSize: 14,
                          color: "white",
                          backgroundColor:
                            employee.employee.status == "true"
                              ? "#06d6a0"
                              : "#ef476f",
                          borderRadius: 10,
                        }}
                      >
                        {employee.employee.status == "true"
                          ? "Online"
                          : "Offline"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        sx={{
                          background: "white",
                          color: "#1814F3",
                          fontSize: 16,
                          fontWeight: 400,
                          borderRadius: 100,
                          border: 1,
                          borderColor: "#1814F3",
                          boxShadow: 0,
                        }}
                        onClick={() => handleOpen(employee)}
                      >
                        Mark Attendance
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleHistoryOpen(employee)}
                        sx={{
                          background: "white",
                          color: "#16DBCC",
                          fontSize: 16,
                          fontWeight: 400,
                          borderRadius: 100,
                          border: 1,
                          borderColor: "#16DBCC",
                          boxShadow: 0,
                          ml: 2,
                        }}
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
        <Grid
          item
          xs={12}
          md={3}
          elevation={0}
          component={Paper}
          sx={{
            background: `url(${attendanceImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
      </Grid>

      {/* Mark Attendance Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
          Mark Attendance
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Employee ID"
                  value={selectedEmployee?._id || ""}
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

      {/* Attendance History Dialog */}
      <Dialog
        open={historyOpen}
        onClose={handleHistoryClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
          Attendance History for {selectedEmployee?.employee.name}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {attendanceData
              .filter((record) => record.user_id === selectedEmployee?._id)
              .map((record, index) => (
                <Box
                  key={index}
                  sx={{
                    mt: 2,
                    width: 50,
                    padding: 4,
                    height: 50,
                    backgroundColor: getStatusColor(record.status),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  {record.date.split("T")[0]}
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
