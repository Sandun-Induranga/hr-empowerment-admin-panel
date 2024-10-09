import React, { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import dayjs from 'dayjs';
import axios from 'axios'; // Axios for API calls
import birthdayImage from "../../assets/images/birthday.jpg";

interface IEmployee {
    _id: string;
    name: string;
    birthday: string;
}

const BirthdayReminderScreen = () => {
    const [todayBirthdays, setTodayBirthdays] = useState<IEmployee[]>([]);
    const [upcomingBirthdays, setUpcomingBirthdays] = useState<IEmployee[]>([]);

    // Fetch employee data from the API
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees'); // Adjust the URL as per your API
            const employees: IEmployee[] = response.data;

            const today = dayjs();
            const nextWeek = today.add(7, 'day');

            // Filter today's birthdays
            const todaysBirthdays = employees.filter(employee => {
                const birthday = dayjs(employee.birthday);
                return birthday.month() === today.month() && birthday.date() === today.date();
            });

            // Filter upcoming week's birthdays
            const upcomingWeekBirthdays = employees.filter(employee => {
                const birthday = dayjs(employee.birthday).year(today.year());
                return birthday.isAfter(today) && birthday.isBefore(nextWeek);
            });

            setTodayBirthdays(todaysBirthdays);
            setUpcomingBirthdays(upcomingWeekBirthdays);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={6} component={Paper} sx={{ minHeight: 200, p: 4 }}>
                    <Typography variant="h6" color="secondary"
                                sx={{ mb: 2, color: '#718EBF', fontSize: 24, fontWeight: 400 }}>
                        Today's Birthdays
                    </Typography>
                    {todayBirthdays.length === 0 ? (
                        <Typography sx={{
                            color: "#232323",
                            fontSize: 16,
                            fontWeight: 400
                        }}>
                            No birthdays today.
                        </Typography>
                    ) : (
                        todayBirthdays.map((employee) => (
                            <Card key={employee._id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{employee.name}</Typography>
                                    <Typography color="textSecondary">
                                        {dayjs(employee.birthday).format('MMMM DD, YYYY')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Grid>
                <Grid item xs={12} md={6} component={Paper} sx={{ minHeight: 200, p: 4 }}>
                    <Typography variant="h6" color="secondary"
                                sx={{ mb: 2, color: '#718EBF', fontSize: 24, fontWeight: 400 }}>
                        Upcoming Week's Birthdays
                    </Typography>
                    {upcomingBirthdays.length === 0 ? (
                        <Typography sx={{
                            color: "#232323",
                            fontSize: 16,
                            fontWeight: 400
                        }}>
                            No birthdays in the upcoming week.
                        </Typography>
                    ) : (
                        upcomingBirthdays.map((employee) => (
                            <Card key={employee._id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{employee.name}</Typography>
                                    <Typography color="textSecondary">
                                        {dayjs(employee.birthday).format('MMMM DD, YYYY')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Grid>
                <Grid item xs={12} md={5}
                      sx={{
                          background: `url(${birthdayImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          height: 400,
                      }}>
                </Grid>
            </Grid>
        </>
    );
};

export default BirthdayReminderScreen;
