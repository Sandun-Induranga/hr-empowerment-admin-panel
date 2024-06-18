import React from "react";
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";

const ManageEmployeeScreen = () => {
    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={12} component={Paper} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
                    <Typography variant="h5" textAlign="center" color="primary">
                        Manage Employee
                    </Typography>
                    <Grid container spacing={2} mt={2}>
                        {['Student ID', 'Student Name', 'Address', 'Birthday', 'Mobile'].map((label, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <TextField
                                    label={label}
                                    margin="dense"
                                    fullWidth
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Address</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Birthday</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Age</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Mobile</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Gender</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Add rows here */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}

export default ManageEmployeeScreen;
