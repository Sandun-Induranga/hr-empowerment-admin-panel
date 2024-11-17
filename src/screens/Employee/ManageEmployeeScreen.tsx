import { useEffect, useState } from "react";
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
  Box,
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
import { Close, Email, People } from "@mui/icons-material";
import { toast } from "react-toastify";

const ManageEmployeeScreen = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    employee: {
      name: "",
      address: "",
      birthday: "",
      email: "",
      mobile: "",
      position: "",
      department: "",
      salary: 0,
      gender: "",
      picture: "",
      status: false,
    },
    role: "EMPLOYEE",
  });

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "password") {
      setFormData({
        ...formData,
        password: value,
      });
      return;
    }
    setFormData({
      ...formData,
      employee: {
        ...formData.employee,
        [name]: name === "salary" ? parseFloat(value) : value,
      },
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData({
      ...formData,
      employee: {
        ...formData.employee,
        birthday: date ? date?.add(1, "day").toISOString().split("T")[0] : "",
      },
    });
  };

  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload: any) => {
        setFormData({
          ...formData,
          employee: { ...formData.employee, picture: upload.target.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch all employees from /users API
  const fetchEmployees = async () => {
    try {
      toast.loading("Loading Employee Data..!", { autoClose: 15000 });
      const response = await axios.get("http://localhost:5000/users");
      setEmployees(response.data.map((employee: any) => ({
        ...employee,
        password: "", // Set the password field to an empty string
    })));
    toast.dismiss();
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Something Went Wrong..!");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form submit for adding new employee
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting..!", { autoClose: 15000 });
    try {
      const response = await axios.post("http://localhost:5000/users", {
        ...formData,
        email: formData.employee.email,
      });
      setEmployees([...employees, response.data]); // Assuming backend returns the created user
      setOpen(false);
      toast.dismiss(toastId);
      toast.success("Employee Added Successfully..!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.dismiss();
      toast.error("Something Went Wrong..!");
    }
  };

  const handleClickOpen = () => {
    setFormData({
      email: "",
      password: "",
      employee: {
        name: "",
        address: "",
        birthday: "",
        email: "",
        mobile: "",
        position: "",
        department: "",
        salary: 0,
        gender: "",
        picture: "",
        status: false,
      },
      role: "EMPLOYEE",
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
    setIsEditing(true);
    setFormData(employee);
    setOpen(true);
  };

  // Handle employee deletion
  const handleDelete = async (employeeId: string) => {
    const toastId = toast.loading("Deleting..!", { autoClose: 15000 });
    try {
      await axios.delete(`http://localhost:5000/users/${employeeId}`);
      fetchEmployees();
      toast.dismiss(toastId);
      toast.success("Successfully Deleted..!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.dismiss(toastId);
      toast.error("Something Went Wrong..!");
    }
  };

  // Handle employee update
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Updating..!", { autoClose: 15000 });
    try {
      
      const response = await axios.patch(
        `http://localhost:5000/users/${formData._id}`,
        formData
      );
      fetchEmployees();
      setOpen(false);
      toast.dismiss(toastId);
      toast.success("Successfully Updated..!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.dismiss(toastId);
      toast.success("Something Went Wrong..!");
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
            label="Search Employee"
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
          md={12}
          sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
        >
          <Button
            variant="contained"
            sx={{ background: "#16DBCC" }}
            onClick={() => {
              handleClickOpen();
              setIsEditing(false);
            }}
          >
            Add Employee
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 8 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "ID",
                    "Name",
                    "Address",
                    "Birthday",
                    "Age",
                    "Mobile",
                    "Gender",
                    "Position",
                    "Salary",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ color: "#718EBF", fontSize: 16, fontWeight: 400 }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell>{employee._id}</TableCell>
                    <TableCell>{employee.employee.name}</TableCell>
                    <TableCell>{employee.employee.address}</TableCell>
                    <TableCell>
                      {employee.employee.birthday?.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      {dayjs().year() -
                        dayjs(employee.employee.birthday).year()}
                    </TableCell>
                    <TableCell>{employee.employee.mobile}</TableCell>
                    <TableCell>{employee.employee.gender}</TableCell>
                    <TableCell>{employee.employee.position}</TableCell>
                    <TableCell>{employee.employee.salary}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewOpen(employee)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditOpen(employee)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(employee._id)}
                      >
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{isEditing? "Edit Employee": "Add Employee"}</DialogTitle>
        <DialogContent>
          <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* <TextField
                  label="Employee Id"
                  name="employeeId"
                  fullWidth
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  disabled={!!selectedEmployee}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formData.employee.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  value={formData.employee.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birthday"
                    value={
                      formData.employee.birthday
                        ? dayjs(formData.employee.birthday)
                        : null
                    }
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.employee.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  name="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Mobile"
                  name="mobile"
                  fullWidth
                  value={formData.employee.mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Position"
                  name="position"
                  fullWidth
                  value={formData.employee.position}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Department"
                  name="department"
                  fullWidth
                  value={formData.employee.department}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Salary"
                  name="salary"
                  fullWidth
                  value={formData.employee.salary}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.employee.gender}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="contained" component="label">
                  Upload Photo
                  <input type="file" hidden onChange={handlePhotoChange} />
                </Button>
                {formData.photo && (
                  <img
                    src={formData.employee.picture}
                    alt="Employee"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update" : "Submit"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {selectedEmployee && (
        <Dialog
          open={viewOpen}
          onClose={handleViewClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              bgcolor: "#16DBCC",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <People />
            View Employee
            <IconButton onClick={handleViewClose} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ py: 3, px: 4, bgcolor: "#fafafa" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {selectedEmployee.employee.picture && (
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={
                        // "data:image/png;base64," +
                        selectedEmployee.employee.picture
                      }
                      alt="Employee"
                      style={{ width: "200px" }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Employee ID
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee._id}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Name
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.name}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.address}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Birthday
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.birthday}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.email}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Mobile
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.mobile}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Position
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.position}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Department
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.department}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Salary
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.salary}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Gender
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {selectedEmployee.employee.gender}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ManageEmployeeScreen;
