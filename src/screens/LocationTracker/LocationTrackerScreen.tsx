import React, { useState } from "react";
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

// Fix for default marker icon issue in leaflet with react-leaflet
// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface IEmployee {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

const sampleEmployees: IEmployee[] = [
    { id: 'E001', name: 'John Doe', latitude: 6.0329, longitude: 80.2168 },
    { id: 'E002', name: 'Jane Smith', latitude: 34.0522, longitude: -118.2437 },
    { id: 'E003', name: 'Alice Johnson', latitude: 40.7128, longitude: -74.0060 },
    { id: 'E004', name: 'Bob Brown', latitude: 51.5074, longitude: -0.1278 }
];

const EmployeeLocationTracker = () => {
    const [employees, setEmployees] = useState<IEmployee[]>(sampleEmployees);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (employee: IEmployee) => {
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
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'white' }}>Employee ID</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
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
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    Employee Location
                </DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                    {selectedEmployee && (
                        <MapContainer
                            center={center}
                            zoom={13}
                            style={mapContainerStyle}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={center}>
                                <Popup>
                                    {selectedEmployee.name}'s Location
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
