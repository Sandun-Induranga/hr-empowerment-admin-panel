import React, { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';

interface IEmployee {
    id: string;
    name: string;
    birthday: string;
}

const sampleEmployees: IEmployee[] = [
    { id: 'E001', name: 'John Doe', birthday: '1990-06-20' },
    { id: 'E002', name: 'Jane Smith', birthday: '1985-06-22' },
    { id: 'E003', name: 'Alice Johnson', birthday: '1992-06-25' },
    { id: 'E004', name: 'Bob Brown', birthday: '1988-06-29' },
    { id: 'E005', name: 'Charlie Black', birthday: '1990-06-30' },
    { id: 'E006', name: 'Diana White', birthday: '1982-07-01' }
];

const BirthdayReminderScreen = () => {
    const [todayBirthdays, setTodayBirthdays] = useState<IEmployee[]>([]);
    const [upcomingBirthdays, setUpcomingBirthdays] = useState<IEmployee[]>([]);

    useEffect(() => {
        const today = dayjs();
        const nextWeek = today.add(7, 'day');

        const todaysBirthdays = sampleEmployees.filter(employee => {
            const birthday = dayjs(employee.birthday);
            return birthday.month() === today.month() && birthday.date() === today.date();
        });

        const upcomingWeekBirthdays = sampleEmployees.filter(employee => {
            const birthday = dayjs(employee.birthday).year(today.year());
            return birthday.isAfter(today) && birthday.isBefore(nextWeek);
        });

        setTodayBirthdays(todaysBirthdays);
        setUpcomingBirthdays(upcomingWeekBirthdays);
    }, []);

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} component={Paper} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
                    <Typography variant="h5" textAlign="center" color="primary">
                        Birthday Reminders
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="secondary" sx={{ mb: 2 }}>
                        Today's Birthdays
                    </Typography>
                    {todayBirthdays.length === 0 ? (
                        <Typography>No birthdays today.</Typography>
                    ) : (
                        todayBirthdays.map((employee) => (
                            <Card key={employee.id} sx={{ mb: 2 }}>
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
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="secondary" sx={{ mb: 2 }}>
                        Upcoming Week's Birthdays
                    </Typography>
                    {upcomingBirthdays.length === 0 ? (
                        <Typography>No birthdays in the upcoming week.</Typography>
                    ) : (
                        upcomingBirthdays.map((employee) => (
                            <Card key={employee.id} sx={{ mb: 2 }}>
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
            </Grid>
        </>
    );
};

export default BirthdayReminderScreen;
