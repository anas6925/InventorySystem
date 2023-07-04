import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Register from "./register";
import Login from "./login";

// Screens Imports
import InventoryGroup from "scenes/inventory/group";
import InventoryItem from "scenes/inventory/items";
import InventoryBrand from "scenes/inventory/brand";
import InventoryRawItem from "scenes/inventory/rawItem";
import InventoryVendorManagement from "scenes/inventory/vendor-management";
import InviteStudents from "scenes/students/inviteStudent/invitestudent";
import AllStudents from "scenes/students/allStudent/allStudent";
import ArchievedStudents from "scenes/students/archievedStudents/archievedStudents";
import DropOutStudents from "scenes/students/dropoutStudents/dropoutStudents";
import RecordingStudents from "scenes/students/Recording/recording";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const token = localStorage.getItem("token");
const tokenExpiration = localStorage.getItem("tokenExpiration");
const isLoggedIn = !!token && tokenExpiration > new Date().getTime();


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<Login />} />
              </>
            ) : (
              <>
                <Route element={<Layout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/daily" element={<Daily />} />
                  <Route path="/monthly" element={<Monthly />} />
                  <Route path="/breakdown" element={<Breakdown />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/performance" element={<Performance />} />

                  {/* Inventory Routes */}
                  <Route path="/inventory/group" element={<InventoryGroup />} />
                  <Route path="/inventory/items" element={<InventoryItem />} />
                  <Route path="/inventory/brand" element={<InventoryBrand />} />
                  <Route path="/inventory/raw-item" element={<InventoryRawItem />} />
                  <Route path="/inventory/vendor-management" element={<InventoryVendorManagement />} />

                  {/* Students Routes */}
                  <Route path="/students/invite-students" element={<InviteStudents />} />
                  <Route path="/students/all-students" element={<AllStudents />} />
                  <Route path="/students/archieved-students" element={<ArchievedStudents />} />
                  <Route path="/students/dropout-students" element={<DropOutStudents />} />
                  <Route path="/students/recording-students" element={<RecordingStudents />} />
                </Route>
              </>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
