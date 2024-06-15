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
                <Grid item xs={12} md={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Birthday</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Gender</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*{studentList.map((row) => (*/}
                                {/*    <TableRow*/}
                                {/*        hover*/}
                                {/*        key={row.studentId}*/}
                                {/*        onClick={() => {*/}
                                {/*            handleSelectStudent(row);*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        <TableCell>{row.studentId}</TableCell>*/}
                                {/*        <TableCell>{row.name}</TableCell>*/}
                                {/*        <TableCell>{row.address}</TableCell>*/}
                                {/*        <TableCell>{row.dob}</TableCell>*/}
                                {/*        <TableCell>{generateAge(row.dob)}</TableCell>*/}
                                {/*        <TableCell>{row.mobile}</TableCell>*/}
                                {/*        <TableCell>{row.gender}</TableCell>*/}
                                {/*    </TableRow>*/}
                                {/*))}*/}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={5} p={2} component={Paper}>
                    <Box>
                        <Typography variant="h5" textAlign={"center"} color={"GrayText"}>
                            Manage Student
                        </Typography>
                        <TextField
                            label="Student ID"
                            // value={formData.studentId}
                            // onChange={(e) => {
                            //     setFormData({ ...formData, studentId: e.target.value });
                            // }}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            label="Student Name"
                            // value={formData.name}
                            // color={errors.includes("name") ? "error" : "success"}
                            // onChange={(e) => {
                            //     validateName(e.target.value)
                            //         ? setErrors([...errors.filter((error) => error !== "name")])
                            //         : setErrors([...errors, "name"]);
                            //     setFormData({ ...formData, name: e.target.value });
                            // }}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            label="Address"
                            // value={formData.address}
                            // color={errors.includes("address") ? "error" : "success"}
                            // onChange={(e) => {
                            //     validateAddress(e.target.value)
                            //         ? setErrors([
                            //             ...errors.filter((error) => error !== "address"),
                            //         ])
                            //         : setErrors([...errors, "address"]);
                            //     setFormData({ ...formData, address: e.target.value });
                            // }}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            label="Birthday"
                            type="date"
                            // value={formData.dob}
                            // onChange={(e) => {
                            //     setFormData({ ...formData, dob: e.target.value });
                            // }}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            label="Mobile"
                            // value={formData.mobile}
                            // color={errors.includes("mobile") ? "error" : "success"}
                            // onChange={(e) => {
                            //     validateMobile(e.target.value)
                            //         ? setErrors([...errors.filter((error) => error !== "mobile")])
                            //         : setErrors([...errors, "mobile"]);
                            //     setFormData({ ...formData, mobile: e.target.value });
                            // }}
                            margin="dense"
                            fullWidth
                        />
                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                width: "100%",
                                gap: 2,
                            }}
                        >
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default ManageEmployeeScreen;
