import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import dashboardImage from "../../assets/images/dashboard.jpg";
import axios from "axios";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IEmployee {
  id: string;
  name: string;
  birthday: string;
}

interface IProject {
  id: string;
  name: string;
  status: string;
  employees: IEmployee[];
}

interface ILeave {
  employeeId: string;
  date: string;
}

const ManageProjectsDashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);

  const today = dayjs();

  const todayBirthdays = employees.filter(
    (emp) => dayjs(emp.employee.birthday).month() === today.month() && dayjs(emp.employee.birthday).date() === today.date()
  ).length;
  const todayLeaves = leaves.filter((leave) => leave.date === today).length;

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
    fetchLeaves();
  }, []);

  // Fetch all employees from /users API
  const fetchEmployees = async () => {
    const toastId = toast.loading("Loading Data..!", { autoClose: 15000 });
    try {
      const response = await axios.get("http://localhost:5000/users");
      setEmployees(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.dismiss(toastId);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/leaves");
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const projectStatusChartData = {
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        label: "Projects",
        data: [
          projects.filter((p) => p.status === "Not Started").length,
          projects.filter((p) => p.status === "In Progress").length,
          projects.filter((p) => p.status === "Completed").length,
        ],
        backgroundColor: ["#FF6384"],
      },
    ],
  };

  return (
    <Box>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h4">{employees.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Total Projects</Typography>
            <Typography variant="h4">{projects.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Leaves Today</Typography>
            <Typography variant="h4">{todayLeaves}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Birthdays Today</Typography>
            <Typography variant="h4">{todayBirthdays}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} p={3} sx={{ mt: 10 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Project Status Overview</Typography>
            <Bar data={projectStatusChartData} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            background: `url(${dashboardImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mt: 3,
            ml: 10,
            boxShadow: 3,
          }}
        ></Grid>
      </Grid>
    </Box>
  );
};

export default ManageProjectsDashboard;
