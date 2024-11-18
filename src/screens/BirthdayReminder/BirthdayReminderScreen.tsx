import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios"; // Axios for API calls
import birthdayImage from "../../assets/images/birthday.jpg";
import { toast } from "react-toastify";

const BirthdayReminderScreen = () => {
  const [todayBirthdays, setTodayBirthdays] = useState<any[]>([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<any[]>([]);

  // Fetch employee data from the API
  const fetchEmployees = async () => {
    const toastId = toast.loading("Loading Employee Data..!", { autoClose: 15000 });
    try {
      const response = await axios.get("http://localhost:5000/users");
      const employees: any[] = response.data;

      const today = dayjs();
      const nextWeek = today.add(7, "day");

      // Filter today's birthdays
      const todaysBirthdays = employees.filter((employee) => {
        const birthday = dayjs(employee.employee.birthday);
        return (
          birthday.month() === today.month() && birthday.date() === today.date()
        );
      });

      // Filter upcoming week's birthdays
      const upcomingWeekBirthdays = employees.filter((employee) => {
        const birthday = dayjs(employee.employee.birthday).year(today.year());
        return birthday.isAfter(today) && birthday.isBefore(nextWeek);
      });

      setTodayBirthdays(todaysBirthdays);
      setUpcomingBirthdays(upcomingWeekBirthdays);
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Grid container gap={2} p={2}>
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          sx={{ minHeight: 200, p: 4 }}
        >
          <Typography
            variant="h6"
            color="secondary"
            sx={{ mb: 2, color: "#718EBF", fontSize: 24, fontWeight: 400 }}
          >
            Today's Birthdays
          </Typography>
          {todayBirthdays.length === 0 ? (
            <Typography
              sx={{
                color: "#232323",
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              No birthdays today.
            </Typography>
          ) : (
            todayBirthdays.map((employee) => (
              <Card key={employee._id} sx={{ mb: 2 }}>
                <CardContent sx={{ display: 'flex', justifyContent: "space-between", alignItems:"center" }}>
                  <Box>
                    <Typography variant="h6">
                      {employee.employee.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {dayjs(employee.birthday).format("MMMM DD, YYYY")}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={employee.employee.picture}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          sx={{ minHeight: 200, p: 4 }}
        >
          <Typography
            variant="h6"
            color="secondary"
            sx={{ mb: 2, color: "#718EBF", fontSize: 24, fontWeight: 400 }}
          >
            Upcoming Week's Birthdays
          </Typography>
          {upcomingBirthdays.length === 0 ? (
            <Typography
              sx={{
                color: "#232323",
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              No birthdays in the upcoming week.
            </Typography>
          ) : (
            upcomingBirthdays.map((employee) => (
                <Card key={employee._id} sx={{ mb: 2 }}>
                <CardContent sx={{ display: 'flex', justifyContent: "space-between", alignItems:"center" }}>
                  <Box>
                    <Typography variant="h6">
                      {employee.employee.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {dayjs(employee.birthday).format("MMMM DD, YYYY")}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={employee.employee.picture}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            background: `url(${birthdayImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: 400,
          }}
        ></Grid>
      </Grid>
    </>
  );
};

export default BirthdayReminderScreen;
