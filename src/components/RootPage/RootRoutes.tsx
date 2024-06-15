import ManageEmployeeScreen from "../../screens/Employee/ManageEmployeeScreen";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Box} from "@mui/material";

const RootRoutes = () => {
    return (
        <Box sx={{display:'flex'}}>
            <Routes>
                <Route path="/manage-employee" element={<ManageEmployeeScreen/>}/>
            </Routes>
        </Box>
    );
}

export default RootRoutes;
