import React, {useState} from "react";
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
import leaveImage from "../../assets/images/leave.jpg";

interface IEmployee {
    id: string;
    name: string;
}


const sampleEmployees: IEmployee[] = [
    {id: 'E001', name: 'John Doe'},
    {id: 'E002', name: 'Jane Smith'},
    {id: 'E003', name: 'Alice Johnson'},
    {id: 'E004', name: 'Bob Brown'},
];

const ManageLeavesScreen = () => {
    const [employees, setEmployees] = useState<IEmployee[]>(sampleEmployees);

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={4} elevation={0} component={Paper} sx={{mb: 2, borderRadius: 100}}>
                    <TextField
                        label={'Search Employee'}
                        variant="outlined"
                        fullWidth
                        sx={{borderRadius: 100}}
                        InputProps={{
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={8} sx={{display: 'flex', justifyContent: 'center'}}>
                    <TableContainer component={Paper} elevation={0} sx={{borderRadius: 8}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Employee
                                        ID</TableCell>
                                    <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Name</TableCell>
                                    <TableCell
                                        sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.id}</TableCell>
                                        <TableCell sx={{
                                            color: "#232323",
                                            fontSize: 16,
                                            fontWeight: 400
                                        }}>{employee.name}</TableCell>
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
                <Grid item xs={12} md={3} elevation={0} component={Paper}
                      sx={{background: `url(${leaveImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                      }}>
                </Grid>
            </Grid>
        </>
    );
};

export default ManageLeavesScreen;

