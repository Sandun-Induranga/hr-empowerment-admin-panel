// import React, { useState } from "react";
// import {
//     Button,
//     Grid,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Typography, IconButton
// } from "@mui/material";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';
// import L from "leaflet";
// import {Close} from "@mui/icons-material";

// // Fix for default marker icon issue in leaflet with react-leaflet
// // delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// interface IEmployee {
//     id: string;
//     name: string;
//     latitude: number;
//     longitude: number;
// }

// const sampleEmployees: IEmployee[] = [
//     { id: 'E001', name: 'John Doe', latitude: 6.0329, longitude: 80.2168 },
//     { id: 'E002', name: 'Jane Smith', latitude: 34.0522, longitude: -118.2437 },
//     { id: 'E003', name: 'Alice Johnson', latitude: 40.7128, longitude: -74.0060 },
//     { id: 'E004', name: 'Bob Brown', latitude: 51.5074, longitude: -0.1278 },
//     { id: 'E005', name: 'Test Last', latitude: 6.8757316, longitude: 79.9001616 }
// ];

// const EmployeeLocationTracker = () => {
//     const [employees, setEmployees] = useState<IEmployee[]>(sampleEmployees);
//     const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
//     const [open, setOpen] = useState(false);

//     const handleOpen = (employee: IEmployee) => {
//         setSelectedEmployee(employee);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedEmployee(null);
//     };

//     const mapContainerStyle = {
//         width: '100%',
//         height: '400px'
//     };

//     const center = {
//         lat: selectedEmployee?.latitude || 0,
//         lng: selectedEmployee?.longitude || 0
//     };

//     return (
//         <>
//             <Grid container gap={2} p={2}>
//                 <Grid item xs={12} md={12} component={Paper} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
//                     <Typography variant="h5" textAlign="center" color="primary">
//                         Employee Location Tracker
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={12}>
//                     <TableContainer component={Paper} elevation={0} sx={{borderRadius: 8}}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Employee ID</TableCell>
//                                     <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Name</TableCell>
//                                     <TableCell sx={{color: '#718EBF', fontSize: 16, fontWeight: 400}}>Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {employees.map((employee) => (
//                                     <TableRow key={employee.id}>
//                                         <TableCell sx={{
//                                             color: "#232323",
//                                             fontSize: 16,
//                                             fontWeight: 400
//                                         }}>{employee.id}</TableCell>
//                                         <TableCell sx={{
//                                             color: "#232323",
//                                             fontSize: 16,
//                                             fontWeight: 400
//                                         }}>{employee.name}</TableCell>
//                                         <TableCell>
//                                             <Button
//                                                 variant="contained"
//                                                 color="primary"
//                                                 sx={{
//                                                     background: "white",
//                                                     color: "#16DBCC",
//                                                     fontSize: 16,
//                                                     fontWeight: 400,
//                                                     borderRadius: 100,
//                                                     border: 1,
//                                                     borderColor: "#16DBCC",
//                                                     boxShadow: 0,
//                                                     ml: 2
//                                                 }}
//                                                 onClick={() => handleOpen(employee)}
//                                             >
//                                                 View Location
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Grid>
//             </Grid>
//             <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//                 <DialogTitle sx={{ bgcolor: '#16DBCC', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     Employee Location
//                     <IconButton onClick={handleClose} sx={{ color: 'white' }}>
//                         <Close />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent sx={{ py: 3 }}>
//                     {selectedEmployee && (
//                         <MapContainer
//                             center={center}
//                             zoom={13}
//                             style={mapContainerStyle}
//                             preferCanvas={true}
//                         >
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                             <Marker position={center}>
//                                 <Popup>
//                                     {selectedEmployee.name}'s Location
//                                 </Popup>
//                             </Marker>
//                         </MapContainer>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default EmployeeLocationTracker;

import React, { useState, useEffect } from "react";
import {
    Button, Grid, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Dialog, DialogActions, DialogContent,
    DialogTitle, Typography, IconButton
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Close } from "@mui/icons-material";

// Fix for default marker icon issue in leaflet with react-leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface IEmployee {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
}

const EmployeeLocationTracker = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    // Fetch employee location data from API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/users'); // Adjust the URL to your backend endpoint
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setEmployees(data);
                } else {
                    console.error("Failed to fetch employees");
                }
            } catch (error) {
                console.error("Error fetching employees", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleOpen = (employee: IEmployee) => {
        console.log(employee);
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: selectedEmployee?.latitude || 0,
        lng: selectedEmployee?.longitude || 0
    };

    return (
        <>
            <Grid container gap={2} p={2}>
                <Grid item xs={12} md={12} component={Paper} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
                    <Typography variant="h5" textAlign="center" color="primary">
                        Employee Location Tracker
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 8 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Employee ID</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Name</TableCell>
                                    <TableCell sx={{ color: '#718EBF', fontSize: 16, fontWeight: 400 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map(employee => (
                                    <TableRow key={employee._id}>
                                        <TableCell sx={{ color: "#232323", fontSize: 16, fontWeight: 400 }}>
                                            {employee._id}
                                        </TableCell>
                                        <TableCell sx={{ color: "#232323", fontSize: 16, fontWeight: 400 }}>
                                            {employee.employee.name}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    background: "white",
                                                    color: "#16DBCC",
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    borderRadius: 100,
                                                    border: 1,
                                                    borderColor: "#16DBCC",
                                                    boxShadow: 0,
                                                    ml: 2
                                                }}
                                                onClick={() => handleOpen(employee)}
                                            >
                                                View Location
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: '#16DBCC', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Employee Location
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                    {selectedEmployee && (
                        <MapContainer center={center} zoom={13} style={mapContainerStyle}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            />
                            <Marker position={center}>
                                <Popup>
                                    {selectedEmployee.employee.name}'s Location<br />
                                    Latitude: {selectedEmployee.latitude}<br />
                                    Longitude: {selectedEmployee.longitude}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EmployeeLocationTracker;
