import React, {useState, useEffect} from "react";
import {
    Grid,
    Paper,
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";
import dayjs, {Dayjs} from 'dayjs';
import birthdayImage from "../../assets/images/birthday.jpg";

interface IEmployee {
    id: string;
    name: string;
    birthday: string;
}

const sampleEmployees: IEmployee[] = [
    {id: 'E001', name: 'John Doe', birthday: '1990-06-20'},
    {id: 'E002', name: 'Jane Smith', birthday: '1985-06-22'},
    {id: 'E003', name: 'Alice Johnson', birthday: '1992-06-25'},
    {id: 'E004', name: 'Bob Brown', birthday: '1988-06-29'},
    {id: 'E005', name: 'Charlie Black', birthday: '1990-06-30'},
    {id: 'E006', name: 'Diana White', birthday: '1982-07-01'}
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
                <Grid item xs={12} md={6} component={Paper} sx={{minHeight: 200, p: 4}}>
                    <Typography variant="h6" color="secondary"
                                sx={{mb: 2, color: '#718EBF', fontSize: 24, fontWeight: 400}}>
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
                            <Card key={employee.id} sx={{mb: 2}}>
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
                <Grid item xs={12} md={6} component={Paper} sx={{minHeight: 200, p: 4}}>
                    <Typography variant="h6" color="secondary"
                                sx={{mb: 2, color: '#718EBF', fontSize: 24, fontWeight: 400}}>
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
                            <Card key={employee.id} sx={{mb: 2}}>
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
