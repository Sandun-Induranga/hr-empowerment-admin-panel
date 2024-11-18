import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
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
import { toast } from "react-toastify";

const ManageLeavesScreen = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [acceptStatus, setAcceptStatus] = useState<boolean>(true);
  const [rejectStatus, setRejectStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    const toastId = toast.loading("Loading Employee Data..!", { autoClose: 15000 });
    try {
      const response = await axios.get("http://localhost:5000/users");
      toast.dismiss(toastId);
      setEmployees(response.data);
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch leaves from the backend
  const fetchLeaves = async () => {
    const toastId = toast.loading("Loading Leave Data..!", { autoClose: 15000 });
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/leaves");
      setLoading(false);
      setLeaves(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      console.error("Error fetching leaves:", error);
      toast.error("Error fetching leaves!");
    }
  };

  // Accept leave (PATCH request)
  const handleAcceptLeave = async (leaveId: string) => {
    const toastId = toast.loading("Submitting..!", { autoClose: 15000 });
    try {
      setAcceptStatus(false);
      await axios.patch(`http://localhost:5000/leaves/${leaveId}`, {
        status: "Approved",
      });
      setAcceptStatus(true);
      toast.dismiss(toastId);
      toast.success("Leave accepted successfully!");
      fetchLeaves(); // Refetch leaves after update
    } catch (error) {
      setAcceptStatus(true);
      console.error("Error accepting leave:", error);
      toast.error("Error accepting leave!");
    }
  };

  // Reject leave (PATCH request)
  const handleRejectLeave = async (leaveId: string) => {
    const toastId = toast.loading("Submitting..!", { autoClose: 15000 });
    try {
      setRejectStatus(false);
      await axios.patch(`http://localhost:5000/leaves/${leaveId}`, {
        status: "Rejected",
      });
      setRejectStatus(true);
      toast.dismiss(toastId);
      toast.success("Leave rejected successfully!");
      fetchLeaves(); // Refetch leaves after update
    } catch (error) {
      setRejectStatus(true);
      toast.dismiss(toastId);
      console.error("Error rejecting leave:", error);
      toast.error("Error rejecting leave!");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchLeaves();
  }, []);

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
          {loading && <CircularProgress sx={{ color: "#718EBF", mt:30 }} />}
          {!loading && (
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
                      Employee Name
                    </TableCell>
                    <TableCell
                      sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                    >
                      Reason
                    </TableCell>
                    <TableCell
                      sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                    >
                      Day Count
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
                  {leaves.map((leave) => (
                    <TableRow key={leave._id}>
                      <TableCell
                        sx={{
                          color: "#232323",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {(employees.find((employee) => employee._id === leave.user_id))?.employee.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#232323",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {leave.reason}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#232323",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {leave.date.split("T")[0]}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#232323",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {leave.day_count}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#232323",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {leave.status}
                      </TableCell>
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
                            boxShadow: 0,
                          }}
                          onClick={() => handleAcceptLeave(leave._id)}
                        >
                          {acceptStatus ? "Accept Leave" : "Accepting..."}
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
                            ml: 2,
                          }}
                          onClick={() => handleRejectLeave(leave._id)}
                        >
                          {rejectStatus ? "Reject Leave" : "Rejecting..."}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            background: `url(${leaveImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 500,
          }}
        ></Grid>
      </Grid>
    </>
  );
};

export default ManageLeavesScreen;
